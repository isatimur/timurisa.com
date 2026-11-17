title: When the spec is not enough
slug: when-the-spec-is-not-enough
excerpt: A green gate, a branch that passed 15 of 15 checks and would have rolled back live work, and an invented number that no check covers. The limits of spec-driven development in my own repos.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T19:00:00.000Z

A series about spec-driven development should say where it fails. Here is where it failed for me.

## A green gate that was not complete

On 10 October an agent produced a branch with lazy-loaded models and a lite scene. It passed all 15 of its verify checks. It was not safe to ship. The branch left out the camera clamp, the boat models, the finer terrain, the landing pads, and the first wave of commits. Deploying it would have rolled back live work.

The gate answered "does this branch work?" It had no way to answer "does this branch contain everything that is already live?" Nobody had written that requirement down, so nothing checked it.

## A spec that does not cover deploying

Two more traps lived outside the checks. One commit imported a file that only arrived in the next commit, so deploying the state between them would have broken the build. And the real build command edits one of the tracked data files before it builds. Both were in my handoff, in prose. Neither was a check.

A spec covers what you thought to specify. Deploying is a separate job, and my specs did not cover it.

## The main branch failing its own gate

The same handoff records that the main branch failed two verify checks at that point. One was a life-simulation smoke test, broken by a boat hull change. The other was the model check, because one of the 70 models fell outside the triangle range. The gate did its job. It caught regressions from a busy day. But it also shows that a gate can be red while work continues around it.

## An invented number no check covers

My notes record that the storey count for buildings without a tag is an invented heuristic. OpenStreetMap does not say how many storeys such buildings have, so the code guesses. I decided to ship it. No check can tell me whether the guess is right, because there is nothing to compare it against. The spec records the guess, and that is all a spec can do here.

## Small drifts

I described three drifts earlier in the series. The agent instructions file is longer than the limit it states. The feature list has seven features in progress, against its own one-at-a-time rule. A handoff and the list disagree on whether two features have started.

## The open questions

My research notes end with questions I cannot yet answer. What is the minimum viable spec for a small task, compared with a large refactor? How can a team keep specs current without creating process drag? Which parts of a spec should a model write, and which a human?

I have partial answers, and the next article gives one.

## What I take from it

A spec is a set of promises. Checks keep the promises you can measure. For the rest, such as completeness, deploy order, and judgement calls, you need a written warning and a person who reads it.

Next: [a minimum viable spec](/blog/a-minimum-viable-spec).
