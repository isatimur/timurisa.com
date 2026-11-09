---
slug: voice-agent-changes-this-week
title: Five voice agent changes a team can try this week
excerpt: Chapter 8 ends with five practical rules for realtime agents. Here is a day-by-day plan to apply each one this week without rebuilding your stack.
categories: [AI engineering, Voice and realtime]
chapter: 8
---
Your voice agent has a number that matters more than its average latency: the P95 from the caller's voice to the agent's voice. Chapter 8 ends with five rules. Each one fits into a day of work.

## Monday: measure the whole loop

The first rule says to spend the latency budget on first audio, not on silence. A quick spoken acknowledgment followed by a slower answer beats a long silent pause followed by a polished one.

Start with measurement. Neil Zeghidour at Gradium AI puts the target for natural conversation at "around 200 milliseconds" for the entire stack of understanding, producing an answer, and pronouncing it. Kwindla Hultman Kramer says to watch the tail. In his words, "you care a lot if your P95 goes up above 800, 900, 1,000 milliseconds for the entire voice-to-voice response chain."

Record your own voice-to-voice P95. Then list your slowest tools. The chapter warns that tool calls become the bottleneck as speech layers improve. Zeghidour says a tool call runs "between 500 milliseconds and 4 seconds," and a 4-second pause is a dead line.

## Tuesday: add acknowledgments

Put a short spoken acknowledgment in front of every slow step. Measure again. Streaming partial understanding can rescue a system whose deeper reasoning takes longer.

## Wednesday: match the flow, then tighten confirmations

The second rule concerns half-duplex systems. Most production speech-to-speech systems cannot listen and speak at once. Structured, turn-based flows survive that limit. Open-ended companion chat does not, because the model reads every interjection as a barge-in. Decide which kind of flow your agent serves. If it is open-ended, narrow it. Do not patch the limit with longer silence thresholds.

The third rule inverts confirmation cost on purpose. The warmer the interface, the cheaper approval feels. Rank your agent's actions by consequence. For the top few, make confirmation deliberate: repeat the key detail back and ask for a clear yes. Keep low-stakes actions light.

## Thursday: reuse the agent you trust

The fourth rule says to wrap voice around your strongest existing agent and not rebuild one. Luke Harries at ElevenLabs says the eval work is the asset to preserve, so the move is to "wrap it up into its own first-class primitive." Keep the tools, the evals and the workflow logic. If the underlying system is weak, voice exposes that faster. Run your existing evals against the core agent before you add the voice layer, and fix what fails.

## Friday: voice the uncertainty

The fifth rule asks for a way to admit uncertainty out loud. In voice the human watches the system hesitate in real time. Write three spoken phrases: one to clarify, one to confirm, one to hand off. Then check that a real escalation path exists behind the third.

## The takeaway

Know your voice-to-voice P95. Never leave the caller in silence while a slow step runs. Do the first part on Monday morning.

This post draws on Chapter 8 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
