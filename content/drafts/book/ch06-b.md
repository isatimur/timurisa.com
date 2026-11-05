---
slug: runtime-decisions-before-more-agents
title: Runtime decisions to settle before you add more agents
excerpt: Five checklist items from Chapter 6 turned into steps a team can take this week, from replay versus snapshots to isolated environments for each worker.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
Chapter 6 of my book closes with five checklist items about agent runtimes. I wrote them as principles. Here I turn them into steps a team can take this week. Do them in this order, because each one shapes the next.

## Decide how the system continues

First, choose replay or snapshots on purpose. A replay design keeps an event history and rebuilds state from what happened. Reach for it when causality and auditability are the point, so state emerges from recorded steps and not from opaque frozen blobs. A snapshot design saves checkpoints of working state. Reach for it when fast continuation and elaborate live state dominate, so pause and resume stay cheap.

This week, hold a short meeting and write one sentence: our system needs replay, or snapshots, because of this. If you cannot finish the sentence, you are not ready to build either. The chapter says teams at this point are making the decisions mature distributed systems always make: what gets persisted, what gets recomputed, and what must be auditable.

Second, place checkpoints where judgment lives. The design question is not how to keep a human in every loop. It is where the few checkpoints that carry the most judgment should sit, before, during, or after execution. In a coding factory, subagents might explore, draft, and run validations alone, while merge decisions, large architectural changes, and dependency additions wait for review. Mark those on your workflow diagram and remove approvals everywhere else.

## Decide how the system spends and isolates

Third, route to the cheapest model that still passes the eval, and no cheaper. Which model runs a step is a control-plane decision made per task. It is not a global default chosen once. Laurie Voss at Arize says to use cheap models for simple queries and expensive models in your agent for complex ones. But routing adds a failure surface. A misroute hands a hard task to a cheap model that quietly botches it. So run your eval on the cheaper route first, and keep verification in place behind it.

Fourth, give every parallel worker its own isolated, ephemeral environment. If several agents share one dev setup, they collide on the same branch, ports, and database. One agent's migration can break the others mid-run. A git worktree is enough for trusted edits. Untrusted, side-effecting work needs a VM. Rene Brandel at Casco warns that if you just use containers, that is not an isolation layer, because agent code can get root and move laterally. Audit how your workers are isolated today and mark which ones run untrusted work.

## Decide who sees what

Fifth, design observability for two audiences at once. Engineers need deep inspection of one trajectory. Operators need roll-up supervision across many. Good traces capture plans, tool calls, state changes, intermediate outputs, timings, and the boundaries between durable steps. Add redaction and risk-based views from the start. Richer traces buy trust and retention risk in the same breath.

At the end of the week you should hold five short decisions on one page. Replay or snapshots. Where humans review. Which model runs which step. How each worker is isolated. Who sees which trace. Add no new agent until that page exists. More workers multiply whatever your runtime already lacks.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
