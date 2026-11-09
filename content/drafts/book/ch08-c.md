---
slug: interruption-is-a-runtime-problem
title: When a caller interrupts, your runtime gets tested
excerpt: A support-call scene from Chapter 8 shows that interruption handling is about execution semantics, not UX polish, and what to design for.
categories: [AI engineering, Voice and realtime]
chapter: 8
---
A caller is halfway through a sentence when they change the facts. The agent has already started a retrieval step. Chapter 8 uses this moment to teach one lesson: turn-taking is a runtime problem wearing a UX costume.

The chapter sets the scene with Hargrove's assistant, the running example in the book. It sits on a live support call. The client's account is locked. The case crosses billing and compliance rules. The client's patience is running out in real time. The agent must understand messy speech, notice that the caller interrupted to add a crucial exception, retrieve the right policy, check the client record, decide whether to act or escalate, and explain what it is doing. It must also avoid sounding lost or overconfident.

## Where the call breaks

The chapter picks out several moments. Each one tests a different part of the system.

- The caller corrects their own account number halfway through a sentence. The system has to revise state.
- The caller says, "No, wait, that was the old policy." The system has to tell abandoned context from active context.
- The agent announces a short wait while it checks, then goes silent. The caller does not feel a neutral backend delay. The caller feels incompetence.

Then comes the hardest case. The agent has already begun a retrieval step when the caller reveals that the account belongs to a different region. If the runtime cannot cancel, redirect or downgrade the old plan cleanly, the agent starts answering with stale assumptions. The human hears a conversational failure. The root problem is execution semantics.

## Questions that belong to the runtime

It is tempting to file interruption handling under experience polish. The chapter calls that too shallow. When a human cuts the system off, ask:

- What state is preserved?
- Which partial output is discarded?
- Does a tool call continue in the background? If so, how does the result surface later?
- If the user answers a question indirectly, how much of the prior plan stays binding?
- If a user correction and a returning tool result arrive together, which one takes priority?

The chapter says these are execution questions, not copywriting questions. They resemble the questions you ask of any durable workflow, now asked under a clock. A spoken system manages state in public. It needs a runtime that can pause, redirect, summarize and resume without forcing the user to rebuild everything by hand.

Security boundaries must also survive the change of medium. A friendly voice does not make overscoped authority less dangerous. Because voice feels human, people approve more casually. So the more consequential the action, the more deliberate the confirmation has to be.

## Try it

Write the support-call script for your own agent. Include a mid-sentence correction, an abandoned policy and a late discovery that changes the plan while a retrieval step runs. Walk each case through your runtime on paper. For each one, write down three things: what state is kept, what is discarded and what the caller hears. Every blank answer marks a runtime gap. Fix it in the execution layer before you touch the words the agent speaks.

This post draws on Chapter 8 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
