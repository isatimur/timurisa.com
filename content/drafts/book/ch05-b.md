---
slug: context-checks-this-week
title: A week of context checks for your retrieval system
excerpt: Five checks from the Chapter 5 checklist that a team can run in one week to find out whether context assembly or the model is the problem.
categories: [AI engineering, Context engineering]
chapter: 5
---
Chapter 5 of my book ends with a practical checklist. Five items. Each one is small enough to try in a day. Together they tell you whether your context system helps the work or only looks good in a diagram.

I will take them in the order a team could run them across a week.

## Monday and Tuesday: look and measure

Start with one signal. Plot accuracy against the number of retrieved documents. If accuracy drops as you add documents, the middle of the context window is getting lost. The model is not getting dumber. The book's fix is better assembly, such as summarization, graphs, or iterative retrieval, not a bigger window.

Next, change what you instrument. Most teams track how big the index is. I suggest tracking how little of it the answer needed. Kuba Rogut relays Jeff Dean: you do not need a trillion tokens at once, you need the right million. So record how much of what you retrieved a task actually used. That number tells you where you are wasting attention and money.

On cost, Rajkumar Sakthivel's team at Tesco says 90 percent of AI cost is input: files, search results, and context you send in. Only 10 percent is output. His team cut input tokens by 94 percent on a public benchmark by retrieving relevant slices of a codebase instead of pasting whole files. He is careful to say that is a best case, and real setups will not match it. Treat it as a reason to measure, not as a target.

## Wednesday and Thursday: match and separate

Now look at your retrieval mechanism. Match it to the shape of the answer. Use vector search when the answer is a single similar passage. Use graph traversal when the answer is a path along explicit relationships. Use keyword or metadata filters when exactness is what matters. Do not make one mechanism carry all three jobs. Mature systems layer them.

Then split your eval in two. Score retrieval and generation as separate questions. First, check whether the governing passage reached the assembled working set at all. That is a recall measure on the context layer. Only then score whether the model used it correctly. If you score only the final answer, a context-assembly bug looks exactly like a model getting dumber. You may then spend a model upgrade on a retrieval problem.

## Friday: change a default

The last item is about people. When a fix depends on users opting in, assume almost no one will. GitHub learned this with its remote MCP server. After community contributions pushed it past a hundred tools, the agents got measurably worse. The first fixes were opt-in tool sets and dynamic discovery. Almost no one used them, because most users never touch the JSON config. GitHub changed the default instead and cut the initial tool-load context by 49 percent. The number of tools the agent could call did not fall. The number it had to read did.

So on Friday, find one place where your system relies on a setting nobody changes. Change the default.

By the end of the week you will have four facts: how accuracy moves with document count, how much context a task really uses, whether the right passage arrives, and which defaults carry your product. Write them on one page. That page is your first honest view of your context system, and it will tell you what to fix first.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
