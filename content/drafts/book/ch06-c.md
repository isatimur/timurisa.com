---
slug: when-meridians-subagents-disagreed
title: When Meridian's subagents disagreed
excerpt: In Chapter 6, Meridian asks its agents to investigate, patch, and report. Parallel work turns into fragments, and coordination is the missing piece.
categories: [AI engineering, Agent runtimes]
chapter: 6
---
One subagent finds the failing code. Another, working from a slightly older view of the branch, proposes a different patch. That is the scene Chapter 6 of From Copilot to Colleague uses to show what parallel agents break.

The chapter's case study is Meridian, a team running what the book calls a Software Factory: a repo and a quality system prepared so that agents can do real engineering work. By this chapter, Meridian has rebuilt its repo. It has added eval slices that catch special-path mistakes. Small delegated work goes well.

Then the team raises its ambition. Instead of isolated patches, it asks the system to investigate a bug, spawn a few subagents, inspect a cluster of files, propose a fix, run checks, and prepare a reviewable summary for a human.

## What went wrong

The two patches collide. A retry of the validation step reruns something the first attempt had already completed. The human reviewer receives fragments of work, not a coherent roll-up.

The chapter compares the result to a workshop full of talented workers without a foreman's board, without station history, and without a clean shift handoff. The system still has intelligence and context. It has no stable execution semantics.

Look at what did not fail. The model was fine. The workers were competent. The failure sat in the space between them. More workers mean more intermediate artifacts, more duplicated effort, and more state to coordinate. The chapter puts it bluntly: parallelism without recomposition is just chaos at higher speed. The design challenge is not how to spawn more workers. It is how to merge, compare, inspect, and route their outputs so the human stays oriented.

## What the chapter offers

Independence must come from the environment, not from the task split alone. Each worker needs its own isolated, ephemeral environment. Without one, a single agent's migration breaks the others mid-run.

Lou Bichard at Ona names the missing piece. He argues the runtime is solved, with "many options for this now, sandboxes and containers", and so are triggers and orchestration. "The thing that's missing," he says, "is coordination." He means an agent-native primitive that lets parallel workers pick up tasks, signal completion, and hand off without a human stitching them together. His candidate building blocks are "state machines, by building out workflows."

The chapter adds that teams shipping production multi-agent systems have not agreed on an answer. Each substitutes a known mechanism for the missing one. Factory runs features serially with one active writer. Anthropic's long-running agents write a contract to files on disk before any code is produced. Others use state machines with durable execution. That makes three substitutes for one primitive that does not yet exist.

## The lesson

Before a team adds its fourth subagent, it should answer three questions.

- Which worker owns each task?
- Where is the shared record of what is done, so a retry does not repeat finished work?
- Where does the human see one roll-up instead of fragments?

If any answer is missing, run the work serially with one writer until it exists. That is slower. It also removes the coordination problem by construction.

This post draws on Chapter 6 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
