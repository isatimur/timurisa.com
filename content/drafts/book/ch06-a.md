---
slug: agents-are-stateful-workflows
title: Agents are stateful workflows with probabilistic nodes
excerpt: Chapter 6 says a production agent needs durable state, recovery, and human review points. A chat transcript supplies none of them.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
A chatbot can get away with amnesia. A production agent cannot. Chapter 6 of From Copilot to Colleague opens with those two sentences and spends the rest of the chapter on what follows from them.

A chat system answers a question, emits a patch, or suggests a draft, and then it is done. Work that runs across time, tools, failures, and approvals is different. The chapter says the question stops being whether the model can produce a smart next token. It becomes whether the surrounding system can keep intent, survive interruption, recover from error, show its progress, and stop in the right places for human review.

## A transcript is not state

The chapter says many impressive demos break here. The model is good enough and the context is strong. But the builders made the system like a conversation when it needed to be a workflow. It loses track of what already happened. A retry repeats work or performs the same action twice. An approval arrives after the risky step. The agent does not fail because it is unintelligent. It fails because it has nowhere durable to stand.

A transcript cannot be that place. It does not cleanly show task progress, pending approvals, completed tool calls, or which intermediate outputs are binding and which are disposable. Samuel Colvin marks the break point: "Once we get into longer running workflows, that's where it really becomes a problem." A short answer can be regenerated. A half-finished multi-step legal workflow cannot.

Preeti Somal supplies the chapter's backbone. She says that at the core of agentic AI applications is a complicated workflow that needs to handle state potentially over long periods of time, with human interaction for approvals. The chapter condenses this into one sentence: useful agentic systems are stateful workflows with probabilistic decision nodes.

## Structure makes agency survivable

The chapter calls the common debate a category error. People say workflows are rigid and agents are flexible, so choosing a workflow means giving up agency. The chapter reports the opposite lesson from production systems: workflow structure is what makes useful agency survivable.

The framing explains why pause and resume matter. It explains why retries should not live in ad hoc prompt logic, and why approvals belong inside execution.

State, in this view, is a structured memory of work. For a coding task it holds the current plan, completed tool runs, validation status, and pending questions for the reviewer.

## The human control plane

The chapter's title concept is the human control plane. It is the set of interfaces, approvals, visibility layers, and intervention mechanisms through which people supervise delegated machine work. The chapter treats it as an architectural layer. It does not treat it as a crutch on the way to full autonomy.

A chat transcript is usually too thin for supervision. Operators need queue views, roll-up summaries, pending-review surfaces, and clean points to step in. If the only way to supervise an agent is to read back through thousands of tokens, the control plane does not exist yet. Eric Zakariasson puts the need in plain English: "Here's what everyone is working on... and here's what you as a human need to review."

Control does not mean a person approves every step. The chapter calls it a gradient. The design task is to place the few checkpoints that carry the most judgment.

## Try this today

Pick one agent workflow your team runs. Write down what it must remember if it stops halfway: the plan, the finished tool calls, the pending questions for a human. Then check where that list lives. If it lives only in the prompt window, you have a chat and no runtime. Move the list into stored state first. Decide where a person steps in second.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
