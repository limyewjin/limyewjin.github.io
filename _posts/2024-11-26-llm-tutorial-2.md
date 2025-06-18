---
layout: post
comments: true
giscus_comments: true
title: Quick Prompt Engineering Tip 2 - Master Length Control in LLMs 📏
date: 2024-11-24 08:00:00
description: One common requirement I have using LLMs is controlling their response length
tags: ai tutorial
categories: tutorial
---

One common requirement I have using LLMs is controlling their response length (maximum number of words, minimum number of words, number of bullet points, etc.). I have done a few tests to share some key insights for controlling length in LLMs.

# Response Text Length

- "At Most X Words" What surprised me most was how consistently the "at most X words" format outperformed other approaches. While exact word counts tend to overshoot by 10-15%, the "at most" modifier acts like a reliable ceiling. In our tests, the various models from Anthropic, Google, and OpenAI consistently stayed under the specified limit.

A Practical Framework for Length Control:

1. For Strict Upper Bounds: Use "at most X words" - it's your most reliable tool across all models. I've found this especially crucial for applications with strict space constraints.
2. For Minimum Length Requirements: The "at least X words" modifier works, but expect significant variations. In our tests, outputs ranged from 119 to 238 words for a 100-word minimum requirement. If you need longer content, this is actually a feature, not a bug.
3. Avoid Common Pitfalls:

- Qualitative descriptors ("short," "very short") showed the highest variance in our tests
- Reading time estimates ("30 seconds long") proved surprisingly inconsistent
- The format of numbers ("100" vs "one hundred") doesn't significantly impact results

# Bullet Points

As you might expect, using ordered lists (e.g., 1., 2., 3., …) works better than unordered, but really only for longer lists. The models across Anthropic, Google, and OpenAI show near-perfect precision for small to medium lists (3-20 points) but diverge significantly with larger requests. For instance, when asking for 50 points, OpenAI tends to overshoot while Anthropic often undershoots with ordered lists.

What's been your experience with controlling LLM output length? Have you noticed any patterns I might have missed in my testing? Let's continue building our collective understanding of these fascinating tools.

Code & data here: [https://github.com/limyewjin/llm-tutorial-length](https://github.com/limyewjin/llm-tutorial-length)
