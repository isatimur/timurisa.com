title: AGENTS.md is a map, not a manual
slug: agents-md-is-a-map-not-a-manual
excerpt: The one file every agent reads first. What mine contains, why it points elsewhere instead of explaining everything, and where it broke its own rule.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T11:00:00.000Z

Every one of my city map repositories has an `AGENTS.md` file at its root. In the Porto repository, `CLAUDE.md` is a three-line stub that says `AGENTS.md` is the single source of agent instructions. One file, so the tools cannot disagree.

## The first line is a promise

The file states its own purpose: it is a map, not a manual. Read the pointer, then follow it. It asks to stay under about 100 lines, with detail kept in `README.md`, `PLAN.md`, or `docs/`.

The reason is attention. An agent reads this file at the start of every session. If it is long, the important rules compete with trivia. A short file with pointers gives the agent the shape of the project and tells it where each kind of detail lives.

## What it contains

**A startup workflow.** Six steps before any code is written: confirm the directory, read the progress file, read the feature list and pick the highest-priority unfinished feature, look at the last five commits, run the init script, and fix the baseline first if verification fails.

**Working rules.** Work on one feature at a time. Do not mark a feature passing because code was added. Stay inside the feature's scope. Never hand-edit generated geodata, regenerate it through the pipeline. Do not silently weaken a check to make a feature pass. Prefer durable repository artifacts over chat summaries.

**A definition of done.** A command, `npm run verify`, is the gate. The file lists the checks behind it and says what each one guards.

**Hard constraints.** Node 22, plain ES modules, models authored in metres on real OSM footprints, free-licensed photos only.

**An end-of-session routine.** Update the progress file and the feature list, record blockers, commit only in a safe state, and leave the repo ready to restart.

## What is deliberately not in it

The file does not explain how the sea shader works, or why the terrain data looks the way it does. Those facts live in `perf/ARCHITECTURE.md` and in other documents. The map says where to look.

This matches advice I found in the research for my book. In [a talk on making codebases agent-ready](https://www.youtube.com/watch?v=ShuJ_CN6zr4), Eno Reyes of Factory AI lists `AGENTS.md` files among the pillars of an agent-ready codebase, next to linters, tests, and reliable CI. The file matters, but it is one pillar of several.

## Where it broke its own rule

I counted the lines. The Porto `AGENTS.md` has 137, and it asks to stay under about 100. The performance table and the command list grew it.

The content may earn its place. But the rule exists, and the file breaks it. This is a small example of spec drift: a spec that stops matching the thing it describes. The fix is either to move the table into `perf/` and link to it, or to change the rule. I have not done either yet.

## A test for your own file

Give your `AGENTS.md` to someone who has never seen the project. Ask them to find three things in under a minute: how to run the checks, what counts as done, and what they must never edit by hand. If they cannot, the map has a hole.

Next: [a feature list agents cannot game](/blog/a-feature-list-agents-cannot-game).
