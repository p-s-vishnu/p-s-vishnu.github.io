---
title: OCR
tags:
  - llm
---

## [Gemini 2.0 ingesting millions of PDFs](https://www.sergey.fyi/articles/gemini-flash-2)

Result: Gemini 2.0 found to be better compared to other providers for Table OCR.

**Evaluation dataset:** Subset of Reducto’s [rd-tablebench](https://github.com/Filimoa/rd-tablebench). [Hugging Face dataset link](https://huggingface.co/spaces/reducto/rd_table_bench).

**Evaluation Metric:** Needleman-Wunsch algorithm accuracy, In table OCR, this algorithm aligns the predicted output with the ground truth table, scoring the degree of similarity and providing an objective measure of accuracy.

