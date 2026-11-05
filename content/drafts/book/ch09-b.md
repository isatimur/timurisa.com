---
slug: five-checks-for-an-ai-native-team
title: Five checks to run on your AI-native team this week
excerpt: Chapter 9 ends with a practical checklist. Here is how a team can turn each item into a concrete step in one week, starting with the queue.
categories: [AI engineering, AI-native organization]
chapter: 9
---
Chapter 9 of my book ends with five checks. None needs a new tool. Each asks a team to look at how work moves, not how much work gets made. Here is how I would run them in one week.

## Find the queue and read your rituals

Start with the queue. Find where work piles up waiting on a person. That is where scarcity actually moved. It tells you where to invest, instead of leaving you to guess who is slow. Ask each team one question: what is waiting for a human right now? Write down the answers. Review requests, unmade decisions and unchecked drafts are the usual suspects.

Next, check what each ritual rations. A standup that reports how much got produced rations the abundant resource. A standup that surfaces which decisions are unmade rations the scarce one. The chapter says to run the second kind. Change one agenda this week. Replace the output round with a list of decisions waiting on someone, and see how the conversation changes.

## Name owners and measure outcomes

Third, name the owner before you widen who can create. The book supports broader creation. Support teams, product managers and domain experts should be able to ship meaningful changes. But every path you open needs an owner for the production path, an owner for domain correctness, an owner for the security boundaries, and a decision about which workflows stay human-gated. Settle this before the path opens. Otherwise you discover the gap after something ships.

Fourth, measure outcomes, not artifact volume. The chapter suggests rework rate, the share of generated work that ships unreverted, and time in the review queue. Pull these three numbers for one team. A dashboard that only counts pull requests can go green while the real constraint breaks. The chapter cites Nick Arcolano's analysis at Jellyfish, built on some twenty million pull requests, as the failure mode at scale.

## Check that your voters are independent

The fifth check applies if you use redundancy to judge output. Majority voting and model debate can beat one expensive call. The chapter describes sampling several responses and voting, and having weaker models debate what a stronger model says. But the voters must be genuinely independent. One model sampled five times cancels noise. It does not cancel its shared blind spot. If your review setup samples one model repeatedly, add a voter that can disagree for different reasons.

## The takeaway

Put the five checks on one page and assign one person to each. By Friday you should have a list of queues, one changed ritual, a named owner for each widened path, three outcome numbers, and a verdict on whether your redundancy is real. That page is a small version of what the chapter calls review capacity, the control system for organizations that use agents.

You will not fix everything in a week. You will know where your institution depends on habit instead of written rules. That is where the work starts.

This post draws on Chapter 9 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
