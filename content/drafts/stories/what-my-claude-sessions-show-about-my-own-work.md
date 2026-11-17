title: What my Claude sessions show about my own work
slug: what-my-claude-sessions-show-about-my-own-work
excerpt: I asked Claude to read the logs of my own sessions on the portugal-3d project. Twenty clean reviews, five usage resets, two false "done" reports, and what logs can never tell you.
category: Engineering practice
category: AI engineering
date: 2026-11-17T16:00:00.000Z

Claude Code writes every session to a log on my machine. The logs are JSON lines. I asked Claude to read the ones for portugal-3d and tell me what they show about my own work.

I limited the read. Claude read my messages and the structured results of reviews. It did not read tool output, because tool output can hold secrets.

## Finding 1: the project folder is all reviews

The project folder for portugal-3d holds 20 sessions. Ten run on 7 November and ten on 13 November. All 20 are automated security reviews. Each one received a diff and returned a structured result. All 20 returned an empty list of findings.

They covered the globe, the border, the scroll, the dive and the return, the opener, and the story chapters.

An empty list is a result, not a proof. A reviewer saw only the diff, not the whole repository. And a model wrote each review. What the logs do give me is a record that every change got a look.

## Finding 2: my own building happened elsewhere

My conversations about the globe are not in that folder. They sit in one long session in my main folder that began on 28 September. It holds about 230 of my own messages across seven weeks.

The log tells me what I asked and when. It does not hold the reasons. The reasons are in the notes that the session wrote for itself.

## Finding 3: usage limits set the rhythm

From 9 October on, the log shows five usage-limit resets, each followed by a message that tells the agent to continue. It shows cut-offs at 01:39 on 14 November and 03:52 on 17 November.

Work does not stop cleanly at these points. This is why my briefs say "commit after each round".

## Finding 4: two false "done" reports

A stop hook called done-check compares a completion report with the repository. It flagged two reports in these logs.

On 13 November, it flagged a report that claimed completion. The diff against the main branch touched 81 files and 6,709 added lines. On 15 November, it flagged a report of "merged, pushed and ready" while the working tree was dirty.

The hook caught both, not me.

## Finding 5: forty minutes of waiting for a report

On 3 November I sent the same message, "I am waiting for the report, then deploy", 17 times in 39 minutes. In the middle of that I told the agents to stop the hung ones and restart the work step by step.

The lesson is about the channel, not the wait. If a report does not come, ask why the channel is silent. Do not send the same message again.

## Finding 6: two mistakes in the briefs

One agent was briefed with the wrong place. My Pena Park project is in Ribeira de Pena. It is not the Parque da Pena in Sintra. The notes now say so at the top.

Another agent put my email address into the user-agent header of requests to a public map service. My briefs now forbid it.

In both cases the fix went into the brief.

## What logs cannot tell you

They cannot show whether a map is good. They cannot show whether a visitor understood a page. They cannot show what a real phone does. They record the process, not the outcome.

## Lesson

Read your own logs at least once. They hold patterns you cannot see from inside a session: where the limits fall, which checks fire, and which mistakes repeat. Then turn each pattern into a rule, a hook, or a line in a brief.
