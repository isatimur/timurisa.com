---
slug: keep-taste-in-your-ai-workflow-this-week
title: A week-long plan to keep taste in your AI workflow
excerpt: Five habits from the Chapter 2 checklist, laid out as steps a team can start this week to protect quality as generation gets cheap.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
Chapter 2 ends with a checklist of five habits for anyone delegating work to a model. Each one fits into a single week. Here is how a team can start.

## Run the framing gate before you delegate

Sean Grove at OpenAI says the new scarce skill is "writing specifications that fully capture the intent." The chapter turns this into a gate. Before you hand anything to a model, answer five questions in writing. What is the actual task? What counts as success? Which constraints are real? What may stay rough? What would make the result unacceptable even if it looks finished?

Treat the last question as the test. If you cannot answer it, you are not ready to delegate. With these questions unanswered, the chapter says, you do not have a task. You have a prompt.

## Read every diff like its author

When you wrote every line, comprehension came free with authorship. A model breaks that bundle. It hands you working code you did not build, and you now pay for understanding separately.

So read the diff the way an author would. Reconstruct why each choice was made instead of confirming that the lines parse. Then trace one path the tests do not cover and ask whether the design survives it.

## Sort your friction before you cut it

Armin Ronacher and Cristina Poncela Cubeiro argue in *The Friction Is Your Judgment* that some friction is judgment in disguise. The chapter gives a simple test. Cut a pause if removing it only costs keystrokes, such as boilerplate, glue, or scaffolding the model can regenerate on demand. Keep a pause if removing it costs a decision, such as whether the architecture can carry this change or whether the draft is right or merely plausible.

List your team's pauses on one page. Mark each as keystrokes or decisions. Protect the second group.

## Know which mode you are in

Vibe coding is intuition-led building with low spec and high speed. The chapter calls it a mode, not a production philosophy. It suits discovery, where being wrong is cheap. Once someone who did not prompt an artifact into being has to maintain it, switch modes.

Add a line to your README or ticket template that names the mode. "Exploration" and "has to endure" are enough. The label turns the switch into a deliberate act.

## Write your constraints down

Taste kept only in a senior engineer's head is easy to lose in delegation. Taste written into a harness, a spec, or a repo rule is harder to lose. Here, a harness is the structure around a coding agent that tells it how to work.

Start with the five rules your reviewers repeat most often. Write each as a sentence an agent could follow. The chapter says a team that states its standards explicitly can delegate more safely than one that relies on vibe and shared memory.

## A check for Friday

The chapter offers one rule of thumb: when generation outruns review, the loop is not fast, it is unreviewed. Apply it at the end of the week. Compare what your team produced with what it read with care. If the first number is larger, give the habits above more room next week, and review before you generate more.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
