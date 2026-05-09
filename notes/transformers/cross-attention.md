---
title: Cross-attention
sidebar_label: Cross-attention
---

# Cross-attention

> Work in progress. Notes coming soon.

When Q comes from one sequence and K/V come from another — the bridge between encoder and decoder, and the basis of multimodal attention.

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

1. **[Attention Is All You Need (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)** — The original transformer paper; Section 3.2.3 defines the encoder-decoder cross-attention layer where decoder queries attend to encoder key-value pairs.
2. **[The Illustrated Transformer — Jay Alammar](https://jalammar.github.io/illustrated-transformer/)** — Best visual introduction to how cross-attention connects the encoder output to each decoder step; the diagrams make the Q/K/V source split immediately obvious.
3. **[The Annotated Transformer — Harvard NLP (Sasha Rush)](https://nlp.seas.harvard.edu/annotated-transformer/)** — Line-by-line PyTorch implementation of the original transformer; cross-attention is visible as a distinct `MultiHeadedAttention` call with a separate memory input.
4. **[High-Resolution Image Synthesis with Latent Diffusion Models (Rombach et al., 2022)](https://arxiv.org/abs/2112.10752)** — Stable Diffusion's foundation; Section 3.3 shows cross-attention used for text-to-image conditioning — text token embeddings become K/V while spatial feature maps supply Q.
5. **[Perceiver IO: A General Architecture for Structured Inputs & Outputs (Jaegle et al., 2021)](https://arxiv.org/abs/2107.14795)** — Generalises cross-attention as a scalable inductive bias: a small latent array queries arbitrary-size input arrays via cross-attention, decoupling model complexity from input size.
