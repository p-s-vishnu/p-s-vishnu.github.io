---
slug: why-your-llm-is-slow
title: Why Your LLM Is Slow (And the 5 Papers That Fix It)
tags: [llm, mlops]
---

Recently came across a post explaining these papers and thought it worth sharing with a quick breakdown.

<!-- truncate -->

## TLDR

| Concept | Layer | Key Win | Remember This |
|---------|-------|---------|---------------|
| FlashAttention | Compute | 2-6x attention speedup | Tiling + IO-awareness |
| PagedAttention | Memory | Less than 4% waste (was 60-80%) | Virtual memory for KV cache |
| Speculative Decoding | Generation | 2-3.6x faster decoding | Draft-then-verify |
| Heterogeneous Serving | Infrastructure | Up to 77% cost savings | Right GPU for right job |
| DistServe | Architecture | 7.4x more requests | Split prefill from decoding |

---

## 1. FlashAttention - Compute Optimisation

**The problem:** Attention is slow not because of maths, but because of memory traffic. GPUs have fast on-chip memory (SRAM, ~19TB/s) and slow main memory (HBM, ~2TB/s). Standard attention keeps shuffling data between them.

**How it works:** Instead of computing the full N×N attention matrix at once, FlashAttention tiles it into small blocks that fit in fast SRAM. It uses an "online softmax" trick to get exact results incrementally - no approximation.

**Analogy:** Instead of carrying all your groceries inside in one impossible armful, you make smart small trips - but you planned the route so well it's actually faster.

| Version | Speedup | GPU Utilisation |
|---------|---------|-----------------|
| v1 | 2-3x vs standard | 25-40% |
| v2 | 2x on top of v1 | 50-73% |

---

## 2. PagedAttention - Memory Management

**The problem:** Each request stores a KV cache (the model's "memory" of past tokens). Traditional systems pre-allocate memory for the worst case, wasting 60-80% of GPU memory. This limits how many requests you can batch together.

**How it works:** Borrows the virtual memory paging concept from operating systems. KV cache is split into fixed-size blocks that can be scattered anywhere in GPU memory. A block table maps logical to physical locations. Memory is allocated on-demand as tokens are generated.

**Analogy:** Instead of reserving an entire bookshelf per person (wasteful), you let people's books sit on any available shelf and give them a card catalogue to find them.

| Metric | Result |
|--------|--------|
| Memory waste | 60-80% to less than 4% |
| Throughput vs HuggingFace | 24x |
| Throughput vs prior SOTA | 2-4x |

**Why it matters:** Memory efficiency means larger batch sizes, more requests per GPU, and lower cost. This is why vLLM became the industry standard for LLM serving.

---

## 3. Speculative Decoding - Faster Token Generation

**The problem:** LLMs generate tokens one at a time, each requiring a full forward pass through billions of parameters. The GPU is massively underutilised - like hiring 1,000 workers to carry one brick at a time.

**Two approaches:**

**Speculative Sampling (DeepMind):** A small fast "draft" model guesses the next k tokens. The big model verifies all k in one forward pass. If the guesses match, you got k tokens for the price of roughly 1. Mathematically guaranteed to produce identical output.

**Medusa (Cai et al., Princeton/UIUC):** Instead of a separate model, bolt extra "prediction heads" onto the main model. Each head predicts future tokens in parallel. Simpler deployment (one model), but requires fine-tuning.

| Approach | Speedup | Trade-off |
|----------|---------|-----------|
| Speculative Sampling | 2-2.5x | Need two models |
| Medusa-2 | 2.3-3.6x | Need to fine-tune heads |

**Analogy:** Instead of asking the CEO to write a memo word by word, have an intern draft 5 sentences, then the CEO reviews them all at once - keeping what's good, rewriting what's not.

---

## 4. Heterogeneous GPU Serving - Cost Optimisation

**The problem:** Companies buy expensive A100s for everything, but not all requests need top-tier hardware. Short chat messages don't need the same GPU as processing 100-page documents.

**Two approaches:**

**Metis (training-focused):** Automatically figures out how to split training across mixed GPU types with smart load balancing. Result: 1-8.4x speedup.

**Melange (inference-focused):** Formulates GPU selection as a bin-packing problem - which mix of cheap and expensive GPUs minimises cost while meeting latency targets?

| Workload | Cost Savings |
|----------|-------------|
| Short chat | up to 77% |
| Long documents | 33% |
| Mixed | 51% |

**Analogy:** Instead of sending limousines for every taxi ride, dispatch the right vehicle for each trip - sedans for solo riders, vans for groups.

---

## 5. DistServe - Disaggregated Inference

**The problem:** LLM inference has two phases with opposite needs:
- **Prefill** (process the prompt): wants massive parallelism, high throughput
- **Decoding** (generate tokens): wants low latency, small batches

Running both on the same GPU is like asking one chef to do both bulk meal prep and delicate plating simultaneously - neither goes well.

**How it works:** Physically separate prefill and decoding onto different GPU clusters, each tuned for its workload. After prefill generates the KV cache, it is shipped to the decoding cluster.

| Metric | Result |
|--------|--------|
| Goodput vs vLLM (requests meeting SLO/s) | 7.4x more |
| SLO compliance | Over 90% of requests meet latency targets |

**Analogy:** A restaurant with a separate prep kitchen (high-volume chopping) and a plating station (precision finishing), connected by a runner.

---

## References

1. Dao et al. (2022) : [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)
2. Dao (2023) : [FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning](https://arxiv.org/abs/2307.08691)
3. Kwon et al. (2023) : [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06852)
4. Chen et al. (2023) : [Accelerating Large Language Model Decoding with Speculative Sampling](https://arxiv.org/abs/2211.17192)
5. Cai et al. (2024) : [Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads](https://arxiv.org/abs/2401.02659)
6. Um et al. (2022) : [Metis: Fast Automatic Distributed Training on Heterogeneous GPUs](https://arxiv.org/abs/2208.14226)
7. Griggs et al. (2024) : [Mélange: Cost Efficient Large Language Model Serving by Exploiting GPU Heterogeneity](https://arxiv.org/abs/2404.14527)
8. Zhong et al. (2024) : [DistServe: Disaggregating Prefill and Decoding for Goodput-Optimized LLM Serving](https://arxiv.org/abs/2401.09670)
