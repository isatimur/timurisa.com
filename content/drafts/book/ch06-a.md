---
slug: agents-are-stateful-workflows
title: Agents are stateful workflows with probabilistic nodes
excerpt: Chapter 6 argues that a production agent needs durable state, recovery, and human review points. A chat transcript cannot supply them.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
A chatbot can get away with amnesia. A production agent cannot. That is the opening line of Chapter 6 of my book, and the rest of the chapter works out what follows from it.

A chat system can answer a question, emit a patch, or suggest a draft, and then disappear. Once you ask a system to do work that unfolds across time, tools, failures, and approvals, the center of gravity moves. The question is no longer whether the model can produce a smart next token. The question is whether the surrounding system can preserve intent, survive interruption, recover from error, expose its progress, and stop in the right places for human review.

## A transcript is not state

Many impressive demos break here. The model may be good enough. The context may be strong. But the builders made the system like a conversation when it needed to be a workflow. It loses track of what already happened. A retry repeats work or performs the same action twice. An approval arrives after the risky step. In my words, the agent does not fail because it is unintelligent. It fails because it has nowhere durable to stand.

A transcript cannot be that place. It does not cleanly show task progress, pending approvals, completed tool calls, or which intermediate outputs are binding. Samuel Colvin puts the break point simply: "Once we get into longer running workflows, that's where it really becomes a problem." A short answer can be regenerated. A half-finished legal workflow cannot.

Preeti Somal gives the best backbone for the chapter. She says that at the core of agentic AI applications is a complicated workflow that needs to handle state potentially over long periods of time, with human interaction for approvals. From that I draw one sentence: useful agentic systems are stateful workflows with probabilistic decision nodes.

This ends a false choice. People sometimes say workflows are rigid and agents are flexible, so choosing workflows means giving up agency. I argue the opposite. Workflow structure is what makes useful agency survivable. It explains why pause and resume matter, why retries should not live in ad hoc prompt logic, and why approvals belong inside execution.

## The human control plane

The chapter's title concept follows. The human control plane is the set of interfaces, approvals, visibility layers, and intervention mechanisms through which people supervise delegated machine work. I treat it as an architectural layer. It is not a crutch on the way to full autonomy.

A chat transcript is usually not enough for supervision. Operators need queue views, roll-up summaries, pending-review surfaces, and clean intervention points. If the only way to supervise an agent is to read back through thousands of tokens, the control plane does not exist yet. Eric Zakariasson states the need in plain English: "Here's what everyone is working on... and here's what you as a human need to review."

None of this means a person approves every step. Control is a gradient. The design task is to place the few checkpoints that carry the most judgment.

Here is the takeaway. Pick one agent workflow you run today. Write down what it must remember if it stops halfway: the plan, the finished tool calls, the pending questions for a human. If that list lives only in the prompt window, you have a chat, not a runtime. Move the list into stored state first, then decide where a person should step in.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
