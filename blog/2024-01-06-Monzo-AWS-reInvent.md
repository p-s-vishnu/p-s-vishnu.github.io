---
tags:
    - mlops
    - usecase
---
# Learnings from Monzo: AWS reInvent A Deep Dive into Building a Digital Bank

Let’s take a sneak peek into the world of Monzo, the digital banking rocking around 8 million accounts, mostly in the UK. When they hit 4 million customers there were just eight tech folks on the infrastructure and reliability team running the show on AWS.

<!-- truncate -->

I watched the [video](https://www.youtube.com/watch?v=NTgB2z0E9ZU) and read about the [case study](https://aws.amazon.com/solutions/case-studies/Monzo/) of Monzo and below are the key highlights extracted from them. I have added the pre-requisite and further reading topics in quotations.

The article is divided into two sections, For those who want the quick low-down, the TLDR has got you covered with the gist of the content but if you are up for a more in-depth explanation then the next one does that.

**_Note:_** _Most of the screenshots are from the links above._

## TL;DR

In a nutshell, the setup is humming 1500 micro-services and ~ 9000 pods in production as of 2019.

**Infra overview —** Below are the tools and system architecture for the payment system

1. **_Compute_** Data Centres (DCs) process incoming requests which get redirected to Micro-services running on [Kubernetes](https://kubernetes.io/).
2. **_Data store:_** [Apache Cassandra](https://cassandra.apache.org/_/index.html) & AWS S3 for persistent data storage
3. **_Monitoring and alerting:_** [Prometheus](https://prometheus.io/docs/introduction/overview/) for monitoring & unlimited retention with [Thanos](https://thanos.io/)
4. **_Distributed locking and coordination:_** [etcd](https://etcd.io/) cluster
5. **_Ordered Queuing:_** [Apache Kafka](https://kafka.apache.org/)
6. **_Unordered queuing & event publishing:_** [NSQ](https://nsq.io/)

![Monzo Infra](/img/blog/monzo-infra.png)

What happens when a Payment request is initiated?

1. The request for card usage is sent from the payment provider to Monzo’s DCs.
2. The request is then transferred to AWS and some requests would need a locking mechanism using etcd. Simultaneously, some will be sent to the Cassandra cluster for the data through the Kubernetes compute cluster.
3. If the transaction is approved then send back the response.

![Monzo Payment](/img/blog/monzo-payments.png)


## Deep Dive

Six aspects of Monzo’s payment system will be discussed

1. Data Centres
2. Compute
3. Data storage
4. Messaging
5. Locking
6. Monitoring

Finally, the overall request-response process.

![Monzo Deep Dive](/img/blog/monzo-deep-dive.png)

## 1. Data Centres

> **What is AWS Direct Connect?**  
> It serves as a bridge between an internal network (on-prem) to an AWS Direct Connect location (AWS services e.g. Amazon S3 or Amazon VPC).

The necessity for a data centre arises from the limitation posed by payment providers like [Mastercard](https://www.mastercard.co.uk/en-gb/html) and [Faster Payments](https://www.starlingbank.com/resources/banking/guide-to-faster-payments/) which exclusively provide optical fibre and lack integration capability with cloud providers.

**Request flow:**

1. _Ingress from the service provider:_ The journey commences with a message inbound from the service provider.
2. _Monzo’s Data Centre:_ The message traverses through Monzo’s data centre, where it undergoes encryption and is channelled into a Virtual Private Network (VPN) through AWS Direct Connect.
3. Finally reaches the Kubernetes(K8s) cluster where it gets authenticated and passes through multiple micro-services.

![Monzo Data Centre](/img/blog/monzo-data-centre.png)

**Response:** It follows a similar reverse path and is returned to the terminal.

If you want to know how Monzo secures its application for IP compliance you can read the article — [How we secure Monzo’s banking platform](https://monzo.com/blog/2022/03/31/how-we-secure-monzos-banking-platform).

## 2. Compute

As mentioned earlier, there is a fleet of 1500 micro-services and ~ 9000 pods in production as of 2019 mostly in single region `eu-west-1`.

The question arises: How are they able to run so many nodes in the cluster?

- It converges to one reason — consistency. Across teams, the company upholds a uniformity of language, design patterns, and infrastructure. This enables the orchestration of a multitude of nodes seamlessly.
- Additionally, all the code is written in Go which helps reduce the docker image size and expedites the container creation process.

For context, the below is not a neural network but rather micro-services running and communicating on a single day.

![Monzo Compute](/img/blog/monzo-compute.png)

The shipper is the tool employed at Monzo to build, validate and roll out deployments to the cluster.

![Monzo Shipper](/img/blog/monzo-shipper.png)

A typical deployment command looks like below and there are hundreds of similar deployments done in a day.

![Monzo Deployment](/img/blog/monzo-deployment.png)

**Service discovery** using Envoy

> [**Envoy**](https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy)**:** serves as a versatile software, functioning as a service proxy/mesh to govern and oversee both inbound and outbound traffic for all services within the service mesh.

- Since there are numerous deployments, it becomes important to devise a mechanism for the services to find and communicate with one another, this is solved using envoy and custom logic called envoy config provider.
- The config provider monitors state changes in the K8s API server and subsequently, it orchestrates updates across all proxy processes and lets them know what to find where.


![Monzo Envoy](/img/blog/monzo-envoy.png)


## **3. Data Storage**

> **How does Cassandra work?**  
> Cassandra operates as a Masterless distributed database, it has nodes that are joined to form a ring ⇒ Data spans across these interconnected rings.  
> Operations like reading happen using a load-balancing mechanism like round-robin and the client remains oblivious to the data’s actual whereabouts. Read more [here](https://cassandra.apache.org/_/cassandra-basics.html)

Account data is stored in the NoSQL Cassandra database and all the log archives are stored in the S3 bucket. It is running outside of the K8s cluster on the Ec2 instance.

To fine-tune the database’s response time and consistency, replication and Quorum mechanisms come into play. For instance, if a need for a faster response arises, adjusting the replication factor becomes the strategy, albeit with the understanding that this may come at the cost of reduced consistency.

Delving into the team’s routine practices, certain exercises involve restarting the database cluster one node at a time. This deliberate action serves as a litmus test, assessing the resilience and robustness of the database in real-world scenarios.

## **4. Messaging**

> **What is event-driven architecture?  
> **A paradigm, where different components of a system communicate with each other through events. An event can be any occurrence or change in the system that requires attention. These events can be generated by users, applications, or external systems.


![Monzo Messaging](/img/blog/monzo-messaging.png)


A lot of computing works asynchronously, like an Event-driven architecture so messaging systems were introduced. In this system, Kafka is used for ordered queuing while NSQ is for unordered & event publishing scenarios. These threads provide interesting content about Kafka vs NSQ ([link1](https://news.ycombinator.com/item?id=14455919), [link2](https://gcore.com/learning/nats-rabbitmq-nsq-kafka-comparison/))

Push notification is one scenario where asynchronous messaging is used. Whenever a customer makes a successful purchase or a vendor requests approval for payment a notification is instantaneously sent to the customer’s app.

## **5. Locking**

> **What are AWS I3 instances?**  
> Amazon EC2 I3 instances are Storage Optimised instances for high transaction, low latency workloads. I3 instances offer a good price per I/O performance for workloads such as NoSQL databases, in-memory databases, data warehousing, Elastic search, and analytics workloads.
> 
> **What is etcd?  
> **Distributed, highly available, key-value store. High throughput and low latency locking. It works akin to Cassandra however unlike the former it has a master selection process.

Given the distributed nature, there are instances where mutual exclusivity and locking become imperative. Here, **etcd** providing distributed locking capabilities. Without proper locking, concurrent modifications can lead to inconsistent or corrupted data. Locks ensure that only one process can modify the data at a time, maintaining its integrity.

Additionally, running the setup on AWS I3 infrastructure guarantees better performance.

## **6. Monitoring**

> **Prometheus** is a Time series data store and query engine
> 
> **Thanos** is a highly available Prometheus setup providing infinite retention capabilities.
> 
> **Sidecar pattern:** The Sidecar pattern is a design pattern used in micro-services architecture. It involves running a separate process or container alongside the main application to enhance its functionality. Think of it like a sidecar attached to a motorcycle; the sidecar provides additional features to the bike. [Read more](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar)


![Monzo Monitoring](/img/blog/monzo-monitoring.png)

Prometheus is “shared out” to various functional domains with two replicas each to handle failures, the collected time series data is “ephemeral “ (only 24 hours of storage). This begs two requirements for the monitoring system.

Users necessitate an effortless means to query logs, preferably centralised for comprehensive search capabilities.
The logs should be saved for longer than 24 hours.
Solution — Thanos as a sidecar to the Prometheus servers

Emulates multiple Prometheus servers’ query search as a single one with Thanos. It uses Thanos query which fans out to all the sidecar applications retrieving the location of the requested data i.e. parallely searching for the requested data.
To meet the second requirement, Thanos takes periodic strides, saving data to the S3 bucket, ensuring a repository that surpasses the 24-hour timeframe
Beyond this, an array of metrics are monitored by the system like request metrics, low-level system metrics, business logic, social media trends, etc. Hence, various Alert managers are created using Prometheus to detect anomalies and observe trends.

