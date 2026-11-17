title: Requirements a machine can check
slug: requirements-a-machine-can-check
excerpt: Structured requirements, EARS syntax, and property-based testing turn a sentence into an invariant. Notes from a Kiro talk, and one rule from my own map project.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T10:00:00.000Z

A requirement written as a paragraph can be read in three ways. A requirement written as a rule can be checked. This article is about moving from the first to the second.

## What the Kiro team does

In [his talk on spec-driven development](https://www.youtube.com/watch?v=HY_JyxAZsiE), Al Harris explains that the Kiro IDE turns a prompt into requirements with acceptance criteria. It writes those criteria in the EARS format. EARS stands for the Easy Approach to Requirements Syntax. It is a structured form of natural language, so each requirement has a clear trigger and a clear response.

He says this looked like an interesting but minor choice for the first months. Then the team started using it. The requirements translate into properties of the system. A property is an invariant, something that must always hold.

## Properties and property-based testing

Property-based testing checks an invariant by searching for a counterexample. The test generates many inputs and looks for one that breaks the rule. Libraries such as Hypothesis for Python and fast-check for Node do this. If the search finds nothing, you gain confidence that the rule holds.

Harris is careful about the word "confidence". It depends on how well the tests are written. A weak generator proves little. Still, the chain is useful: a requirement becomes a property, and the property becomes a test that runs on every change. The requirement stays connected to the code.

He also describes a step before testing: scanning the requirements themselves for ambiguity and for constraints that conflict, and helping the author resolve them.

## A rule from my own project

My city maps are built at real scale. One rule says a landmark model must never shrink below its real size. In prose, it reads as a wish. In the repository it is a check called `check:fit`, with two hard-fail rules. A model fails if it deviates from its OpenStreetMap footprint by more than 15 percent. It also fails if it covers less than 97 percent of the OSM extent, or of the real height recorded in `dimensions.json`.

Written in the EARS style, the second rule reads: while a landmark model is built, the system shall keep it at 97 percent or more of the OSM extent and of the recorded height. The EARS wording is mine, not a format my repository uses. But the shape fits. There is a state, a subject, and a response you can measure.

Because it is a check, the rule does not depend on anyone's memory. An agent that draws a landmark too small gets a failed build.

## Not every requirement checks this way

Many entries in my feature list still end in a manual step, such as "open the local server and confirm that the terrain renders". A person or a browser script has to look. Some qualities, such as whether a view feels right, resist a property.

Push each requirement as far toward a check as it will go. When it will not go further, write the manual step down plainly.

## A short method

Take one requirement from a current project. Rewrite it with a condition, a subject, and a measurable response. Ask what single counterexample would prove it false. If you can name one, you can write the check. If you cannot, the requirement is still ambiguous. Find that out before an agent builds on it.

The next article, [AGENTS.md as a map](/blog/agents-md-is-a-map-not-a-manual), covers the file that tells an agent where these checks live.
