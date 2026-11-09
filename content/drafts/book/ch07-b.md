---
slug: agent-security-steps-this-week
title: Five agent security steps a team can take this week
excerpt: Chapter 7 ends with a five-item checklist. Here is how a small team can turn each item into one concrete action before the week ends.
categories: [AI engineering, Security]
chapter: 7
---
By Friday, a small team can hold one page that answers five security questions about its agents. Chapter 7 ends with a practical checklist of five items. Each one fits in a week. None needs a new product. They need a few honest conversations and some edits to configuration.

## Start with the agents you already run

First, check for the four-controls baseline. The chapter, citing Fouad Matin's guidance for coding agents at OpenAI, names them: sandboxing, network restriction, privilege boundaries, and human review. Each stops a different failure. Sit with one agent and mark which of the four it has. Treat any gap as a defect now, not as hardening for after an incident.

Second, run a survivability test at each step. The chapter says to build for "the agent will sometimes be wrong." So for each step, ask whether a mistake there is survivable before you ask whether the agent could make it. Write the answer next to the step. Where the answer is no, add a gate or narrow the power.

Third, write one default-permission row per agent. Skip the blanket policy. The chapter gives examples. A research agent may need no write access at all. A support agent may read account metadata but not issue refunds. A legal workflow may need broad retrieval but no authority to send anything externally. Set the minimum per stage of the workflow, not only per agent. A scope that looks harmless alone can compound once it pairs with retrieval, persistence, and retries.

## Then look at connections and credentials

Fourth, apply the governance test before you add a tool server. The chapter says that if a new connection grows your agents' reach faster than your team can answer who can call this, with what scope, and where it is logged, standardization has expanded your attack surface. Make that a gate. No new server joins until someone writes down the three answers.

The chapter quotes Tun Shwe at Lenses: "Your insecure MCP server won't survive production." The failures he points to are mundane. Authentication gets treated as a configuration option. Tool descriptions get trusted as input. Servers go public because internal routing was harder.

Fifth, hunt for standing credentials. Search your agent configuration for long-lived API keys and for personal access tokens borrowed from an operator. The chapter calls a standing credential a red flag. An agent on a borrowed key does not hold delegated authority. It impersonates the operator, with no expiry and nothing to revoke. The chapter points toward a short-lived, scoped token bound to a session, a user, and a task.

## A plan for the week

- Day one: list your agents.
- Day two: mark which of the four controls each has.
- Day three: write the permission rows.
- Day four: review every connected tool server against the governance test.
- Day five: replace one standing credential with a scoped one, and log what you could not fix yet.

You will not finish everything. That is fine. The checklist does not promise safety. It asks you to make carelessness less powerful, one agent at a time.

Friday's page holds three things: one permission row per agent, one answer to the three governance questions per tool server, and a short list of credentials still to replace. Print it and put it in the next sprint review.

This post draws on Chapter 7 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
