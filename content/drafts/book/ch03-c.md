---
slug: a-tuesday-in-the-slop-era
title: A Tuesday in the slop era
excerpt: A migration passes every test and still breaks two rules nobody wrote down. A scene from Chapter 3 shows why the agent guessed.
categories: [AI engineering, Harness engineering]
chapter: 3
---
In Chapter 3 I follow a fictional payments team called Meridian. They start where many teams start: a good model inside an ordinary repository. At first the results feel magical. Then the team widens the scope, and quality turns erratic. One Tuesday shows why.

## The diff that looked clean

A senior engineer hands the agent a migration. Move three endpoints onto the new state machine, and keep the house style. The agent comes back in minutes with a clean-looking diff. It compiles. The tests pass.

But the diff pulls in a parsing dependency the team had quietly banned. It also batches writes inside a loop. That is exactly the pattern a payments incident taught the team to avoid six months earlier. Neither rule was written anywhere the agent could read.

The review does not save them. The reviewer catches the dependency, misses the write pattern, and approves. The convention resurfaces later in a review comment nobody will search again.

## The agent guessed

The team could say the model is inconsistent. The chapter says what they really mean is that the workplace is inconsistent. None of this was a hallucination. The agent guessed because the workplace gave it nothing firmer to stand on.

This is the lesson I want to keep from the scene. Good code carries many unstated decisions, and the agent fills each gap by inference. Lopopolo, whom I quote in the chapter, says the models have seen "trillions of lines of code that make every possible choice of those non-functional requirements that you could ever imagine." When your requirement is unwritten, the agent picks one of those choices. Nothing makes the pick yours.

It also shows how a human reviewer can fail in the same place. The ban on the dependency was easy to remember. The write pattern lived in memory from an incident. A standard that exists only in scattered memory is one an agent cannot inherit, and one a reviewer can miss.

## The unglamorous morning

The next morning the team does plain work. They check in an example of an accepted migration. They add a lint rule for the banned import. They write a setup script that ends the Slack archaeology. They also add agent-facing instructions and tighter lint and type gates.

Nothing in that list needs a better model. The repo becomes less like a haunted archive of past decisions and more like a managed surface for machine labor. The chapter calls the larger pattern a Software Factory: a repository run as a staged, inspectable production line for delegated work. The leverage sits where the team stopped treating its own tacit judgment as invisible infrastructure.

I would add one practical note. Look at the two rules in this scene. One became a lint rule, which a machine can enforce. The other needs a checked-in example, which shows the pattern. Different rules need different forms. The point is that each one ends up somewhere the agent can reach.

So take your last painful review comment, the one that began "we never do it this way here." Ask where an agent would find that rule. If the answer is nowhere, turn it into a lint rule or an example before the next delegated task.

This post draws on Chapter 3 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
