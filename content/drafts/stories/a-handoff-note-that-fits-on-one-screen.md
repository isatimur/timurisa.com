title: A handoff note that fits on one screen
slug: a-handoff-note-that-fits-on-one-screen
excerpt: The template I use to end every agent session, the checklist behind it, and the day my handoff grew to 2,681 words.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T15:00:00.000Z

Agent sessions end. A usage limit hits, a context window fills, or I close the laptop. The next session starts with no memory of the last one. The handoff note is the only thing that crosses the gap.

## The template

My Porto repository has a file called `session-handoff.md`. It says: compact note for the next session, keep it to one screen. It has eight fields.

The date. The session goal. The verified state, meaning the result of the last verify run. The active feature, by id. What changed. What is half-done or risky. The exact next step. And the files to look at first.

## An example, from 5 October

On 5 October the note recorded that all 11 checks were green, with one transient smoke-test failure that passed on a rerun. The active feature was the deploy. The site was live at a temporary address, and the real domain did not answer yet.

Under "half-done or risky" it listed four things. Ten landmarks had no share image, though their pages referenced one. The engine sync script had never run. Two features had not started. And the smoke test needs a browser engine, or it skips.

Then the exact next step: run the share-image script, check that the folder holds 71 images, and add the domain in the hosting dashboard.

The last field is the sharpest. "Continue the work" tells the next session nothing. A command and a count tell it exactly what to do.

## The checklist behind it

A second file, the clean-state checklist, lists eight things to do before ending a session. Verify passed, or the failure is recorded as the next task. The progress file is updated. The feature list is updated. No half-finished feature is loose, and work in progress is committed or stashed. Only intentional changes show in git status. Nothing ignored is staged. Exactly one feature is in progress. And the repository restarts from the init script.

The checklist exists so the handoff can be short. If the repository is in a clean state, the note does not need to explain a mess.

## The day it did not fit

On 10 October I ran several agents in parallel on the same repository. When I stopped, I wrote a handoff for the day I would resume. It ran to 2,681 words.

It had to. It listed each agent, its port, its job, what it finished, and what it left half done. It named two deploy traps. It warned against shipping one branch. It recorded which verify checks failed. A one-screen note could not carry that.

I take two lessons from it. First, the one-screen rule works for one agent working on one feature. Parallel work breaks it, because the note must now describe several threads. Second, a long handoff is still better than none. But the length is a signal. It told me I had too much in flight.

## A test

Open a fresh session with only your handoff note and the repository. Can the new session name the next step without asking you anything? If not, a field is missing.

Next: [specs shrink the search space](/blog/specs-shrink-the-search-space).
