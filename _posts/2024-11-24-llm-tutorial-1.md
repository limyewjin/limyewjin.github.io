---
layout: post
comments: true
giscus_comments: true
title: Quick Prompt Engineering Tip 1 - Chain Your Prompts! 🔄
date: 2024-11-24 08:00:00
description: The saying goes, 'Writing is rewriting.' The same applies to LLMs!
tags: ai tutorial
categories: tutorial
---

The saying goes, "Writing is rewriting." The same applies to LLMs! Just like how we ask humans to double-check their work, we can prompt LLMs to review and improve their responses.

Here's a simple example:

1. First prompt: "List 10 words ending in 'ab'"
2. Chain prompt: "Now check if each word is valid. Show your analysis and replace any invalid ones."

This simple chaining technique can lead to improved results. The key is asking the model to:

- Show its reasoning
- Break down its analysis
- Replace incorrect answers

Important caveat: Like any prompt engineering technique, results vary based on the task complexity and model capability. I tested this with base-tier models across OpenAI, Anthropic, and Google - while the improvement wasn't dramatic, the models were able to identify errors from their initial responses without introducing new ones during the chaining step.

Always test your prompting strategies! Check out my experiment code here: [https://github.com/limyewjin/llm-tutorial-chaining](https://github.com/limyewjin/llm-tutorial-chaining)
