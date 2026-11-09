---
slug: runtime-decisions-before-more-agents
title: Runtime decisions to settle before you add more agents
excerpt: Chapter 6 ends with five runtime checklist items. Here they become steps for this week, from replay versus snapshots to isolated environments per worker.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
Add no new agent until you can fill one page with five decisions. Chapter 6 of From Copilot to Colleague closes with a five-item checklist on agent runtimes. This post turns each item into a step for this week. Take them in order, because each one shapes the next.

## Decide how the system continues

First, choose replay or snapshots on purpose. A replay design keeps an event history and rebuilds state from what happened. The chapter says to reach for it when causality and auditability are the point, so state emerges from recorded steps and not from opaque frozen blobs. A snapshot design saves checkpoints of working state. Reach for it when fast continuation and elaborate live state dominate, so pause and resume stay cheap.

This week, hold a short meeting and finish one sentence that says whether the system needs replay or snapshots, and why. If nobody can finish it, the team is not ready to build either. The chapter notes that at this point teams make the decisions mature distributed systems always make: what gets persisted, what gets recomputed, and what must be auditable.

Second, place checkpoints where judgment lives. The chapter says the design question is not how to keep a human in every loop. It is where the few checkpoints that carry the most judgment should sit: before, during, or after execution. Its coding example lets subagents explore, draft, and run validations alone. Merge decisions, large architectural changes, and dependency additions wait for review. Mark those on your workflow diagram and remove approvals everywhere else.

## Decide how the system spends and isolates

Third, route each step to the cheapest model that still passes the eval, and no cheaper. The chapter calls the choice of model a control-plane decision made per task, not a global default set once. Laurie Voss at Arize says to use cheap models for simple queries and expensive models in your agent for complex ones. Routing adds a failure surface, though. A misroute hands a hard task to a cheap model that quietly botches it. Run your eval on the cheaper route first, and keep verification in place behind it.

Fourth, give every parallel worker its own isolated, ephemeral environment. Workers that share one dev setup collide on the same branch, ports, and database. One agent's migration breaks the others mid-run. The chapter says a git worktree suffices for trusted edits and untrusted, side-effecting work wants a VM. Rene Brandel at Casco warns that "if you just use containers ... that's not an isolation layer," because agent code can get root and move laterally. List how each worker is isolated today and mark which ones run untrusted work.

## Decide who sees what

Fifth, design observability for two audiences. Engineers need deep inspection of one trajectory. Operators need roll-up supervision across many. Good traces capture plans, tool calls, state changes, intermediate outputs, timings, and the boundaries between durable steps. Build redaction and risk-based views in from the start. The chapter warns that richer traces buy trust and retention risk in the same breath.

## The page

By Friday the page holds five short lines:

- Replay or snapshots, and why.
- Where humans review.
- Which model runs which step.
- How each worker is isolated.
- Who sees which trace.

If a line is blank, fix that line before you add a worker. More workers multiply whatever the runtime already lacks.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
