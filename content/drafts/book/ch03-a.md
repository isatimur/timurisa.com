---
slug: blame-the-workplace-before-the-model
title: Blame the workplace before you blame the model
excerpt: When coding agents disappoint, the cause is often a repository nobody made legible. Chapter 3 argues the harness matters before the model does.
categories: [AI engineering, Harness engineering]
chapter: 3
---
After a bad agent patch, the postmortem names a suspect: intelligence. The model missed a dependency. The model misread the architecture. The model broke a convention no outsider could have guessed.

Chapter 3 calls that diagnosis too flattering to the humans involved. Sometimes the model is not capable enough. But in production codebases, many failures point somewhere else. Nobody made the environment legible enough for delegated work.

## The harness is the interface

Ryan Lopopolo puts the inversion bluntly: "The important thing is not the code but the prompt and the guardrails that got you there." Once a machine does implementation work, its surroundings become part of the product. The book calls those surroundings the harness. The harness is the repository, the specs, the validations, and the workflow. Together they decide what kind of work an agent can do.

Chat tools hide this. You type a request and wait for a patch, so the prompt looks like the whole interface. It is only the visible tip. The real interface is the codebase plus the setup instructions, naming conventions, tests, lint rules, examples of good patches, ADRs, and the performance or security rules that no single file states. A human engineer absorbs these slowly by asking teammates. An agent gets no apprenticeship unless the team builds one.

## Slop is a missing standard

Good code carries many unstated decisions: tone, proportion, dependency choices, rollback safety, test shape. Lopopolo says one patch can require "500 little decisions" around underspecified non-functional requirements. The chapter says the exact number is not the point. The density is. A human fills those gaps with craft and context. An agent fills them by inference.

Lopopolo explains the mechanism. Models have seen "trillions of lines of code that make every possible choice of those non-functional requirements that you could ever imagine." Leave a requirement unspecified and the agent samples one of those choices. Nothing makes the sample yours.

So slop often does not mean a weak model. It means a task whose success criteria nobody wrote down. The rule underneath is hard: a standard that lives only in scattered memory is one the agent cannot inherit, and will therefore break.

That changes the prescription. Better prompting helps a little. Cutting the silent guesswork the environment demands helps more. Externalize architecture choices. Store examples of accepted patterns. Make non-functional constraints explicit. The chapter calls this harness engineering: the systematic conversion of tacit engineering judgment into durable, machine-usable constraints.

## Who else benefits

A capable model in a murky repository resembles a strong engineer who joins a company with no onboarding and no record of past decisions. You may get lucky. You cannot count on it.

The benefit reaches past agents. New hires and future maintainers gain from the same legibility. The chapter says the agent only exposes the gap between the standards a team possesses and the standards it can operationalize.

Pick one standard your senior engineers enforce in review but have never written down. Put it where an agent can read it: a lint rule, a checked-in example, or a line in a spec. Then watch whether the next patch respects it. If it does, you have moved one piece of judgment out of a person's head and into the codebase.

This post draws on Chapter 3 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
