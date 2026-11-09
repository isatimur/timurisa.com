---
slug: the-friday-app-and-the-monday-rewrite
title: The Friday app and the Monday rewrite
excerpt: Corey Gallon's vibe-coding hangover, quoted in Chapter 2, shows when a fast exploratory build has outlived its usefulness.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
The app works on Friday. Corey Gallon at Rexmore calls what comes next the vibe-coding hangover. In his words, "then Monday rolls around, you want to add a feature… and you realize that you don't understand it, you can't maintain it, and you have to throw most or all of it away."

Chapter 2 quotes this scene because it holds a precise lesson about when speed stops paying.

## The mode is fine

Vibe coding is low-spec, high-speed, intuition-led building steered by momentum rather than explicit structure. The chapter does not call it worthless. It says the mode can be brilliant. For exploration, interface sketching, rough prototypes, internal tooling, and one-off automation, it can be the correct move. It makes experimentation cheap enough that more people discover what is worth building.

The chapter's line is short. Vibe coding is not the enemy. Unexamined vibe coding is. A mode that works for discovery becomes a problem when it quietly hardens into a default production philosophy.

## What Monday reveals

Look at what changes between Friday and Monday in Gallon's account. The app has not broken. It still works. What changed is the demand on it. It now has to change, and nobody understands it well enough to change it safely.

Nothing stood in the way of the build, and no test failed. The cost waited until someone needed the code to be maintainable. Chris Kelly at Augment Code makes the same point from the other side. AI code is still code, and vibes do not cut it in production. Production here means four-nines uptime, thousands of users, and gigabytes of data, where people who never saw the prompt pay for a mistake. The code still has to live somewhere. It still meets systems, constraints, users, security boundaries, and future maintainers. The machine does not repeal software reality.

## One switch

The chapter reduces mode awareness to a single switch. Use vibe coding where the cost of being wrong is low and the goal is discovery. Leave it behind the moment the output has to endure. If Gallon's Monday is coming, the exploratory mode has already outlived its usefulness.

For genuinely disposable work, such as a one-off script or a prototype nobody inherits, the chapter says to skip the judgment overhead. The aim is not to slow every build down. The aim is to know which kind of build you are doing.

## Try it before Monday

Pick one app or script built mostly by momentum. Ask whether someone who did not prompt it into being will have to change it next month. If the answer is yes, you are on the Friday side of Gallon's story. Write the spec you skipped. State the constraints. Read the code like its author would. Do it now, not on Monday.

For your next build, say aloud which mode it is. If it is exploration, set one review condition in advance: the moment someone other than the author has to maintain the result, the mode changes.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
