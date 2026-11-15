title: Quality means fewer defects
slug: quality-means-fewer-defects
excerpt: Josh Albrecht of Imbue defines code quality by defects and time to fix. His prevention and detection techniques, and where my own repos show the same drift he targets.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T17:00:00.000Z

"High quality code" is a phrase that means nothing until you define it. In [a talk on writing high-quality code with AI](https://www.youtube.com/watch?v=x_1EumTaXeE), Josh Albrecht, the CTO of Imbue, does define it. He borrows from software engineering research: quality is the absence of defects, measured by how many there are and how long they take to fix.

## Feedback before the pull request

Albrecht presents Sculptor, a research-preview environment for coding agents that Imbue built. A key choice is when feedback arrives. A pull request review is too late, he argues. Sculptor gives synchronous, immediate feedback while the agent works.

## Four ways to prevent defects

He describes four prevention strategies.

The agent researches prior art before it writes code. A plan-only step comes first, enforced through the system prompt, so no code appears before there is a plan. Specs and documents are first-class artifacts, and the tool detects drift between a document and the code. And a strict style guide applies, in a functional and immutable style, including one tailored to common mistakes of AI agents.

## Three ways to detect them

On the detection side he covers linters, tests, and review by a model.

For linters, the tool compares the issues that existed before with the issues the change introduced. The agent is not blamed for old lint debt.

For tests, he argues the old objections to writing them have faded. An agent can generate hundreds or thousands of synthetic inputs for the unhappy paths and flag outputs that look wrong. Generated unit tests that go stale are often worth throwing away and regenerating. And integration tests written from user-facing test plans are usually more valuable than unit tests.

For review, you can simply ask a model to check for style or spec violations, or for missing details, before the commit.

He closes with a tactic: run many sandboxed attempts at a fix in parallel and keep the one that succeeds. His logic is that a problem well stated is half solved.

## Where I recognise this

The idea of doc-code drift is one I have lived with. My `AGENTS.md` asks to stay under about 100 lines and has 137. My feature list says one feature is active at a time and marks seven in progress. My handoff from 5 October calls two features not started, while the list marks them in progress. Each is a spec and its subject drifting apart. A check that compares them would find all three in seconds.

The lint idea carries over to my gate. A check that fails on old problems teaches an agent to ignore failures. A check that reports only what the change introduced keeps the signal clean. My verify script reports PASS, FAIL, or SKIP for each check. It has no step that separates old failures from new ones. That is a gap.

## A practical start

Pick one drift your project already has. Write a ten-line script that detects it. Run the script in your verify step. Then the spec and the code have a referee.

Next: [mentoring the machine](/blog/mentoring-the-machine).
