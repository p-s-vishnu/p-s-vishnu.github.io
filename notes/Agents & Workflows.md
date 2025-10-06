---
title: Agents & Workflows
tags:
  - llm
---

# Theory 

![Autonomy levels](/img/blog/agent_autonomy_levels.png)

Broad categorisation

![Agent Workflow](/img/blog/agent_workflow.png)

1. Predefined paths
    1. Prompt Chaining
    2. Parallelisation

2. LLM directs control flow in predefined paths - Workflow
    1. Orchestrator-Worker
    2. Evaluator-optimiser
    3. Routing

3. LLM directs its own actions - Agent

---
# Practical

## 1. Stateful Agent Workflows with [LangGraph](https://github.com/NirDiamant/agents-towards-production/blob/main/tutorials/LangGraph-agent/langgraph_tutorial.ipynb)

- **State Management:** Maintain persistent state across interactions
- **Flexible Routing:** Define complex flows between components
- **Persistence:** Save and resume workflows
- **Visualisation:** See and understand your agent's structure

**General steps:**
```python
from langgraph.graph import StateGraph, END

# Memory
class State(TypedDict):
    text: str
    classification: str
    entities: List[str]
    summary: str

from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage

# Step 0: Define Tools
def classification_node(state: State):
    '''Classify the text into one of the categories: News, Blog, Research, or Other'''
    prompt = PromptTemplate(
        input_variables=["text"],
        template="Classify the following text into one of the categories: News, Blog, Research, or Other.\n\nText:{text}\n\nCategory:"
    )
    message = HumanMessage(content=prompt.format(text=state["text"]))
    classification = llm.invoke([message]).content.strip()
    return {"classification": classification}
def route_after_classification(state: EnhancedState) -> str:
    category = state["classification"].lower() # returns: "news", "blog", "research", "other"
    return category in ["news", "research"]

# Step 1: Create our StateGraph
workflow = StateGraph(State)

# Step 2: Define nodes
workflow.add_node("classification_node", classification_node)

# Step 3: Define graph
# Step 3.1: Set the entry point of the graph
workflow.set_entry_point("classification_node")

# Step 3.2: Add conditional edges
workflow.add_conditional_edges("classification_node", route_after_classification, path_map={
    True: "entity_extraction",  # TODO: define these tools
    False: "summarization"      # TODO: define these tools
})

# Step 3.3: Add static edges
workflow.add_edge("classification_node", "entity_extraction")
workflow.add_edge("entity_extraction", "summarization")
workflow.add_edge("summarization", END)

# Step 3.4: Compile
app = workflow.compile()
# Optional: Visualise using mermaid tool

```

## 2. Deploying Agents as APIs with [FastAPI](https://github.com/NirDiamant/agents-towards-production/blob/main/tutorials/fastapi-agent/fastapi-agent-tutorial.ipynb)
- Pytest and `from fastapi.testclient import TestClient` (httpx dependency).
- Add `class Config:` inside class BaseModel to add example reosne in teh API docs.
- Async generation 

```python
import asyncio

class SimpleAgent:
    def __init__(self, name="FastAPI Agent"):
        self.name = name

    async def generate_response_stream(self, query):
        """Generate a streaming response to a user query"""
        prefix = f"Agent {self.name} thinking about: '{query}'\n"
        response = "This is a simulated agent response that streams token by token."
        # Yield the prefix as a single chunk
        yield prefix 
        # Stream the response token by token with small delays
        for token in response.split():
            await asyncio.sleep(0.1)  # Simulate thinking time
            yield token + " "
agent = SimpleAgent()

# Create a streaming endpoint for the agent
@app.post("/agent/stream")
async def stream_agent(request: QueryRequest):
    """Stream a response from the agent token by token"""
    
    async def event_generator():
        async for token in agent.generate_response_stream(request.query):
            # Format as a JSON object
            data = json.dumps({"token": token})
            yield f"data: {data}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream"
    )
```

- Next steps in the page: advanced agents, fast api background task, async db.

## 3. [Agent memory with redis](https://github.com/NirDiamant/agents-towards-production/tree/main/tutorials/agent-memory-with-redis)
- Dual-Memory Architecture: Short-term (conversation state) and long-term (persistent knowledge) memory.
- Semantic Search: RedisVL for semantic memory retrieval with embeddings.
- Memory Types: Understand differences between Episodic (user experiences) vs Semantic (general knowledge) memory patterns.
- Production Patterns: Tool-based memory management and conversation summarization
- Redis checkpointers for state persistence.

## 4. [Tool & API Integration via Model Context Protocol (MCP)](https://github.com/NirDiamant/agents-towards-production/blob/main/tutorials/agent-with-mcp/mcp-tutorial.ipynb)

Traditional methods of connecting AI models with external resources often involve custom integrations for each **data source or tool**. This leads to:

1. **Integration Complexity**: Each new data source requires a unique implementation
2. **Scalability Issues**: Adding new tools becomes progressively harder
3. **Maintenance Overhead**: Updates to one integration may break others

MCP solves these challenges by providing a standardised protocol that enables:

1. **Unified Access**: A single interface for multiple data sources and tools
2. **Plug-and-Play Extensions**: Easy addition of new capabilities
3. **Stateful Communication**: Real-time, two-way communication between AI and resources
4. **Dynamic Discovery**: AI can find and use new tools on the fly

**Official MCP Servers:** https://github.com/modelcontextprotocol/servers/tree/main/src

## 5. [A2A (Agent-to-Agent) Communication Protocol](https://github.com/NirDiamant/agents-towards-production/blob/main/tutorials/a2a/a2a_tutorial.ipynb)


---

## Paralant chatbots

https://www.parlant.io/docs/about



**References**
1. [NirDiamant Agent framework](https://github.com/NirDiamant/agents-towards-production/tree/main?tab=readme-ov-file#-agent-frameworks)
2. https://blog.langchain.com/what-is-a-cognitive-architecture/
3. https://langchain-ai.github.io/langgraph/
4. https://fastapi.tiangolo.com/tutorial/testing/