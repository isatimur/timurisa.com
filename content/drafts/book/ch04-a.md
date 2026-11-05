---
slug: a-working-demo-is-not-a-control-loop
title: A working demo is not a control loop
excerpt: Models look right often enough that teams stop measuring. Chapter 4 argues that evals are the control system that makes delegation safe to trust.
categories: [AI engineering, Evals]
chapter: 4
---
The first failure mode of AI systems is obvious. They can be wrong. The second is more dangerous. They can look right often enough that teams stop measuring.

A demo works twice in a row. A prototype returns a plausible answer. A coding agent lands a decent patch in a familiar repo. Soon everyone speaks in the language of vibes. Ido Pesok captures the moment with a line every team knows: "It worked first try... I even tested it twice... So from there we're good to ship, right?"

In Chapter 4 I argue that the demo was not fake. The problem is that a successful demo is not yet a control loop.

## What evals are for

People often misread the role of evals. They are not there to decorate a launch deck or to compare two models in the abstract. They create a feedback system around delegated work. As tasks grow from single-line completion to repo-scale changes and multi-step workflows, the gap between toy metrics and operational reliability widens. The question changes. It stops being "Is the model smart?" It becomes "Can this system repeatedly do useful work in our environment without silently drifting out of bounds?"

For that reason I ask readers to stop treating evals as a one-time gate. Think of them as an instrument panel. They tell you when a new model is better on your work and when it is merely different. They tell you whether a prompt revision helped one slice and quietly hurt another. They tell you whether a new tool description raised completion rate but also raised latency or cost. They tell you whether your agent can still handle the failures that hurt you last month. Without that loop, a team runs a series of hopeful anecdotes, not a production system.

## Reliability did not get easier

It is tempting to believe that more capable models dissolved the old reliability problem. They did not. Samuel Colvin says, "We still want to build reliable scalable applications and that is still hard. Arguably it's actually harder with Gen AI than it was before." Generative systems fail in a broader range of ways, including ways that look correct. Prompt design, retrieval, tool calling, context assembly, and business logic all interact.

That complexity makes a single score attractive, because one number would shrink the uncertainty to a familiar size. I think the right answer to complexity is a richer control system. The chapter describes it as representative tasks, credible scoring, production observability, regression sets from real failures, comparison loops, and a habit of turning mistakes into reusable tests.

## The habit that matters

The chapter ends on the point I most want engineers to repeat. Once AI systems do work instead of suggesting it, measurement stops being optional. You cannot supervise every action, and you cannot reason from benchmark scores to production trust. Evals are not there to tell you whether your model is impressive. They tell you whether your system is safe to trust.

The question "Do we have evals?" is too small. A team can answer yes with one spreadsheet and one overworked engineer. The better question is whether you have an operating habit that turns a real failure into a better system.

So here is a concrete step. Take the last failure your AI system caused, even a small one that review let through. Write it down as a test case with a clear pass condition, and store it somewhere your team will run it again. That single case is the start of a control loop.

This post draws on Chapter 4 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
