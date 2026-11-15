title: Specs shrink the search space
slug: specs-shrink-the-search-space
excerpt: Why explicit boundaries help parallel agents, how I split work by file ownership, and what happened when two agents shared a file.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T16:00:00.000Z

The first pattern in my notes on spec-driven development reads: good specs shrink the search space. An agent that knows the goal, the boundary, and the check has fewer wrong moves to try.

## Boundaries as specs

On my city map projects, I split parallel agents by file ownership. One group owns the landmark models, the fit checks, and the landmark list. One owns the scene, the effects, and the interface. One owns the data folder. An agent edits only its own files.

That is a spec. It says what an agent may touch. It turns "build the sea shader" from an open problem into one with edges.

On 10 October I had five agents working in the same Porto working tree at once, each with a job and a port for its dev server. The handoff I wrote that day listed the rules for all of them: write to disjoint files, commit only your own files, do not push, do not deploy.

## Structure helps the agent read the code too

In [his Kiro talk](https://www.youtube.com/watch?v=HY_JyxAZsiE), Al Harris answers a question about large existing codebases. His answer is that it depends, but one factor stands out. If the system already separates concerns well, and its components are highly cohesive, the agent can say "this module does this thing" and need not hold 18 things in context. A codebase with a lot of tech debt makes it harder for the agent to find its way, as it does for a person. He adds that reliable tests and clear module separation both make the agent perform better.

He also describes how a task list runs. By default each task starts as a fresh session that shares no context with the earlier ones. The session is seeded with the specification, then told to do one task. The spec is the memory.

## Where the boundary leaked

A boundary only works if it holds. In my 10 October handoff, two files were shared. Two agents had both left unfinished edits in the scene file and in the landmarks file. The handoff warns that whoever commits those files includes both authors' changes, so they must be committed together, after the verify run.

Another leak was smaller. The terrain agent owned the fit file. The landmark agent found a dead fit rule for the Felgueiras landmark in it and restored the file byte for byte, since the file was not its own. Yet the terrain agent had edited a rule for the Palácio de Cristal in the same file, and that landmark was the landmark agent's area. The handoff records these as deviations to reconcile.

This shows that a file-ownership rule needs a way to handle changes that cross it. The rule said who owns a file. It did not say what to do when a change belongs to one agent and sits in another's file.

## A cheap test

For each parallel task, write one sentence about which files it may edit. If two sentences name the same file, decide who owns it before you start. The cost is a minute. A shared file costs an hour of untangling later.

Next: [quality means fewer defects](/blog/quality-means-fewer-defects).
