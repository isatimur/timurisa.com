---
slug: when-meridians-subagents-disagreed
title: When Meridian's subagents disagreed
excerpt: Meridian asked its agents to investigate, patch, and report, and parallel work turned into fragments. The scene shows why coordination is the missing piece.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
In my book, a team called Meridian runs what I call a Software Factory. That means a repo and a quality system prepared so that agents can do real engineering work. By Chapter 6, Meridian has rebuilt its repo and added eval slices that catch special-path mistakes. Small delegated work goes well.

Then the team raises its ambition. Instead of isolated patches, it asks the system to investigate a bug, spawn a few subagents, inspect a cluster of files, propose a fix, run checks, and prepare a reviewable summary for a human.

## What went wrong

A second class of problems appears. One subagent finds the relevant failure. Another, working off a slightly older branch of understanding, proposes a different patch. A retry of the validation step reruns something the first attempt had already completed. The human reviewer receives fragments of work, not a coherent roll-up.

I describe the result as a workshop full of talented workers without a foreman's board, without station history, and without a clean shift handoff. The system still has intelligence and context. It has no stable execution semantics.

Notice what did not fail. The model was fine. The workers were competent. The failure came from the space between them. More workers mean more intermediate artifacts, more duplicated effort, and more state to coordinate. In the chapter I say that parallelism without recomposition is just chaos at higher speed. The design challenge is not how to spawn more workers. It is how to merge, compare, inspect, and route their outputs so the human stays oriented.

## What the book offers

The book gives a few pieces of the answer. Independence must be enforced by the environment, not merely declared in the task split. Each worker needs its own isolated, ephemeral environment, or one agent's migration breaks the others mid-run.

Lou Bichard at Ona sharpens the diagnosis. He argues the runtime is solved, with "many options for this now, sandboxes and containers", and so are triggers and orchestration. "The thing that's missing," he says, "is coordination." He means an agent-native primitive that lets parallel workers pick up tasks, signal completion, and hand off without a human stitching them together. His candidate building blocks are "state machines, by building out workflows."

The chapter also notes that teams shipping production multi-agent systems have not agreed on an answer. Each substitutes a known mechanism for the missing one. Factory runs features serially with one active writer. Anthropic's long-running agents write a contract to files on disk before any code is produced. Others use state machines with durable execution. Three substitutes for one primitive that does not yet exist.

The lesson for a team like Meridian is concrete. Before you add a fourth subagent, decide how you will answer three questions. Which worker owns each task? Where is the shared record of what is done, so a retry does not repeat finished work? Where does the human see one roll-up instead of fragments? If you cannot answer, run work serially with one writer until you can. That is slower. It also removes the coordination problem by construction.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
