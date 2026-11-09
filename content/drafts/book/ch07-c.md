---
slug: day-a-client-disputes-the-filing
title: The day a client disputes what the assistant filed
excerpt: A scene from Chapter 7 shows why audit trails matter as much as blocking bad actions, and what a partner can say when a client asks what happened.
categories: [AI engineering, Security]
chapter: 7
---
A client disputes a position that Hargrove's assistant helped file. A partner must answer one question: what did the system actually do? Chapter 7 uses this scene to teach one lesson about trust, and the lesson is not about prevention.

## Two possible answers

In the first version, the assistant reached its documents through a mediation layer. The answer exists. The trajectory shows which matter files the assistant retrieved, which validation engine it called, and which draft it surfaced. It also shows the authority behind each step. The assistant worked under a read-only token scoped to this matter. It had no authority to send anything to the client.

In the second version, nothing was recorded. The chapter is direct about this case. Without a trail, the honest answer would be a shrug. The firm would hold a liability it cannot bound.

That contrast carries the lesson. Security talk often centers on blocking bad actions. The chapter says blocking is only half the requirement. In high-stakes work, trust also depends on reconstructing what happened. Which sources were consulted? Which tool calls were made? Which permissions were exercised? Which output reached review, and by what path? If a regulator asks later, the organization needs more than a statement that the model was generally aligned. It needs evidence.

## What the trail does

The chapter treats observability as part of the security argument, not a side topic. Rich traces, approval logs, trajectory views, and reviewable histories let an institution turn bounded autonomy into something it can defend.

The chapter draws on Joel Hron's high-stakes framing. The answer there is not unrestricted autonomy under perfect prevention. It is constrained execution plus inspectable paths. The system does meaningful work and leaves a trail that domain experts can examine.

Look at how the scene depends on earlier design choices. The read-only, matter-scoped token is least privilege. The mediation layer made the trail possible in the first place. The partner can answer calmly because the architecture was built to be questioned.

## The tension the chapter admits

Inspection has a cost. Detailed traces can expose sensitive data, internal reasoning artifacts, or privileged content. A trail that anyone can read becomes its own risk. So the chapter asks for selective retention, role-based visibility, redaction strategies, and separate surfaces for operators, reviewers, and auditors. The tension does not argue against inspection. It argues for governing inspection properly.

## The takeaway

Ask the partner's question about your own agent. If a client or a regulator asked what it did last Tuesday, could you name the sources it consulted, the tools it called, and the permissions it used?

If you could not, start with the cheapest fix. Pick one agent and record, for each run, the tool calls and the authority used. Then decide who may read that record, and write that down too.

This post draws on Chapter 7 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
