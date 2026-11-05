---
slug: keep-taste-in-your-ai-workflow-this-week
title: A week-long plan to keep taste in your AI workflow
excerpt: Five habits from the Chapter 2 checklist, laid out as steps a team can start this week to protect quality as generation gets cheap.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
Chapter 2 of my book argues that cheap generation raises the value of judgment. The chapter ends with a practical checklist of five habits. Here is how a team can start each one this week.

## Run the framing gate before you delegate

Sean Grove at OpenAI says the new scarce skill is "writing specifications that fully capture the intent." I turn this into a gate. Before you hand anything to a model, answer five questions in writing. What is the actual task? What counts as success? Which constraints are real? What may stay rough? What would make the result unacceptable even if it looks finished?

Treat the last question as the test. If you cannot answer it, you are not ready to delegate. In the chapter's words, with these questions unanswered you do not have a task, you have a prompt.

## Read every diff like its author

When you wrote every line, comprehension came free with authorship. A model breaks that bundle. It hands you working code you did not build, and you now pay for understanding separately.

So read the diff the way an author would. Reconstruct why each choice was made, rather than confirming the lines parse. Then trace one path the tests do not cover and ask whether the design survives it. Make this a visible step in your review, with a named person responsible.

## Sort your friction before you cut it

Ronacher and Poncela Cubeiro argue in *The Friction Is Your Judgment* that some friction is judgment in disguise. I offer a simple sort. Cut a pause if removing it only costs keystrokes, such as boilerplate, glue, or scaffolding the model can regenerate on demand. Keep a pause if removing it costs a decision, such as whether the architecture can carry this change or whether the draft is right or merely plausible.

List your team's pauses on one page. Mark each as keystrokes or decisions. Protect the second group.

## Know which mode you are in

Vibe coding is intuition-led building with low spec and high speed. The chapter calls it a mode, not a production philosophy. It suits discovery, where being wrong is cheap. Once an artifact has to be maintained by someone who did not prompt it into being, switch modes.

Add a line to your project README or ticket template that names the mode. "Exploration" and "has to endure" are enough. The label makes the switch a deliberate act.

## Write your constraints down

Taste kept only in a senior engineer's head is easy to lose in delegation. Taste written into a harness, a spec, or a repo rule is harder to lose. A harness here means the structure around a coding agent that tells it how to work.

Start with five rules your reviewers repeat most often. Write each as a sentence an agent could follow. A team that states its standards explicitly can delegate more safely than one that relies on vibe and shared memory.

## A rule of thumb to keep

I included one line of my own in the chapter: when generation outruns review, the loop is not fast, it is unreviewed. Use that as your check at the end of the week. If your team produced more this week than it could carefully read, the habits above need more room, not less.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
