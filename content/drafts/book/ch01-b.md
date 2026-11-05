---
slug: five-checks-before-you-delegate-to-ai
title: Five checks to run before you delegate work to an AI
excerpt: Turn the Chapter 1 checklist into a week of small, concrete steps that show whether your AI system is ready to take on delegated work.
categories: [AI engineering, Delegation]
chapter: 1
---
Chapter 1 of my book ends with a practical checklist. It has five items. None needs new tooling. This post turns them into steps a team can take in one week.

## Monday: classify what you are building

Start with the 24-hour test. Ask what happens if no human reads the output for a day. If nothing changes in the world, you have an assistant. If a pull request opens, a record updates, or a clock starts running, you have a delegate.

Write the answer next to the feature name. The label matters because it sets the rigor. The book says to treat a delegate with delegate-grade rigor, whatever the product page calls it.

## Tuesday: test for dependability, not for a demo

Pick one task. Phrase the same request three different ways. Run all three with no one watching closely. Compare the results.

A demo only has to clear the bar once. A production system has to clear it every time, unobserved. If the behavior drifts across the three runs, the system is not ready to delegate to yet. I wrote that this holds no matter how good the single showcase run looked.

## Wednesday: verify from outside

Find every step where your only evidence is the agent saying it happened. Then replace that evidence with something else: a test result you run yourself, a link to the actual source, a record in the system of record.

Rafael Levi at Bright Data describes why. Web-browsing agents that hit a block do not say so: "There's no error, no warning, just the wrong answer." The checklist puts it in one line. If the only evidence a step happened is the agent saying so, you have no evidence.

## Thursday: write the standard down

Ask a senior engineer for three conventions that live only in their head. Local naming rules, dependency habits, and rollback instincts are common examples. Put them in a file the agent can read.

The chapter's rule is that a standard has to be made explicit before it can be delegated, or it will be violated silently. The system cannot inherit what the organization never wrote down.

## Friday: name the missing piece

Walk through the seven things a trustworthy delegate needs. They are the right context, usable tools, explicit constraints, evaluation loops, durable state, approval boundaries, and observability. For your system, mark each one as present, partial, or missing.

Then name the one that hurts most. I ask teams to do this before blaming the model for a failure. The book argues that a missing layer is usually where the workflow fails first. A serious agent product with no trace view or approval queue has a reliability gap, not a leaner design.

## What you have by Friday

After five short sessions you hold a classification, a drift test result, a list of unverified claims, a standards file, and a ranked gap. That is a small plan for making delegated work trustworthy, built from the evidence of your own system.

If you only have time for one step, pick Wednesday. Verification by something other than the system's own account is the habit that makes the other four useful.

This post draws on Chapter 1 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
