---
title: Evaluating agents without going insane
sidebar_label: Agent evals
---

# Evaluating agents without going insane

> Work in progress. Notes coming soon.

Trajectory-level evals, golden traces, and how to keep regressions from sneaking past.

See also: [LLM output evals](/notes/Evaluations) - component-level metrics, hallucinations, judge models.

---

## Why agent evals are different

{/* TODO: why component-level evals (accuracy, BLEU, judge score on a single output) miss the point for agents - multi-step plans, tool use, partial success, non-determinism, cost/latency tradeoffs */}

## Trajectory-level evals

{/* TODO: evaluating the *path* the agent took, not just the final answer.
- Step-level correctness vs end-to-end correctness
- Tool-call accuracy: right tool, right args, right order
- Reasoning trace inspection
- When trajectories can branch (multiple valid paths) */}

## Golden traces

{/* TODO: curated reference trajectories - the "good runs" you compare against.
- How to capture them (record real sessions, hand-curate, synthesize)
- What to store (inputs, intermediate state, tool calls, outputs)
- Diffing live runs against golden traces - exact match vs semantic match
- Maintenance: when goldens go stale */}

## Catching regressions

{/* TODO: keeping bad changes out of main.
- Eval suites in CI
- Pass thresholds vs trend lines
- Dealing with non-determinism (seeded runs, n-of-m passes, statistical significance)
- Rollback signals: what triggers a "this got worse" alert */}

## Tooling landscape

{/* TODO: brief survey - LangSmith, Braintrust, Arize Phoenix, OpenAI Evals, custom in-house. Pick one based on tracing model and pricing. */}

---

## References

1. **[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)** - Anthropic Engineering. The single best primer; covers eval types, dataset design, and the build–measure–improve loop. Read first.
2. **[Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/)** - Hamel Husain. Practical playbook for building eval pipelines that actually catch real bugs.
3. **[LLM-as-a-Judge FAQ](https://hamel.dev/blog/posts/llm-judge/)** - Hamel Husain & Shreya Shankar. Long-form Q&A on judge models, calibration, and common eval mistakes.
4. **[Who Validates the Validators?](https://arxiv.org/abs/2404.12272)** - Shankar et al. The case for treating LLM-as-judge itself as a system needing evaluation.
5. **[LangSmith - agent evaluation docs](https://docs.smith.langchain.com/evaluation)** - Reference implementation for trajectory eval and dataset versioning.
6. **[Arize Phoenix](https://docs.arize.com/phoenix)** - Open-source tracing + eval platform; good model for thinking about traces as data.
7. **[OpenAI Evals](https://github.com/openai/evals)** - Reference for structuring eval suites as code + YAML, even if you don't use OpenAI models.
8. **[τ-bench](https://arxiv.org/abs/2406.12045)** - Tool-Agent-User benchmark from Sierra; trajectory-style eval for tool-using agents.
