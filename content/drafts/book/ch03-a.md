---
slug: blame-the-workplace-before-the-model
title: Blame the workplace before you blame the model
excerpt: When coding agents disappoint, the cause is often a repository nobody made legible. Chapter 3 argues the harness matters before the model does.
categories: [AI engineering, Harness engineering]
chapter: 3
---
When a coding agent disappoints, teams reach for the same explanation. The model missed a dependency. The model misread the architecture. The model broke a convention nobody told it about. In the postmortem, intelligence becomes the default suspect.

In Chapter 3 I argue that this diagnosis is often too flattering to the humans involved. Sometimes the model really is not capable enough. But in production codebases, many failures point somewhere else. The environment was never made legible enough for delegated work.

## The harness is the interface

Ryan Lopopolo puts it bluntly: "The important thing is not the code but the prompt and the guardrails that got you there." Once a machine does implementation work, its surroundings become part of the product. The book calls those surroundings the harness. The harness is the repository, the specs, the validations, and the workflow that decide what kind of work an agent can do.

Chat tools hide this. You type a request and wait for a patch, so the prompt looks like the whole interface. It is only the visible tip. The real interface is the codebase plus the setup instructions, naming conventions, tests, lint rules, examples of good patches, ADRs, and the performance or security rules that no single file states. A human engineer absorbs these slowly by asking teammates. An agent gets no apprenticeship unless the team builds one.

## Slop is a missing standard

Good code carries many unstated decisions: tone, proportion, dependency choices, rollback safety, test shape. Lopopolo says one patch can require "500 little decisions" around underspecified non-functional requirements. I do not treat the number as exact. The point is density. A human fills those gaps with craft and context. An agent fills them by inference. Lopopolo notes that models have seen "trillions of lines of code that make every possible choice of those non-functional requirements that you could ever imagine." Leave a requirement unspecified and the agent samples one of those choices. Nothing makes the sample yours.

So slop is often not the sign of a weak model. It is the sign of a task whose success criteria were never written down. The rule underneath is hard: a standard that lives only in scattered memory is one the agent cannot inherit, and will therefore break.

That changes the prescription. Prompting better helps a little. Reducing the silent guesswork the environment demands helps more. Externalize architecture choices. Store examples of accepted patterns. Make non-functional constraints explicit. The book calls this harness engineering: the systematic conversion of tacit engineering judgment into durable, machine-usable constraints.

## What to take from it

A capable model in a murky repository resembles a strong engineer who joins a company with no onboarding and no record of past decisions. You may get lucky. You cannot count on it. The benefit also reaches past agents. New hires and future maintainers gain from the same legibility, because the agent only exposes the difference between standards a team possesses and standards it can operationalize.

My takeaway is small and concrete. Pick one standard your senior engineers enforce in review but have never written down. Put it where an agent can read it: a lint rule, a checked-in example, or a line in a spec. Then watch whether the next patch respects it. If it does, you have moved one piece of judgment out of a person's head and into the codebase.

This post draws on Chapter 3 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
