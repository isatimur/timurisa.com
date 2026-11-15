title: The definition of done is a command
slug: the-definition-of-done-is-a-command
excerpt: One command gates every change in my map projects. What it runs, why it skips missing inputs instead of faking them, and why Eno Reyes calls coverage a hard limit for agents.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T13:00:00.000Z

In my Porto repository, a feature is done when `npm run verify` passes. Not when the code looks right, not when an agent says so. The command builds the app and runs every check whose input data exists.

## What the gate runs

The gate runs 11 checks. They cover the build and the content contract for landmarks, routes, licences, and photos. They check the geometry: footprints, buildings, terrain. They check real-world dimensions and their sources. They check the 1:1 fit against OpenStreetMap. They check the street network and traffic. They check the triangle budget for every model, from 4,000 to 40,000 triangles each and 900,000 in total. Then a smoke test loads the built site in a headless browser and fails on console errors, graphics errors, or bad geometry buffers. Smaller smoke tests cover the trams and the rail.

A feature counts as done under four conditions, all written in `AGENTS.md`. The user-visible behaviour is implemented. The verify command was actually run and passed. Evidence is recorded in the feature list and the progress file. And the repository restarts cleanly from the init script.

## Skipped, not faked

One line in the file stands out: missing inputs are skipped, not faked.

If the data a check needs does not exist, the check skips. It does not invent a pass. The smoke test shows the cost of this honesty. It needs a browser engine installed, and without one it reports SKIP. My evaluator rubric then refuses to count a SKIP as a pass. The rubric asks whether the smoke test passed and was not skipped.

A gate that quietly passes when it cannot run is worse than no gate. It gives a false green, and agents learn to trust it.

## The temptation to weaken the check

There is a second rule beside it: do not silently weaken the verification script, or a single check, to make a feature pass. The easy path for an agent that fails a check is to adjust the check. The rule makes that a visible act, not a quiet one.

## Why this gets harder for teams

In [a talk on making codebases agent-ready](https://www.youtube.com/watch?v=ShuJ_CN6zr4), Eno Reyes argues that agents fail in many real projects not because the models are weak, but because the codebase lacks the automatic validation agents need. His starting point is that software has an unusually good signal for correctness: tests, linters, and continuous integration.

His sharpest observation concerns tolerance. Many organisations function with 50 to 60 percent test coverage, because people compensate by hand. A flaky build that fails every third run is a nuisance a human works around. For an agent, it is a hard block. The agent cannot tell a real failure from noise.

He proposes eight areas to audit: linter quality, `AGENTS.md` files, test coverage, flaky-test rate, API and doc completeness, reliability of the CI signal, automated code review, and dependency hygiene. He also argues that an imperfect AI-written test is better than none, because it records a specification that later agents can follow and improve. And he claims that organisations that invest in this validation see gains of five to seven times, not one and a half or two. That figure is his claim. I report it, I do not endorse it.

## My own gaps

Reading his list against my repository, I can confirm two items: there is an `AGENTS.md`, and there is a gate with 11 checks. I cannot confirm the others from the files I have in front of me. For example, I do not have a measured flaky-test rate. That is a fair place to begin an audit.

## Takeaway

Write down the command that proves a change works. Make sure it fails loudly. Make sure a skipped check is never read as a passing one.

Next: [an evaluator rubric for AI changes](/blog/an-evaluator-rubric-for-ai-changes).
