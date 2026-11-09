---
slug: monday-morning-at-meridian
title: A Monday morning at Meridian, and the coherence problem
excerpt: A staff engineer returns to twelve pull requests and no reckless act. The scene in Chapter 9 shows why output is no longer the scarce thing.
categories: [AI engineering, AI-native organization]
chapter: 9
---
On Monday morning, a staff engineer at Meridian opens twelve pull requests, four synthetic eval reports and two security review requests. Nobody did anything wrong. That is the point of the scene in Chapter 9.

Meridian is a company well past casual AI adoption. Over the weekend, engineers launched subagents against backlog items. Product used internal tools to spin up three alternative flows for a new onboarding step. Support found a recurring customer complaint and had an agent draft both a help-center update and a proposed product fix.

A dashboard then showed that an internal automation had quietly touched three systems nobody had discussed together on Friday. Any one of them could be hiding another admin-override regression, the throttle on the wrong path from Chapter 4, now buried under a weekend of green checkmarks.

## No reckless act

Read the scene again. Each move is locally defensible. Everyone is productive. The chapter says that is the problem.

Meridian is no longer starved for output. It is starved for coherence. Which changes matter? Which are duplicates? Which artifacts reflect current strategy, and which reflect a private interpretation of it? Which outputs are safe to merge, safe to trial, safe to ignore, or dangerous to trust? Who is responsible for saying so when authorship is half human, half machine, and spread across several functions?

This is where the Software Factory stops being only a repo pattern. Earlier chapters showed a team turning a repo into an environment agents can use. Chapter 9 asks what happens next. Someone has to own the rules. Someone has to decide which patterns become standard. The factory becomes a company problem.

## Put the questions in order

The chapter gives an order for the questions. Settle ownership first, because every other question needs someone empowered to answer it. Then ask about strategy fit, which discards whole branches cheaply. Ask about safety-to-merge last. It is the expensive per-artifact check, so run it last and least.

Apply that order to the staff engineer's Monday. Without it, twelve pull requests and two security requests become fourteen separate inspections. With it, the first question is who owns each item. The second removes work that does not fit the current plan. Only the survivors earn the costly review.

The chapter names the cost of skipping this order alignment debt. It builds up when execution fans out faster than shared understanding. It comes due as rework, confusion, or an exhausting burst of manual coordination. The remedy is not to ban private leverage. Move alignment earlier, with shared planning, visible decomposition and common review spaces.

## Try it on your own Monday

If your team already runs agents on weekends, do a short exercise. Imagine your next Monday. List what would be waiting for you. For each item, write down three things: who owns it, whether it fits the strategy, and what check would make it safe to merge.

Every blank in that list marks a place where your coherence will break first. Fill the blanks before the weekend.

This post draws on Chapter 9 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
