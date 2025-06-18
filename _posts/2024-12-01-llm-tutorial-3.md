---
layout: post
comments: true
giscus_comments: true
title: Quick Prompt Engineering Tip 3 - Grounding LLM Responses
date: 2024-12-01 08:00:01
description: Grounding is key, but how should you present the info to LLMs?
tags: ai tutorial
categories: tutorial
---

If we can provide a model with trusted, relevant information, we can guide it to compose answers grounded in that knowledge rather than relying on its training data alone. But how we present this information matters significantly.

I recently tested different prompting patterns across Claude, GPT-4, and Gemini where the focus was on two key variables:

1. Document placement (context before vs. after the question)
2. Quote requirements (explicit vs. implicit)

Key findings from testing across models:

- Document-first prompts consistently produced more reliable results - like giving someone a map before asking for directions
- Quote requests provided an additional safety net against hallucinations, though the impact was smaller than I originally expected
- Even these "smaller" models (Haiku, GPT-4o-mini, Gemini 1.5) handled these tasks well, showing how base capabilities have improved

Key takeaways:

1. When building RAG systems, place your context before questions.
2. When reliability is crucial, add quote requirements as an extra verification layer.

Code and full examples: [https://github.com/limyewjin/llm-tutorial-grounding](https://github.com/limyewjin/llm-tutorial-grounding)
