---
title: KV cache
sidebar_label: KV cache
---

# KV cache

> Work in progress. Notes coming soon.

Why transformer decoders cache K and V tensors at inference time, and the memory math behind it.

## Theory

### In simple words

{/* TODO: plain-language explanation */}

### More depth

{/* TODO: precise mechanics, edge cases, why-this-design */}

## The Math

{/* TODO: equations, dimensions, complexity */}

## The Code

{/* TODO: minimal PyTorch / JAX snippet */}

## References

1. **[Efficient Memory Management for Large Language Model Serving with PagedAttention (Kwon et al., 2023)](https://arxiv.org/abs/2309.06180)** — The vLLM paper; introduces PagedAttention to handle KV cache memory fragmentation at serving scale, accepted to SOSP 2023.
2. **[KV Cache — HuggingFace Transformers docs](https://huggingface.co/docs/transformers/kv_cache)** — Practical guide covering DynamicCache, StaticCache, quantized cache, offloading, and prefix caching with runnable PyTorch examples.
3. **[Large Transformer Model Inference Optimization — Lilian Weng (2023)](https://lilianweng.github.io/posts/2023-01-10-inference-optimization/)** — Broad survey of inference optimisation techniques including KV cache mechanics, memory bandwidth bottlenecks, and speculative decoding.
4. **[Llama 3.1 — Inference Memory Requirements (HuggingFace blog)](https://huggingface.co/blog/llama31#inference-memory-requirements)** — Concrete KV cache memory tables for 8B / 70B / 405B models at 1k–128k context lengths; makes the O(n × d × layers × 2) cost visceral.
5. **[Understanding and Coding Self-Attention, Multi-Head Attention, Cross-Attention, and Causal-Attention in LLMs (Sebastian Raschka)](https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html)** — Code-first walkthrough of Q/K/V mechanics from scratch in PyTorch; good foundation before diving into the caching layer.
