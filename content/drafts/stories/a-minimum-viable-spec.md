title: A minimum viable spec
slug: a-minimum-viable-spec
excerpt: How small can a spec be and still work? Three fields from one entry of my feature list, a note on structure from the Kiro team, and a proposal.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T20:00:00.000Z

My research notes on spec-driven development end with an open question: what is the minimum viable spec for a small task, compared with a large refactor? Here is my attempt to answer it, from files I use.

## Nine fields, three that matter

An entry in my Porto feature list has nine fields: id, priority, area, title, user-visible behaviour, status, verification steps, evidence, and notes.

Six of them are bookkeeping. The id and the priority let an agent pick the next item. The area and the title let a person scan the list. The status says where the item stands. The notes field holds anything that does not fit elsewhere.

Three fields carry the spec itself. They are the behaviour a user would see, the steps that verify it, and the evidence that proves the steps passed.

## My proposal

For a small task, write those three things and nothing more.

First, one sentence on what changes for the user, in terms the user would use. Second, one way to check it, a command or an exact step. Third, a place to record what the check printed.

If you cannot write the second one, the task is not ready for an agent. That is useful to learn in the first two minutes.

For a large refactor, the same three fields apply, but you split the work into many entries and add the constraints that must hold across all of them. The refactor's spec is a list of small specs, plus the rules that bind them.

I should say this is a proposal. I have not tested it against a range of project types, and I cannot say it is the right minimum for every team.

## A note on structure

In [his Kiro talk](https://www.youtube.com/watch?v=HY_JyxAZsiE), Al Harris explains why the tool uses fixed templates for its three stages. The structure lets the team build reproducible tooling on top, such as task management in the interface. He also admits the structure is too rigid for some people. Some want to start from a technical note, such as a refactor where the requirements are not yet known, and extract the requirements later. The team was working on making the flow more flexible.

That tension is real. More structure gives tools something to hold. Less structure fits more kinds of work.

## Keeping specs current

The second open question is how to keep specs current without process drag. My answer is to attach the update to something that already happens. My end-of-session checklist asks for the progress file and the feature list to be updated before the session ends. The update is part of finishing, not an extra chore.

My own files show the limit of that. Seven features are in progress against a rule of one. Habit helps, but it does not replace a check.

## Who writes the spec

The third question is which parts a model writes. Harris shows one example: after working out a deployment detail the hard way, he asks the tool to write what it learned into a steering document, and says it usually does a good job. The model records. The person decides what is worth recording.

## Try it today

Take one task from this week. Write the three fields. Ask an agent to do the task using only those three. See what it gets wrong. The gaps it finds are the next lines of your spec.

This is the last article in this series for now. It began with [what spec-driven development means to me](/blog/what-spec-driven-development-means-to-me).
