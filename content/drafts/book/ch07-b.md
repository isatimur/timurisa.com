---
slug: agent-security-steps-this-week
title: Five agent security steps a team can take this week
excerpt: Chapter 7 ends with a short checklist. Here is how a team can turn it into five concrete actions before the next sprint ends.
categories: [AI engineering, Security]
chapter: 7
---
The practical checklist at the end of Chapter 7 has five items. Each one fits in a week of work for a small team. None of them needs a new product. They need a few honest conversations and some editing of configuration.

## Start with the agents you already run

First, check whether your agents run the four-controls baseline by default. The chapter names them: sandboxing, network restriction, privilege boundaries, and human review. Each stops a different failure. Sit with one agent and ask which of the four it has. Treat any gap as a defect now, not as hardening for after an incident.

Second, run a survivability test at each step. The chapter asks you to build for the idea that the agent will sometimes be wrong. So for each step, ask whether a mistake there is survivable before you ask whether the agent could make it. Write the answer next to the step. Where the answer is no, add a gate or narrow the power.

Third, write one default-permission row per agent. Do not write one blanket policy. The chapter gives examples. A research agent may need no write access at all. A support agent may read account metadata but not issue refunds. A legal workflow may need broad retrieval but no authority to send anything externally. Think about the stage of the workflow too, not only the agent as a whole. A scope that looks harmless alone can compound once it pairs with retrieval, persistence, and retries.

## Then look at connections and credentials

Fourth, apply the governance test before you add a tool server. The chapter says that if a new connection grows your agents' reach faster than your team can answer who can call this, with what scope, and where it is logged, then standardization has expanded your attack surface. Make that a gate. No new server joins until someone writes down the three answers.

The chapter quotes Tun Shwe at Lenses: "Your insecure MCP server won't survive production." The failures he points to are mundane. Authentication treated as a configuration option. Tool descriptions trusted as input. Servers exposed publicly because internal routing was harder.

Fifth, hunt for standing credentials. Search your agent configuration for long-lived API keys and for personal access tokens borrowed from an operator. The chapter calls a standing credential a red flag. An agent on a borrowed key is not delegated authority. It is impersonation with no expiry and nothing to revoke. The shape the chapter points toward is a short-lived, scoped token bound to a session, a user, and a task.

## A realistic plan for the week

On day one, list your agents. On day two, mark which of the four controls each has. On day three, write the permission rows. On day four, review every connected tool server against the governance test. On day five, replace one standing credential with a scoped one, and log what you could not fix yet.

You will not finish everything. That is fine. The chapter does not promise that a checklist makes a system safe. It asks you to make carelessness less powerful, one agent at a time, and to leave a written record of what you changed and what remains open.

The takeaway is small and specific. By Friday, you should hold a single page: one permission row per agent, one answer to the three governance questions per tool server, and a short list of credentials still to replace.

This post draws on Chapter 7 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
