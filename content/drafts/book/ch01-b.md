---
slug: five-checks-before-you-delegate-to-ai
title: Five checks to run before you delegate work to an AI
excerpt: Turn the Chapter 1 checklist into a week of small, concrete steps that show whether your AI system is ready to take on delegated work.
categories: [AI engineering, Delegation]
chapter: 1
---
Chapter 1 ends with a checklist of five items. None needs new tooling. Here they become one task per weekday.

## Monday: classify what you are building

Run the 24-hour test. Ask what happens if no human reads the output for a day. If nothing changes in the world, you have an assistant. If a pull request opens, a record updates, or a clock starts running, you have a delegate.

Write the answer next to the feature name. The label sets the rigor. The chapter says to treat a delegate with delegate-grade rigor, whatever the product page calls it.

## Tuesday: test for dependability, not for a demo

Pick one task. Phrase the same request three different ways. Run all three with no one watching closely. Compare the results.

A demo has to clear the bar once. A production system has to clear it every time, unobserved. If the behavior drifts across the three runs, the system is not ready for delegation. The chapter says this holds no matter how good the single showcase run looked.

## Wednesday: verify from outside

List every step where your only evidence is the agent saying it happened. Replace that evidence with something else: a test result you run yourself, a link to the actual source, a record in the system of record.

Rafael Levi at Bright Data explains why. Web-browsing agents that hit a block do not say so: "There's no error, no warning, just the wrong answer." The checklist states the rule in one line. If the only evidence a step happened is the agent saying so, you have no evidence.

## Thursday: write the standard down

Ask a senior engineer for three conventions that live only in their head. Local naming rules, dependency habits, and rollback instincts are common examples. Put them in a file the agent can read.

The chapter's rule is that a standard must be made explicit before anyone delegates it, or the system will violate it silently. A model cannot inherit what the organization never wrote down.

## Friday: name the missing piece

Walk through the seven things a trustworthy delegate needs:

1. the right context
2. usable tools
3. explicit constraints
4. evaluation loops
5. durable state
6. approval boundaries
7. observability

Mark each one present, partial, or missing for your system. Then name the one that is missing. The chapter asks you to do this before you blame the model for a failure. It says a missing layer is usually where the workflow fails first. A serious agent product with no trace view or approval queue has a reliability gap, not a leaner design.

## What you hold by Friday

You hold a classification, a drift test result, a list of unverified claims, a standards file, and a named gap. That is a small plan, built from the evidence of your own system.

Short on time? Do Wednesday. Verification by something other than the system's own account is the habit that makes the other four useful. Open your agent's last report today and mark every claim you cannot check without asking the agent.

This post draws on Chapter 1 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
