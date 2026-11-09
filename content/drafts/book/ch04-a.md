---
slug: a-working-demo-is-not-a-control-loop
title: A working demo is not a control loop
excerpt: Models look right often enough that teams stop measuring. Chapter 4 argues that evals are the control system that makes delegated work safe to trust.
categories: [AI engineering, Evals]
chapter: 4
---
A demo works twice in a row, and a team decides to ship. Chapter 4 of the book starts here, with a line from Ido Pesok that every team knows: “It worked first try... So from there we’re good to ship, right?”

The chapter names two failure modes. The first is obvious: AI systems can be wrong. The second is more dangerous: they can look right often enough that teams stop measuring. A prototype returns a plausible answer. A coding agent lands a decent patch in a familiar repo. Soon everyone speaks in the language of vibes.

The chapter does not call the demo fake. It says a successful demo is not yet a control loop.

## What evals are for

The chapter says evals do not exist to decorate a launch deck or to compare two models in the abstract. They build a feedback system around delegated work.

Tasks have grown from single-line completion to repo-scale changes and multi-step workflows. As they grow, toy metrics drift away from operational reliability. The question changes. "Is the model smart?" gives way to "Can this system repeatedly do useful work in our environment without silently drifting out of bounds?"

So the chapter asks readers to drop the one-time gate and treat evals as an instrument panel. The panel shows four things:

- whether a new model is better on your work or only different
- whether a prompt revision helped one slice and quietly hurt another
- whether a new tool description raised completion rate but also raised latency or cost
- whether the agent still handles the failures that hurt you last month

Without that loop, a team runs on hopeful anecdotes. It does not run a production system.

## Reliability did not get easier

Some people talk as if stronger models dissolved the old reliability problem. The chapter disagrees. Samuel Colvin says, “We still want to build reliable scalable applications and that is still hard. Arguably it’s actually harder with Gen AI than it was before.”

Generative systems fail in a broader range of ways, including ways that look correct. Prompt design, retrieval, tool calling, context assembly, and business logic all interact.

That tangle makes a single score attractive. One number would shrink the uncertainty to a familiar size. The chapter rejects that shortcut and asks for a richer control system: representative tasks, credible scoring, production observability, regression sets from real failures, comparison loops, and a habit of turning mistakes into reusable tests.

## The habit that matters

Once AI systems do work instead of suggesting it, measurement stops being optional. You cannot supervise every action. You cannot reason from benchmark scores to production trust, however impressive the model feels in a demo. Evals do not tell you whether your model is impressive. They tell you whether your system is safe to trust.

The chapter also calls "Do we have evals?" too small a question. A team can answer yes with one spreadsheet and one overworked engineer. The better question is whether the team has an operating habit that turns a real failure into a better system.

Take the last failure your AI system caused, even a small one that review let through. Write it as a test case with a clear pass condition. Store it where your team will run it again. That single case is the start of a control loop.

This post draws on Chapter 4 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
