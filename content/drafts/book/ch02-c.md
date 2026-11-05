---
slug: the-friday-app-and-the-monday-rewrite
title: The Friday app and the Monday rewrite
excerpt: Corey Gallon's vibe-coding hangover, quoted in Chapter 2, shows when a fast exploratory build has outlived its usefulness.
categories: [AI engineering, Taste and judgment]
chapter: 2
---
Chapter 2 of my book includes a short scene that many builders will recognize. Corey Gallon at Rexmore calls it the vibe-coding hangover. The app works on Friday. Then, in his words, "Monday rolls around, you want to add a feature… and you realize that you don't understand it, you can't maintain it, and you have to throw most or all of it away."

I keep returning to this scene because it contains a precise lesson about when speed stops paying.

## The mode is fine

Vibe coding is low-spec, high-speed, intuition-led building steered by momentum rather than explicit structure. I do not treat it as worthless. The chapter says it can be brilliant. For exploration, interface sketching, rough prototypes, internal tooling, and one-off automation, it can be the correct move. It makes experimentation cheap enough that more people discover what is worth building.

I wrote that vibe coding is not the enemy. Unexamined vibe coding is. A mode that works for discovery becomes a problem when it quietly hardens into a default production philosophy.

## What Monday reveals

Look at what changes between Friday and Monday in Gallon's account. The app has not broken. It still works. What has changed is the demand on it: it now has to change, and nobody understands it well enough to change it safely.

That is the tell I describe in the chapter. Nobody stood in the way of the build, and nothing failed a test. The cost was deferred until someone needed the code to be maintainable. Production work pays that bill. Chris Kelly at Augment Code makes the same point from the other side. AI code is still code, and vibes do not cut it in production. It still has to live somewhere, interact with systems and users, and be read by future maintainers. The machine does not repeal software reality.

## One switch

The chapter reduces mode awareness to a single switch. Use vibe coding where the cost of being wrong is low and the goal is discovery. Leave it behind the moment the output has to endure. If the Monday that Gallon describes is coming, the exploratory mode has already outlived its usefulness.

For genuinely disposable work, such as a one-off script or a prototype nobody inherits, I say skip the judgment overhead. The point is not to slow every build down. It is to know which kind of build you are doing.

## The takeaway

Before you start a build with a model, say aloud which mode it is. If the answer is exploration, set a condition for review: the moment someone other than the author has to maintain the result, the mode changes. At that point, write the spec you skipped, state the constraints, and read the code like its author would.

You can also run this as a check on work already in flight. Pick one app or script built mostly by momentum. Ask whether someone who did not prompt it into being would have to change it next month. If yes, you are on the Friday side of Gallon's story. Make the switch now, not on Monday.

This post draws on Chapter 2 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
