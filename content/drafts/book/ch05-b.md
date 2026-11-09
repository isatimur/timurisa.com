---
slug: context-checks-this-week
title: A week of context checks for your retrieval system
excerpt: Five checks from the Chapter 5 checklist, one per working day, to learn whether context assembly or the model is your real problem.
categories: [AI engineering, Context engineering]
chapter: 5
---
Chapter 5 ends with a checklist of five items. Each fits in one working day. Run them Monday to Friday and a team learns whether its context system helps the work or only looks good in a diagram.

## Monday: plot accuracy against document count

Take your retrieval system and vary the number of retrieved documents. Plot accuracy for each count. If accuracy drops as you add documents, the middle of the context window is getting lost. The chapter says this is not the model getting dumber. Its fix is better assembly, such as summarization, graphs, or iterative retrieval, not a bigger window.

## Tuesday: measure how little the answer needed

Most teams track how big the index is. The chapter asks teams to track how little of it the answer needed. Kuba Rogut relays Jeff Dean on the sizing rule: you do not need a trillion tokens at once, you need the right million. So record how much of what you retrieved each task actually used.

The chapter adds a cost figure. Rajkumar Sakthivel's team at Tesco states that 90 percent of AI cost is input: files, search results, and context you send in. Retrieving only the relevant slices of a codebase, instead of pasting whole files, cut their input tokens by 94 percent on a public benchmark. He says this is a best case, and real setups will not match it. Use it as a reason to measure, not as a target.

## Wednesday: match the mechanism to the answer

Match each retrieval mechanism to the shape of the answer. Use vector search when the answer is a single similar passage. Use graph traversal when the answer is a path along explicit relationships. Use keyword or metadata filters when exactness matters. Do not make one mechanism carry all three jobs. Mature systems layer them.

## Thursday: split the eval in two

Score retrieval and generation as separate questions. First check whether the governing passage reached the assembled working set at all. That is a recall measure on the context layer. Only then score whether the model used it correctly. If you score only the final answer, a context-assembly bug looks exactly like a model getting dumber. Then a model upgrade gets wasted on a retrieval problem.

## Friday: change one default

The last item concerns people. When a fix depends on users opting in, assume almost no one will. The chapter tells the GitHub story. Community contributions pushed its remote MCP server past a hundred tools, and the agents got measurably worse. The first fixes were opt-in tool sets and dynamic discovery. Almost no one used them, because most users never touch the JSON config. GitHub changed the default and cut the initial tool-load context by 49 percent. The number of tools the agent could call did not fall. The number it had to read did.

So on Friday, find one setting in your system that nobody changes. Change its default.

## Close the week with one page

Write four lines. How accuracy moves with document count. How much context a task really uses. Whether the governing passage arrives. Which default you changed. Pin the page where the team sees it. The weakest line is your first fix.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
