---
title: Evaluations
sidebar_label: Evaluations
tags:
  - llm
---

### Hallucinations

[How to avoid them](https://diamantai.substack.com/p/how-to-stop-ai-hallucinations)

1. Choose Advanced Models

2. Write Clear Instructions

Tell the AI: “Answer only with verified information. If you’re not sure, say you don’t know.”

3. Use Step-by-Step Reasoning

- Guide the model: “Let’s solve this step by step.”

- More Explicit. For example: 
  - “First, identify the key variables. 
  - Second, check what information is missing. 
  - Third, calculate each component separately. Finally, combine the results.”

- For more control, you can implement this logic in code as a state graph

4. Provide Examples
-  few-shot prompting

5. Ground with Real Data
- RAG

6. Lower the Temperature

7. Implement Self-Checks

- ask it to verify: “Are you sure? Can you double-check that information?”
- Voting mechanism

8. Add External Verification
- Rule based external validation

9. Fine-Tune on Your Domain
- Fine-tune on verified

10. Use Human Feedback
- Reinforcement Learning from Human Feedback

### Evaluations



**References:**

1. LLM Eval FAQ, Hamel Husain Shreya Shankar, 2025-06-29
2. [Huggingface Evaluations](https://huggingface.co/docs/evaluate/en/choosing_a_metric)
3. 
