---
slug: meridian-coding-agent-needs-legible-workplace
title: Meridian's coding agent worked until the scope grew
excerpt: A composite fintech case from Chapter 1 shows why erratic agent quality often points to the workplace, not the model.
categories: [AI engineering, Delegation]
chapter: 1
---
Two composite cases run through my book. They are drawn from real patterns, not from a single company. The first appears in Chapter 1 and returns later. I call it the Software Factory, and it is anchored in a company I named Meridian.

Meridian is a mid-size fintech. It starts with an ordinary payments repository and a strong coding model. At first the agent feels magical on small tasks. Then the team expands scope, and quality gets erratic.

## The easy conclusion

Many teams reach for the same explanation at this point: the model is not good enough. They wait for a better one or try a different one.

I wrote the case to push against that reflex. The model is not always the real problem. The deeper issue at Meridian is that the workplace was never made legible enough for delegated machine work. A small task fits inside what the model can see. A larger one depends on things nobody wrote down.

## What was hidden

The chapter explains what those things are. Delegation exposes how much good work always depended on tacit human judgment. In a software setting, that means local conventions, architecture taste, dependency discipline, rollback instinct, performance habits, and many non-functional expectations that senior engineers carry in their heads.

Strong teams internalize this so thoroughly that they mistake it for natural background competence. Then they hand the work to a machine collaborator, and the hidden standards become a liability. The system cannot reliably inherit what the organization never externalized.

## What Meridian does about it

The team adds harnesses, specs, validation, context discipline, eval loops, runtime structure, and review surfaces. A harness, in the book's usage, is the structure around a coding agent that makes its work bounded and inspectable. As the team builds these, the repository changes character. It starts behaving less like a chat playground and more like a managed production environment for machine labor.

I use this case to show how quickly "AI coding" stops being a prompt problem and becomes a systems problem. Nothing in Meridian's story requires a smarter model. It requires a workplace that a delegate can read.

## A second case, briefly

The second case, a tax and advisory firm I called Hargrove, follows the same path with different stakes. Its assistant starts as a conversational surface and then gets asked to do professional work. Fluency is no longer enough. In both cases I wrote that the more valuable the delegated work becomes, the more the surrounding system matters.

## The lesson to take

When an agent does well on small tasks and erratically on larger ones, check the workplace before you check the model. Ask what a new colleague would need to know to do this work well, and whether any of it exists outside someone's head.

You can run this as a short exercise. Pick the last task where the agent's output disappointed you. List the unwritten expectations that the output violated. Each item on that list is a candidate for a spec, a validation, or a repo rule. The book's practical rule applies here: make the standard explicit before you delegate it, or it will be violated silently.

This post draws on Chapter 1 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
