title: Mentoring the machine: outcomes, context, constraints, evaluation
slug: mentoring-the-machine
excerpt: Eric Hou of Augment Code calls AI a perpetually junior engineer. What that role asks of you, and how it maps to the files in a spec-driven repo.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T18:00:00.000Z

A spec is what you hand to a colleague who is capable but new. That image comes from [a talk by Eric Hou](https://www.youtube.com/watch?v=Zniw5c9_jx8), a member of technical staff at Augment Code.

## The perpetual junior

Hou describes AI as a perpetually junior engineer. It has no knowledge of your organisation or your systems. It can implement something in isolation. It needs a structured environment to do well. Unlike a human junior, it works through a task in minutes, but it forgets between conversations.

From this he draws a role for the engineer: the perpetual tech lead. Stop assigning tickets. Start mentoring. A mentor gives outcomes, context, constraints, and evaluation, and does not dictate the implementation.

Those four words are close to a definition of a spec.

## His story, as he tells it

Hou anchors the talk in a Tuesday where three things collide: an overdue design-system component, a staging emergency caused by a library mismatch, and a new colleague asking for help. He describes handing the component to an agent early, running log parsing and a search for the bad commit in parallel across two agents, and pointing the new colleague to a chat assistant that can read the code, the documents, and the tickets.

His headline result is a library upgrade across 12 services and 20,000 lines of code. By his account it was finished, tested, and ready for final human polish in roughly half a day, against a normal estimate of three weeks. These are his numbers about his work. I cannot check them.

## Why teams stall

He makes a sharp point about scale. Individuals gain a lot, but teams stall. The reason is the same context deficit that makes a new hire take months to become useful. He reports that four in five engineers name missing context as their biggest blocker, and that this predates AI. You cannot give an agent the knowledge your team never wrote down.

His three starting steps are to gather knowledge by auditing the documents you have, to get familiar by introducing tools across teams, and to lean in by sharing what works, including agent memories and task lists.

## Mapping it to files

Here is how his four words map onto the files in my Porto repository.

Outcomes live in the user-visible behaviour of each entry in the feature list. Context lives in `AGENTS.md`, which says where to start, and in the plan and the architecture notes. Constraints live in the hard-constraints section and in the checks, such as the rule that a model never shrinks below 97 percent of its real size. Evaluation lives in the verify command and in the evaluator rubric.

I am not claiming Hou uses these files. The mapping is mine. But it shows that a spec-driven repository is mentoring written down, so the next session, which has no memory, can still be mentored.

## A small exercise

Think of a task you would give a new colleague on their first day. Write the four things you would tell them: the outcome, what they need to know, what they must not do, and how you will judge the result. That page is a spec.

Next: [when the spec is not enough](/blog/when-the-spec-is-not-enough).
