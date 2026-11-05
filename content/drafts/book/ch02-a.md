---
slug: when-code-gets-cheap-judgment-gets-expensive
title: When code gets cheap, judgment gets expensive
excerpt: Chapter 2 argues that cheap generation does not remove the human contribution. It makes taste, the ability to tell good from convincing, easier to see.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
A team can now generate ten versions of a feature instead of one. A founder can build a prototype in a weekend. A junior engineer can land patches that once took far longer. Some of this is real. Routine output has become cheaper.

In Chapter 2 I make the case that cheap output does not mean cheap judgment. The bottleneck shifts toward deciding what should exist, what quality looks like, which tradeoffs are acceptable, and what to reject. The human contribution does not disappear. It becomes easier to see.

## Why fundamentals matter more

Matt Pocock says "software fundamentals matter now more than they actually ever have." That can sound backward. If a model fills in the syntax, scaffolds the endpoint, and drafts the tests, surely fundamentals matter less.

The chapter's answer is that fundamentals were never about syntax. They are how you tell good output from merely convincing output. Which abstraction belongs here? Which dependency will quietly punish us six months from now? Which draft only looks polished because nobody asked whether the premise is right? A machine cannot resolve these for you.

These decisions always mattered. What changes is their visibility. In a slower workflow, production was expensive, so teams moved slower, touched fewer surfaces, and got incidental review for free. Cheap generation strips away that natural throttle. You can now build a much larger amount of work on top of weak decisions.

## Taste as a working definition

I define taste as quality discrimination under abundance. It is the ability to notice the difference between output that merely works and output that fits. The tells are specific. A patch is technically correct but shaped wrong for the system around it. A component boundary is too clever. A prototype convenience is about to become permanent structure. None of these trip a test.

Tuomas Artman, speaking with Gergely Orosz about craft at Linear, asks: "What happens when agents are capable of doing everything immediately for you?" The obvious answer is speed. Artman's answer, as I summarize it in the book, is sharper. When a small AI-equipped team can match your feature set, tasteful, high-quality software is a way to keep some competitive advantage.

## An amplifier, not a replacement

This is why I describe AI as an amplifier before it is a replacement. Good operators get more leverage. Sloppy operators get more slop, faster. If a team has strong standards, explicit constraints, and people who discriminate well, the new speed is extraordinary. If it lacks them, the same speed means it can industrialize confusion.

The scarce skill is therefore less often the manual act of producing. It is more often selecting, directing, constraining, sequencing, and refusing. The chapter's closing move says the question to ask is not what happens to programmers but what happens to standards.

The takeaway is a small one. This week, pick one place where your team accepted generated work because it looked finished. Ask what standard would have told you whether it fit. If you cannot state that standard in a sentence, you have found the real gap. Write the sentence down, and put it where the next reviewer and the next model can both read it.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
