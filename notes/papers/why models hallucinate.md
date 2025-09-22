---
title: Why Language Models Hallucinate
tags:
  - math
  - llm
---
Source: Why Language Models Hallucinate https://arxiv.org/html/2509.04664v1

### TLDR

1. Language models (LLMs) hallucinate because they are trained and evaluated in a way that rewards guessing over admitting uncertainty. 
2. The paper presents a theoretical argument showing that hallucinations are a natural statistical outcome of the pre-training process, not just a bug. 
3. The core reason they persist is that most industry benchmarks use binary (right/wrong) scoring, which incentivises models to make a confident guess rather than say "I don't know." 
4. The authors propose a socio-technical solution: modify existing evaluation benchmarks to include explicit penalties for incorrect answers, thereby encouraging models to only respond when genuinely confident.

### Technical Points to Know

The paper introduces several key technical concepts to formalise the origins of hallucinations:

*   **Reduction to Binary Classification:** The paper's central technical innovation is reducing the unsupervised problem of generative error (hallucination) to a supervised binary classification problem, which they term **"Is-It-Valid" (IIV)**. This allows the application of decades of statistical learning theory to LLM errors.
    *   Any LLM `p̂` can be converted into a classifier `f̂` by thresholding its probability assignment: an output `x` is classified as valid ('+') if `p̂(x)` is above a certain value, and an error ('-') otherwise.
    *   This leads to the core inequality: **`err ≥ 2 * err_iiv - (bias terms)`**, where `err` is the model's generative error rate and `err_iiv` is its misclassification rate on the IIV problem. This mathematically links generative errors to classification errors.

*   **Calibration and Cross-Entropy:** The standard cross-entropy loss objective used in pretraining naturally produces models that are "calibrated" in a specific sense. The paper shows that for such calibrated models, errors are a statistical necessity. A model that never errs (e.g., by always saying "I don't know") would have to be poorly calibrated with respect to the cross-entropy objective, meaning it would not be a local minimum for the training loss.

*   **Arbitrary-Fact Hallucinations and Singletons:** For facts that have no learnable pattern (e.g., a person's birthday), the model's ability to recall them depends on their frequency in the training data. The paper connects the hallucination rate to the "singleton rate" (`sr`), which is the fraction of training prompts that appear only once.
    *   **Theorem 2** states that for these types of facts, the expected error rate is approximately equal to the singleton rate (`err ≈ sr`). If 20% of birthday facts in the training data are singletons, a base model is expected to hallucinate on at least 20% of birthday-related queries.

*   **Poor Models and Agnostic Learning:** Hallucinations can also arise when a model's architecture is fundamentally unsuited for a task. The paper connects this to the concept of `opt(G)` from agnostic learning—the best possible error rate achievable by any classifier within a given family `G`. If `opt(G)` is high for a certain task, then any model from that family is guaranteed to have a high error rate.
    *   An example is a token-based LLM being asked to count characters, a task for which its representation may be ill-suited, whereas a model with a reasoning mechanism might perform better.

### Important Sections

#### **Pretraining Errors (Section 3)**

This section provides the theoretical foundation for why base models hallucinate before any fine-tuning.

*   **Key Insight:** Hallucinations are not a mysterious emergent property but a predictable consequence of statistical density estimation. Even with perfectly clean training data, the pressure to create a good probabilistic model of the data forces the model to generate errors on less-frequent or unlearnable patterns. The reduction to the IIV classification problem is the main tool used here to demonstrate that if a concept is hard to classify, it will be hard to generate correctly. The analysis shows that for a model to avoid errors entirely, it would have to perform poorly on the fundamental pretraining objective of density estimation.

#### **Why Hallucinations Survive Post-Training (Section 4)**

This section shifts from theoretical origins to a practical, socio-technical explanation for why methods like RLHF have not eliminated hallucinations.

*   **Key Insight:** The evaluation ecosystem is the primary culprit. Most influential benchmarks (e.g., MMLU-Pro, SWE-bench, MATH) use binary grading where answers are simply right or wrong. Under this scheme, a model that guesses when uncertain has a higher expected score than one that abstains by saying "I don't know." Since models are optimised to climb these leaderboards, they are implicitly trained to hallucinate [1]. The paper describes this as an "epidemic" of penalising uncertainty [1].

#### **Proposed Mitigation: Explicit Confidence Targets (Section 4.2)**

This section offers a concrete, actionable solution aimed at the entire ML community rather than a specific model-based fix.

*   **Key Insight:** To build more trustworthy models, the rules of the game must change. Instead of creating more specialised (and often ignored) hallucination benchmarks, the authors propose modifying the primary benchmarks themselves. They suggest adding instructions to prompts that specify a confidence threshold `t` and an associated penalty for wrong answers. For example:
    > "Answer only if you are >90% confident. Correct answers get 1 point, 'I don't know' gets 0 points, and incorrect answers get -9 points."

*   This makes the optimal strategy for the model one of "behavioural calibration"—it should only answer if its internal confidence is higher than the stated threshold `t`. By making the threshold explicit in the prompt, a single model can learn to perform optimally across all settings, steering the field towards models that are more honest about their uncertainty [1].

