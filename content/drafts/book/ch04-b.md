---
slug: build-an-eval-habit-from-real-failures
title: Build an eval habit from your own failures
excerpt: Five steps from Chapter 4 that a team can take this week to turn real failures into evals, traces, and a habit that keeps improving the system.
categories: [AI engineering, Evals]
chapter: 4
---
Chapter 4 of my book argues that evals are a control system for delegated work. A control system sounds heavy. It does not have to start that way. Here are five steps from the chapter's checklist that a team can take this week.

## Start from real work

First, mine your evals from real failures. Naman Jain gives the rule: "Your task should be natural and sourced from the real world and then you should be able to reliably grade them." His team crawls the commit history of real repositories and finds commits related to performance optimization. You can copy the recipe. Pick a fix that mattered in your own history. Revert it. Hand the agent the broken state. Score whether it gets back to the known-good commit. I find this beats a benchmark built in a conference room, because the task is real and the grade is stable.

Early on, seed the set by hand. Samuel Colvin describes the common practice: people have "some subset of data that's been like human annotated." Humans know which failures are expensive. If a class of mistake bit your team three times last month, it belongs in the test set from now on.

Second, grade how the system got there, not only where it landed. Two runs can end on the same diff. One took a safe route. The other deleted a failing test to turn red into green. A check on the final files alone passes both. Score whether the agent reached the known-good end state, and inspect the path.

## Weight and trace

Third, weight your slices by consequence, not frequency. Application evals mix objective checks with human review and carry slice-level metrics instead of one score. The slices are not equally important. A single averaged score hides the failures that cost the most. Let a rare but expensive failure outweigh a common trivial one. Ask whether the output was correct, and also whether it was usable, safe, timely, and cheap enough for this workflow.

Fourth, instrument every production run as a trace before you think you need it. A trace you never captured is a regression case you can never recover. Dat Ngo of Arize says, "code doesn't audit agents or harnesses — it's actually the telemetry that does that." Phil Hetzel says observability and evals are "actually the same problem from a systems perspective." Production traces feed the next offline eval set. A failed coding task can become a benchmark slice. A costly retrieval miss can become a dataset item.

## Ask the habit question

Fifth, replace the inventory question with the habit question. "Do we have evals?" is too small. Ask whether you have a habit that turns this month's real failure into next month's regression test. Someone has to own the datasets. Someone has to decide how failures are labeled. Someone has to adjudicate when an automatic judge disagrees with expert review. In immature teams, one careful engineer and one spreadsheet carry all of this. That is a fair beginning but not a durable end state.

A short plan for the week might look like this. On Monday, pick one painful failure from your history and write it as a case. On Tuesday, decide how you will grade the path as well as the result. Midweek, name the one slice that costs you most when it fails. On Thursday, confirm that production runs leave traces you can replay. On Friday, name an owner for the dataset.

You will not finish a mature eval program in a week. You will have a seed, an owner, and a loop. The chapter's point is that the loop matters more than the size of the first set.

This post draws on Chapter 4 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
