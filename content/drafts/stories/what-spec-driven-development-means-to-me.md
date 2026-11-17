title: What spec-driven development means to me
slug: what-spec-driven-development-means-to-me
excerpt: A working definition of spec-driven development, how it differs from paperwork, and the files I use to practise it in my own projects. Part 1 of a series.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T09:00:00.000Z

This is the first article in a series about spec-driven development, or SDD. I will keep it practical. Each article takes one idea and shows where it lives in my own repositories.

## A working definition

In my book research I wrote down this definition. Spec-driven development makes task intent, constraints, acceptance criteria, and system boundaries explicit enough that humans and agents can implement against them reliably.

Two words in that sentence matter. The first is "explicit". A spec states what you would otherwise leave in your head. The second is "against". A spec is something you build against and check against. If nobody ever compares the result with the spec, it is only a document.

## Why vague requests got more dangerous

When coding agents were weak, a vague request produced a weak result, and you noticed at once. Now agents are strong. A vague request produces a confident, plausible result that may solve a different problem. The cost of a missing constraint went up, because the agent will carry on without it.

My notes put it this way: specs convert ambiguous desire into executable coordination. They help people agree with each other. They help agents avoid sprawl. They help evals decide whether a change is correct.

## Not bureaucracy, and not a PRD

Two distinctions from my notes guard against the wrong reading.

First, SDD is not about producing more documents. The goal is a clearer execution contract. If a document does not change what an agent does or how a reviewer judges, delete it.

Second, an ordinary product requirements document is usually not enough. Many are too narrative, too vague, or too incomplete to guide an agent.

## One public example

Al Harris, a principal engineer at Amazon, described the approach his team built into the Kiro IDE in [a conference talk](https://www.youtube.com/watch?v=HY_JyxAZsiE). The flow takes a prompt and turns it into three artifacts: requirements with acceptance criteria, a design, and a task list. He describes the spec as the artifacts that represent the state of the system at a point in time, plus a structured workflow, plus tools on top that make results reproducible.

He treats the spec as something that moves through three stages, not as a single file written once.

## What it looks like in my repos

My city map projects carry their spec in plain files at the root of each repository. `AGENTS.md` tells an agent where to start and what the rules are. `PLAN.md` holds the plan and the remaining rounds. `feature_list.json` lists the features with how to verify each one. `evaluator-rubric.md` scores a finished change. `session-handoff.md` and a clean-state checklist carry the work from one session to the next.

None of these is long. Each answers one question for an agent that has never seen the project: where do I start, what is next, how do I prove it works, how do I judge it, and what do I leave behind.

## The series

The next articles take these files one at a time, and then look at what other practitioners say about the same problems.

I start with [requirements a machine can check](/blog/requirements-a-machine-can-check), then [AGENTS.md as a map](/blog/agents-md-is-a-map-not-a-manual) and [a feature list agents cannot game](/blog/a-feature-list-agents-cannot-game). Later articles cover the definition of done, the rubric, the handoff, and the limits of all of this.

The thread through the series is simple. Cheap generation does not remove the need for judgement. It moves the judgement into the spec.
