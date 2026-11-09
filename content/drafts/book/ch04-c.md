---
slug: the-patch-that-looked-fine
title: The patch that looked fine and stalled the backfills
excerpt: A rate-limiting patch compiles, passes tests, and still drifts production. A scene from Chapter 4 shows what a regression case is for.
categories: [AI engineering, Evals]
chapter: 4
---
The patch compiled. The tests passed. The pull request description was tidy. Two days after it merged, admin backfills began to stall. Chapter 4 of the book uses this scene to show what evals are for.

The scene follows Meridian, the fictional payments team from the previous chapter. The team has moved from small safe edits to multi-file implementation tasks.

## A tidy pull request

The agent gets a task. Add rate limiting to an internal API endpoint, thread the new behavior through a background job, and preserve an existing admin override.

On first inspection the run looks good. A reviewer glances at the diff and says what the chapter calls the most expensive sentence in modern engineering: looks fine.

Two days later support reports something odd. A class of admin-triggered backfills is stalling in production. Nothing is fully broken. Jobs queue longer than usual. Customers are not yet furious and engineers are not yet panicking. The system is drifting into a worse state.

## What the postmortem found

The agent did implement rate limiting. It even mirrored the main service pattern correctly. But it also applied the same throttle to the backfill path, where the intended rule was different.

That exception lived in two places: an old review comment and the head of Meridian's most senior payments engineer. The code still type-checked. The unit tests still passed, because none covered the override path under production-like volume. The patch was locally plausible and globally wrong.

The chapter says this is the shape of many AI failures in production. They are not spectacular hallucinations. They are near-misses that survive ordinary review because each move looks reasonable. The model did not go insane. The system had no reliable way to notice that an important slice of behavior had regressed.

The scene also answers a common hope. Colvin says a coding agent can use type checking “to basically mark its own homework.” Static checks, tests, and schemas catch the errors a machine can already define. This patch cleared every one of those gates. Self-verification cannot certify that the whole change was correct. Production reliability needs several layers of evidence.

## From lesson to instrument

Once Meridian sees the pattern, the eval work almost writes itself.

- The team adds a regression case for the admin override path. They later call it the admin-override regression.
- They mine earlier incidents for similar special-path behavior.
- They create a task slice for patches that touch both product logic and operations logic.
- They stop asking only whether a patch passes. They ask which real failure families it still protects against.

The chapter calls this a control system in practice. It converts an expensive lesson into a reusable instrument. Notice what moved. The knowledge lived in an old comment and in one senior engineer's memory. Now it lives in a test that runs every time, whoever is on call and whichever model wrote the patch.

After your next incident, do not stop at the fix. Ask who held the knowledge that would have prevented it. Write that knowledge as a case that fails when the behavior regresses. If the answer is one person's memory, you have found your next eval.

This post draws on Chapter 4 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
