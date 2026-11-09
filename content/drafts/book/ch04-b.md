---
slug: build-an-eval-habit-from-real-failures
title: Build an eval habit from your own failures
excerpt: Five steps from Chapter 4 that a team can take this week to turn real failures into evals, traces, and a habit that keeps improving the system.
categories: [AI engineering, Evals]
chapter: 4
---
Revert a fix from your own commit history, hand an agent the broken code, and see if it finds its way back. Chapter 4 of the book offers this recipe as the first of five steps. A control system sounds heavy, but each step fits in a week.

## Start from real work

Step one: mine your evals from real failures. Naman Jain gives the rule: “Your task should be natural and sourced from the real world and then you should be able to reliably grade them.” His team crawls the commit history of real repositories and finds commits related to performance optimization.

Copy the recipe. Pick a fix that mattered in your history. Revert it. Give the agent the broken state. Score whether it returns to the known-good commit. The chapter says this beats a benchmark built in a conference room.

Seed the early set by hand. Samuel Colvin describes the common practice: people have “some subset of data that’s been like human annotated.” Humans know which failures are expensive. If a class of mistake bit the team three times last month, it belongs in the test set.

Step two: grade the path, not only the destination. Two runs can land on the same diff. One took a safe route. The other deleted a failing test to turn red into green. A check on the final files passes both. Score whether the agent reached the known-good end state, and inspect how it got there.

## Weight and trace

Step three: weight slices by consequence, not frequency. Application evals mix objective checks with human review and carry slice-level metrics. The slices are not equally important, so one averaged score hides the failures that cost the most. Let a rare, expensive failure outweigh a common, trivial one. Ask whether the output was correct, usable, safe, timely, and cheap enough for this workflow.

Step four: instrument every production run as a trace before you think you need it. A trace you never captured is a regression case you can never recover. Arize’s Dat Ngo puts it this way: “code doesn’t audit agents or harnesses — it’s actually the telemetry that does that.” Phil Hetzel says observability and evals are the same problem from a systems perspective. Production traces feed the next offline eval set. A failed coding task becomes a benchmark slice. A costly retrieval miss becomes a dataset item.

## Ask the habit question

Step five: swap the inventory question for the habit question. "Do we have evals?" is too small. Ask whether your team has a habit that turns this month's failure into next month's regression test.

That habit needs owners. Someone owns the datasets. Someone decides how failures are labeled. Someone adjudicates when an automatic judge disagrees with expert review. In immature teams, one careful engineer and one spreadsheet carry all of this. The chapter calls that a reasonable beginning and not a durable end state.

Here is a plan for the week.

- **Monday:** pick one painful failure from your history and write it as a case.
- **Tuesday:** decide how you will grade the path as well as the result.
- **Wednesday:** name the one slice that costs you most when it fails.
- **Thursday:** confirm that production runs leave traces you can replay.
- **Friday:** name an owner for the dataset.

You will not finish a mature eval program in five days. You will have a seed, an owner, and a loop. Start with Monday's case today.

This post draws on Chapter 4 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
