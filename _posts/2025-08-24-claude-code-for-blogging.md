---
layout: post
comments: true
giscus_comments: true
title: Claude Code for Blogging
date: 2025-08-24 08:00:00
description: How I use Claude Code for my blogging workflow
tags: ai blogging productivity
categories: tutorial
---

There's something recursive about using Claude Code to research and write a blog post about using Claude Code for blogging. As I sit here, watching Claude pull insights from [Anthropic's best practices guide](https://www.anthropic.com/engineering/claude-code-best-practices), search for advanced MCP integrations, and help structure the first draft. This is a pretty great QOL improvement in my content creation workflow.

This isn't a "AI will change everything" post. It's a distillation of what works for me right now.

## Why This Stack Works

A key reason why my blogging stack works is pairing Claude Code with Jekyll and GitHub. Jekyll's file-based architecture means everything is version-controlled, editable, and transparent. Claude Code can read your existing posts to understand your voice and examine your site structure to suggest improvements. It's like having a writing partner who also understands git, markdown, and web development.

Want to analyze your content for patterns? It can read through your entire `_posts` directory. Planning a series of related posts? It can maintain continuity by referencing your existing content.

GitHub integration also allows me to set up workflows where mentioning `@claude` in issues automatically generates content updates, fixes, or even entire blog posts via pull requests.

The real power emerges when you move past basic "write me a blog post" prompts to sophisticated, multi-layered workflows.

**Custom Command Templates**: You can create reusable templates in `.claude/commands/` that become [slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands). My `/blog-post` command automatically generates Jekyll blank blog post with proper formatting, suggests relevant tags based on my existing posts, and even includes a basic structure tailored to my writing style. It's a personal blog post scaffold that learns from my patterns.

**Multi-Agent Workflows**: Instead of asking Claude to do everything at once, you can deploy specialized subagents. I use one agent focused purely on research and fact-checking, another for initial drafting that understands my voice and technical level, and a third for editing that knows my common weak spots. These agents can work in parallel, dramatically speeding up complex posts.

**Session Management Strategy**: Use `/init`, `/compact`, and `/clear` strategically. Starting each writing session with `/init` establishes my blog's style guide, recent post themes, and current projects. This context persistence means Claude doesn't just help with individual posts - it understands your blog's evolution over time.

## MCP Integration

This is where things get genuinely transformative. The [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) ecosystem, particularly tools like [Perplexity MCP](https://github.com/jsonallen/perplexity-mcp), turns Claude Code from a writing assistant into a research powerhouse.

With Perplexity MCP installed, I can perform real-time web searches without leaving Claude Code (To be fair, Claude Code can do websearches by itself now). Working on a post about Ethereum staking? I can search for the latest validator metrics, recent protocol updates, or community discussions - all while maintaining the context of my draft. The research becomes integrated rather than scattered across browser tabs and note-taking apps.

But it goes deeper than individual searches. MCP tools can maintain ongoing research threads, automatically fact-check claims against current data, and even suggest related topics based on trending discussions. Your blog posts become more timely, accurate, and comprehensive without the traditional research overhead.

The context-aware aspect is crucial - these aren't just isolated web searches. Claude Code can correlate new research with your existing posts, identify gaps in your coverage, and suggest natural follow-up topics. Your blog evolves from a collection of individual posts into a coherent knowledge graph.

Beyond [Perplexity MCP](https://github.com/jsonallen/perplexity-mcp), other MCP tools are worth exploring: [Obsidian MCP](https://github.com/MarkusPfundstein/mcp-obsidian) can index your research notes into SQLite for instant retrieval, Memory Bank MCP maintains context across sessions (imagine Claude remembering your blog series themes weeks later), and the [official Notion MCP](https://github.com/makenotion/notion-mcp-server) handles content planning and todo management with full workspace access.

## My Actual Workflow

Here's how my typical blog post comes together, step by step:

**Step 1: Context Initialization** - Every writing session starts with `/init`, which loads my blog style guide, recent post themes, and any ongoing series. This isn't just about consistency - it's about Claude understanding where this post fits in my broader narrative.

**Step 2: Research Phase** - Using MCP tools, I gather current information, fact-check assumptions, and explore related topics. The key insight: this research happens within the same context where I'm writing, so connections and insights emerge naturally.

**Step 3: Multi-Agent Content Creation** - My research agent compiles findings and suggests angles. My draft agent takes these insights and creates the initial structure and content, maintaining my voice and technical level. My editing agent reviews for clarity, flow, and consistency with my existing posts.

**Step 4: Jekyll Integration** - Claude Code handles the technical details - proper front matter formatting, tag suggestions based on content analysis, and even image optimization if needed. It can trigger local builds to catch formatting issues before publication.

The entire process feels collaborative rather than automated. I'm not just delegating writing to AI - I'm orchestrating a content creation process where AI handles routine tasks while I focus on strategy, voice, and unique insights.

Some tips I learnt along the way:

- Instead of long lists of dos and don'ts, I structure prompts as step-by-step algorithms with decision points. "First, analyze the topic's technical complexity. If high, include a basics section. Then, check my recent posts for related content and reference appropriately." This approach produces more reliable results than vague style guidelines.

- I either write a first draft and ask Claude Code to flesh it out more, or I ask Claude Code to do research and write the first draft (remember to use Planning mode!). In any case, I iterate in a separate Vim instance. I've learned to expect 3-5 refinement cycles per post, and that's actually a feature, not a bug. Each iteration can focus on a different aspect - first structure and flow, then technical accuracy, then voice and style. The key is being direct about requirements and expressing urgency clearly when something needs immediate attention.

- Managing session context is an art. Too little context and Claude loses track of your blog's voice and themes. Too much and responses become slow and unfocused. The sweet spot is maintaining awareness of 5-10 recent posts and your core style guide while using `/compact` to summarize longer research sessions.

What's overhyped? The idea that AI can completely replace your editorial judgment. Claude Code excels at research, drafting, and technical formatting, but the strategic decisions about what to write, how to position arguments, and when to publish still require human insight.

Below are a few more MCP tools I have found useful:

- [Obsidian MCP](https://github.com/MarkusPfundstein/mcp-obsidian) monitors your vault and indexes metadata into SQLite - perfect for maintaining a searchable research archive. The File System MCP provides enhanced local file operations beyond basic Claude Code capabilities.
- [Memory Bank MCP](https://github.com/alioshr/memory-bank-mcp) allows Claude Code to maintain awareness of themes and discussions across multiple sessions. No more re-explaining your blog's focus every time you start writing.
- The [official Notion MCP](https://developers.notion.com/docs/mcp) offers full workspace access with OAuth, making it ideal for content calendars and editorial planning. GitHub MCP can automate issue creation for blog ideas and manage content workflows.

May your writing be smooth and impactful.
