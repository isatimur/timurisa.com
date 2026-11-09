---
slug: the-deduction-that-cited-the-wrong-source
title: The deduction that cited the wrong source
excerpt: A tax assistant at Hargrove ranked a public explainer above a senior attorney's matter note. The fix taught the team what context topology means.
categories: [AI engineering, Context engineering]
chapter: 5
---
A tax associate at Hargrove asks the firm's assistant to trace the support for a deduction a client has claimed for years. The assistant answers fluently. It cites a clean-looking authority, and the answer reads as decisive. It is also wrong for this client.

The chapter follows this scene from Hargrove's early build-out. The firm's tax practice runs an assistant that began as a helpful chat surface. It summarizes documents, answers questions, and cites plausible authorities. Users like it. Then they ask for more. They want the assistant to do the work, not only to help them think.

## What went wrong

The cited authority was a public explainer whose wording matched the query almost perfectly. The governing position lived elsewhere. A senior attorney had written it earlier in a matter note, in a different file, under a jurisdiction the explainer never mentioned.

The system ranked the explainer first because nothing told it that a public article and a matter-specific note are different kinds of evidence. The model did not invent a source. The explainer was real. The system treated all text as interchangeable.

The chapter says simplistic retrieval systems flatten everything into one big searchable pile. They act as if the only problem were semantic similarity.

## The remedy

The chapter states it plainly: the remedy is not a smarter model. The team types its knowledge topology into the system. That means three changes.

- Source typing ranks internal precedent above public background.
- Access boundaries apply per matter.
- The retrieval surface carries provenance, so the associate can see which layer an answer came from.

The chapter calls this idea context topology. Different kinds of information are not interchangeable text. A draft contract is not signed language. An old Slack discussion is not a policy. A matter note from a senior attorney is not a general explainer from a public source. Usefulness depends on what kind of thing a document is, how it relates to other documents, how trustworthy it is, and how recent it is.

The chapter then draws the stakes. In high-stakes work, a system that is 90 percent right for unclear reasons can still be professionally unusable. The associate needs to see why an answer is right. Provenance shows it.

The chapter closes the scene with a line worth keeping: the misranked matter note becomes the scar the rest of the build-out is designed around.

## Do this today

List the kinds of documents your assistant can retrieve. Take each pair and ask whether one kind should outrank the other. Where the answer is yes, write the rule into the system. Then show the source type next to every citation your assistant gives.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
