---
slug: interruption-is-a-runtime-problem
title: When a caller interrupts, your runtime gets tested
excerpt: A support-call scene from Chapter 8 shows that interruption handling is about execution semantics, not UX polish, and what to design for.
categories: [AI engineering, Voice and realtime]
chapter: 8
---
Chapter 8 opens its main scene with a support call. I want to walk through it, because it teaches one lesson: turn-taking is a runtime problem wearing a UX costume.

Picture Hargrove's assistant, the running example in the book, on a live call. The client's account is locked. Their case crosses billing and compliance rules. Their patience is running out in real time. The agent must understand messy speech, notice that the caller interrupted to add a crucial exception, retrieve the right policy, check the client record, decide whether to act or escalate, and explain what it is doing. It must also avoid sounding either lost or overconfident.

## Three moments that break

The chapter picks out a few moments. In the first, the caller corrects their own account number halfway through a sentence. The system has to revise state. In the second, the caller says, "No, wait, that was the old policy." The system has to tell abandoned context from active context. In the third, the agent says "One moment while I check that" and then goes silent. The caller does not experience a neutral backend delay. They experience incompetence.

Then comes the case I find most instructive. The agent has already begun a retrieval step when the caller reveals that the account belongs to a different region. If the runtime cannot cancel, redirect, or downgrade the old plan cleanly, the system starts answering with stale assumptions. The human hears a conversational failure. The root problem is execution semantics.

## Questions that belong to the runtime

It is tempting to file interruption handling under polish. The chapter says that is too shallow. When a human cuts the system off, what state is preserved? Which partial output is discarded? Does a tool call continue in the background, and if so, how is the result surfaced later? If the user answers a question indirectly, how much of the prior plan stays binding? If a user correction and a returning tool result arrive at once, which one wins?

None of these is a copywriting question. They are the same kind of question you ask of any durable workflow, now asked under a clock. The chapter adds that a spoken system must manage state in public. It needs a runtime that can pause, redirect, summarize, and resume without making the user rebuild everything by hand.

The security boundaries must also survive the change of medium. A friendly voice does not make overscoped authority less dangerous. The chapter goes further: because voice feels human, people approve more casually, so confirmation for consequential actions has to be more deliberate.

## The takeaway

Take your own agent and write the support-call script for it. Include a mid-sentence correction, an abandoned policy, and a late discovery that changes the plan while a retrieval step is running. Then walk each case through your runtime on paper. For each one, write down what state is kept, what is discarded, and what the caller hears. Wherever you cannot answer, you have found a runtime gap. Fix it there, in the execution layer, before you touch the script the agent speaks.

This post draws on Chapter 8 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
