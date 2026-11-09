---
slug: make-agent-mistakes-survivable
title: Build so that an agent being wrong is survivable
excerpt: Chapter 7 says a model can never enforce its own power. Build sandboxes, narrow scopes, and boundaries that hold when the model is wrong.
categories: [AI engineering, Security]
chapter: 7
---
A helpful model can get away with being vague about power. An acting system cannot. Chapter 7 opens with those two sentences and spends the rest of the chapter on them.

An agent that reads across accounts, calls tools, executes code, or keeps working after the user looks away changes the trust question. Trust stops being a judgment about how smart the model sounds. It becomes an architecture question. Who is this system acting as? What can it reach? What can it do without asking again? What evidence remains afterward? How fast can its power be reduced or revoked?

## The model is not the enforcement layer

The chapter gives one rule: a model can never be the final enforcement layer for its own power.

Take an agent that can execute code, browse untrusted content, open files, or chain across tools. The design must assume someone can push it into bad behavior. A malicious instruction can do it. So can a poisoned page, a bug in a tool description, or a plain misunderstanding. The cause matters less than the consequence.

The chapter's blunt principle follows. Assume the agent will sometimes be wrong, and build so that being wrong is survivable. In classic software, developers wrote the code paths and could know them ahead of time. In agentic software, the system picks among many paths at runtime. The model may improvise. The environment should fail closed.

## A code agent shows the stakes

The chapter uses the Software Factory to make this concrete. A code agent with repository access is dangerous when it writes a bad patch. It is also dangerous when it can quietly inspect secrets, change CI configuration, add a dependency, call external services, or keep iterating after a misleading instruction entered the loop. Once code execution is in play, the idea that a better prompt solves trust is hard to defend.

So the chapter moves the conversation to runtime design: operating system boundaries, execution isolation, token scope, credential lifetimes, and mediation layers. These decide what the system can do when the model is confused, manipulated, or simply too eager.

The chapter does not argue against alignment work. A serious discipline studies what a model is disposed to do, refuse, and value. The book covers a different layer: the boundaries, identities, sandboxes, and audit trails that must hold even when the model's inner alignment is imperfect.

## Narrow power helps twice

Narrow powers protect the organization. They also shrink the number of tempting but unsafe paths the model can wander into. A tighter design often makes the system easier to reason about, not only safer.

The chapter sums it up in one sentence: safe delegation comes from making carelessness less powerful, not from asking the model to be careful.

## One thing to do

Pick one agent you run today. Find the step where it holds the most power. Write down the worst plausible mistake there, whether from a bad instruction or a plain error. Then ask: would that mistake be survivable?

If the answer is no, narrow the power at that step before you spend another hour improving the prompt.

This post draws on Chapter 7 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
