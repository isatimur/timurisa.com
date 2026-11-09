---
slug: when-code-gets-cheap-judgment-gets-expensive
title: When code gets cheap, judgment gets expensive
excerpt: Chapter 2 argues that cheap generation does not remove the human contribution. It makes taste, the ability to tell good from convincing, easier to see.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
A team can now generate ten versions of a feature instead of one. A founder can spin up a prototype in a weekend. A junior engineer can land patches that once took far longer. Routine output really has become cheaper.

Chapter 2 argues that cheap output does not mean cheap judgment. The bottleneck moves toward deciding what should exist, what quality looks like, which tradeoffs are acceptable, and what to reject. The human contribution does not disappear. It becomes easier to see.

## Fundamentals were never about syntax

Matt Pocock says "software fundamentals matter now more than they actually ever have." That sounds backward. A capable coding system can fill in the syntax, scaffold the endpoint, and draft the tests.

The chapter answers that fundamentals are how you tell good output from merely convincing output. Which abstraction belongs here? Which dependency will quietly punish the team six months from now? Which draft only looks polished because nobody asked whether the premise is right? A machine cannot settle these questions for you.

These decisions always mattered. Their visibility changed. In a slower, human-only workflow, all production was expensive. Teams moved slower, touched fewer surfaces, and got incidental review inside the cost of making anything. Cheap generation strips away that natural throttle. A team can now pile far more work on top of weak decisions.

## Taste is discrimination under abundance

The chapter defines taste as quality discrimination under abundance. It is the ability to notice the difference between output that merely works and output that fits. The tells are specific. A patch is technically correct but shaped wrong for the system around it. A component boundary is too clever. A naming choice will confuse the next person. A prototype convenience is about to become permanent structure. None of these trip a test.

Tuomas Artman, reflecting with Gergely Orosz on craft at Linear, asks: "What happens when agents are capable of doing everything immediately for you?" The obvious answer is speed. Artman's answer is sharper. When a small AI-equipped team can match your feature set, he sees tasteful, high-quality software as a way to keep some competitive advantage.

The chapter links this to architecture. The strongest engineers do more than clean up generated output. They shape the conditions under which good output is likely to appear in the first place.

## An amplifier before a replacement

The chapter describes AI as an amplifier before it is a replacement. Good operators get more leverage. Sloppy operators get more slop, faster. A team with strong standards, explicit constraints, and people who discriminate well gets extraordinary speed. A team without them can industrialize confusion.

Once a machine can produce more work than a human can carefully inspect by default, taste becomes part of the operating system. The scarce skill is less often the manual act of producing. It is more often selecting, directing, constraining, sequencing, and refusing.

The chapter closes with a change of question. Many people ask what happens to programmers when code gets cheaper. A better question is what happens to standards.

Try it on your own team. Find one place where it accepted generated work because the work looked finished. Name the standard that would have told you whether it fit. If you cannot state that standard in one sentence, you have found the gap. Write the sentence down where the next reviewer and the next model can both read it.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
