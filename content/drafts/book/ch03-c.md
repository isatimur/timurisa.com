---
slug: a-tuesday-in-the-slop-era
title: A Tuesday in the slop era
excerpt: A migration passes every test and still breaks two rules nobody wrote down. A scene from Chapter 3 shows why the agent guessed.
categories: [AI engineering, Harness engineering]
chapter: 3
---
The agent returned a migration diff in minutes. It compiled. Every test passed. It also broke two team rules, and neither rule lived anywhere the agent could read.

Chapter 3 tells this story through a fictional payments team called Meridian. They start where many teams start: a good model inside an ordinary repository. At first the results feel magical. Then the team widens the scope, and quality turns erratic. One Tuesday shows why.

## The diff that looked clean

A senior engineer hands the agent a task: move three endpoints onto the new state machine, and keep the house style. The agent comes back with a clean-looking diff.

But the diff pulls in a parsing dependency the team had quietly banned. It also batches writes inside a loop. A payments incident taught the team to avoid exactly that pattern six months earlier.

The review does not save them. The reviewer catches the dependency, misses the write pattern, and approves. The convention resurfaces later, in a review comment nobody will search again.

## The agent guessed

The team could say the model is inconsistent. The chapter says what they really mean is that the workplace is inconsistent. None of it was a hallucination. The agent guessed because the workplace gave it nothing firmer to stand on.

The scene shows a second failure too. The humans missed the same rule. The ban on the dependency was easy to remember. The write pattern lived only in the memory of an incident. A standard that exists only in scattered memory is one an agent cannot inherit, and one a reviewer can miss.

## The unglamorous morning

The next morning the team does plain work. They check in an example of an accepted migration. They add a lint rule for the banned import. They write a setup script that ends the Slack archaeology.

Across the wider story, they also add agent-facing instructions and tighter lint and type gates. They stop relying on "everyone kind of knows how we do migrations here."

Nothing in that list needs a better model. The repo becomes less like a haunted archive of past decisions and more like a managed surface for machine labor. The chapter says the leverage sits where the team stopped treating its own tacit judgment as invisible infrastructure. It calls the larger pattern the software factory.

## One lesson

When a passing diff breaks a rule, ask where that rule lived. If the answer is a person's memory or an old review comment, the agent never had a chance.

Take your last painful review comment. Ask where an agent would find that rule. If the answer is nowhere, turn it into a lint rule or a checked-in example before the next delegated task.

This post draws on Chapter 3 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
