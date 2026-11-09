---
slug: meridian-coding-agent-needs-legible-workplace
title: Meridian's coding agent worked until the scope grew
excerpt: A composite fintech case from Chapter 1 shows why erratic agent quality often points to the workplace, not the model.
categories: [AI engineering, Delegation]
chapter: 1
---
Meridian's coding agent felt magical on small tasks. Then the team widened the scope, and the quality turned erratic.

Meridian is a composite case in Chapter 1. It is drawn from real patterns, not from a single company. The chapter calls it the Software Factory, and the story returns in later chapters. Meridian is a mid-size fintech with an ordinary payments repository and a strong coding model.

## The easy conclusion

Many teams reach for the same explanation at this point: the model is not good enough. They wait for a better one or switch to another.

The chapter pushes against that reflex. The model is not always the real problem. The deeper issue at Meridian is that nobody made the workplace legible enough for delegated machine work. A small task fits inside what the model can see. A larger task depends on things nobody wrote down.

## What was hidden

Delegation exposes how much good work always depended on tacit human judgment. In software, that means local conventions, architecture taste, dependency discipline, rollback instinct, performance habits, and many non-functional expectations that senior engineers carry in their heads.

Strong teams absorb these so thoroughly that they mistake them for natural background competence. Then they hand the work to a machine, and the hidden standards turn into a liability. The system cannot reliably inherit what the organization never put into words.

## What Meridian does about it

The team adds harnesses, specs, validation, context discipline, eval loops, runtime structure, and review surfaces. A harness is the structure around a coding agent that makes its work bounded and inspectable. As the team builds these, the repository changes character. It behaves less like a chat playground and more like a managed production environment for machine labor.

The chapter uses this case to show how quickly "AI coding" stops being a prompt problem and becomes a systems problem. Nothing in Meridian's story requires a smarter model. It requires a workplace that a delegate can read.

## Run it on your own repo

When an agent does well on small tasks and erratically on larger ones, check the workplace before you check the model. Ask what a new colleague would need to know to do this work well. Ask whether any of it exists outside someone's head.

Try this exercise. Take the last task where the agent's output disappointed you. List the unwritten expectations the output violated. Each item is a candidate for a spec, a validation, or a repo rule. Write the first one into the repository today.

This post draws on Chapter 1 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
