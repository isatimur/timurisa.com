---
slug: make-agent-mistakes-survivable
title: Build so that an agent being wrong is survivable
excerpt: A model should never enforce its own power. Chapter 7 argues for sandboxes, narrow scopes, and boundaries that hold when the model is wrong.
categories: [AI engineering, Security]
chapter: 7
---
A helpful model can get away with being vague about power. An acting system cannot. That pair of sentences opens Chapter 7, and they hold the whole chapter in small form.

Once an agent can read across accounts, call tools, execute code, or keep working after you have looked away, trust stops being a judgment about how smart the model sounds. It becomes an architecture question. Who is this system acting as? What can it reach? What can it do without asking again? What evidence remains afterward? How fast can we reduce or revoke its power?

## The model is not the enforcement layer

The chapter gives one rule I would like you to repeat. A model can never be the final enforcement layer for its own power.

If an agent can execute code, browse untrusted content, open files, or chain across tools, the design must assume someone can induce it into bad behavior. A malicious instruction can do it. So can a poisoned page, a badly described tool, or a plain misunderstanding. The cause matters less than the consequence.

So the principle is blunt. Assume the agent will sometimes be wrong, and build so that being wrong is survivable. In classic software, developers wrote the code paths and could know them ahead of time. In agentic software, the system chooses among many paths at runtime. The model may improvise. The environment should fail closed.

## Where the boundaries live

This pushes security talk toward runtime design. It becomes a talk about operating system boundaries, execution isolation, token scope, credential lifetimes, and mediation layers. These decide what the system can do when the model is confused, manipulated, or simply too eager.

The chapter cites Fouad Matin's security guidance for coding agents at OpenAI. It names four controls as the default-on baseline: sandboxing, network restriction, privilege boundaries, and human review. Each one bounds a different failure. A bad command, exfiltration, over-reach when the agent is wrong, and the trajectory the first three let through.

I am not arguing against alignment work. There is a serious discipline devoted to what a model is disposed to do, refuse, and value. The book covers a different layer. It covers the engineering around the model: the boundaries, identities, sandboxes, and audit trails that must hold even when the model's inner alignment is imperfect.

Narrow powers help in a second way. They reduce the number of tempting but unsafe paths the model can wander into. A tighter design often makes the system easier to reason about, not only safer. The chapter puts it this way: safe delegation comes from making carelessness less powerful, not from asking the model to be careful.

None of this is a promise that nothing will go wrong. Controls bound failures. They do not remove the need to expect them.

## One thing to do

Pick one agent you run today. Find the step where it holds the most power. Write down the worst plausible mistake it could make there, whether from a bad instruction or a plain error. Then ask one question: would that mistake be survivable? If the answer is no, narrow the power at that step before you spend another hour improving the prompt.

This post draws on Chapter 7 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
