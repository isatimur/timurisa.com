---
slug: monday-morning-at-meridian
title: A Monday morning at Meridian, and the coherence problem
excerpt: A staff engineer returns to twelve pull requests and no reckless act. The scene in Chapter 9 shows why output is no longer the scarce thing.
categories: [AI engineering, AI-native organization]
chapter: 9
---
Chapter 9 of my book opens its main argument with a scene. I want to retell it here because its lesson is easy to miss.

Meridian is a company well past casual AI adoption. Over a weekend, engineers launched subagents against backlog items. Product used internal tools to spin up three alternative flows for a new onboarding step. Support found a recurring customer complaint and had an agent draft both a help-center update and a proposed product fix.

On Monday, a staff engineer woke up to twelve pull requests, four synthetic eval reports and two security review requests. A dashboard showed that an internal automation had quietly touched three systems nobody had discussed together on Friday. Any one of them could be hiding another admin-override regression, the throttle on the wrong path from Chapter 4, now buried under a weekend of green checkmarks.

## Nobody did anything wrong

Read the scene again and you will not find a reckless act. Each move is locally defensible. Everyone is productive. In the book I say that is the problem.

Meridian is no longer starved for output. It is starved for coherence. Which changes matter? Which are duplicates? Which artifacts reflect current strategy, and which reflect a private interpretation of it? Which outputs are safe to merge, safe to trial, safe to ignore, or dangerous to trust? And who is responsible for saying so when authorship is half human, half machine, and spread across several functions?

This is where the Software Factory stops being only a repo pattern. In the book, the Software Factory is the environment a team builds so agents can work in it. Chapter 9 asks what happens after that. Someone has to own the rules. Someone has to decide which patterns become standard. The factory becomes a company problem.

## Put the questions in order

The chapter gives an order for the questions, and I think it is the most useful part of the scene. Settle ownership first, because every other question needs someone empowered to answer it. Then ask about strategy fit, which discards whole branches cheaply. Ask about safety-to-merge last. It is the expensive per-artifact check, so you want to run it last and least.

Consider what that order does for the staff engineer on Monday. Without it, twelve pull requests and two security requests become fourteen separate inspections. With it, the first question is who owns each item. The second removes work that does not fit the current plan. Only the survivors earn the costly review.

The chapter names the cost of skipping this as alignment debt. It accumulates when execution fans out faster than shared understanding. It comes due as rework, confusion, or an exhausting burst of manual coordination. The remedy is not to ban private leverage. It is to move alignment earlier, with shared planning, visible decomposition and common review spaces.

If your team already runs agents on weekends, try a short exercise. Imagine your own Monday. List what would be waiting for you, and for each item write down who owns it, whether it fits the strategy, and what check would make it safe to merge. Gaps in that list show where your coherence will break first.

This post draws on Chapter 9 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
