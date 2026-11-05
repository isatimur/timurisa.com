---
slug: voice-agent-changes-this-week
title: Five voice agent changes a team can try this week
excerpt: Chapter 8 ends with five practical rules for realtime agents. Here is how to apply each one in a week without rebuilding your stack.
categories: [AI engineering, Voice and realtime]
chapter: 8
---
Chapter 8 ends with a practical checklist for realtime and voice agents. Five rules. Here is how I would turn each into work for this week.

## Fix the latency budget first

The first rule is to spend your latency budget on first audio, not on silence. A quick spoken acknowledgment followed by a slower answer beats a long silent pause followed by a polished one. The chapter notes that streaming partial understanding can rescue a system whose deeper reasoning takes longer.

Start by measuring the whole loop, not one stage. Neil Zeghidour at Gradium AI sets the target for natural conversation at "around 200 milliseconds" for the entire stack of understanding, producing an answer, and pronouncing it. Kwindla Hultman Kramer says to watch the tail. In his words, "you care a lot if your P95 goes up above 800, 900, 1,000 milliseconds for the entire voice-to-voice response chain." Record your own P95 from voice to voice. Then add a spoken acknowledgment before any slow step, and measure again.

The chapter also warns that tool calls become the bottleneck as speech layers improve. Zeghidour says a tool call "between 500 milliseconds and 4 seconds" gives you a dead line at the long end. So list your slowest tools and time them.

## Match the interaction to the system you have

The second rule concerns half-duplex systems. Most production speech-to-speech systems cannot listen and speak at once. Structured, turn-based flows survive that limit. Open-ended companion chat does not, because the model reads every interjection as a barge-in. This week, decide which kind of flow your agent serves. If it is open-ended, narrow it to a structured flow. Do not patch the limit with longer silence thresholds.

The third rule inverts confirmation cost on purpose. Voice manufactures false confidence, so the warmer the interface, the cheaper approval feels. Go through your agent's actions and rank them by consequence. For the top few, make confirmation more deliberate: repeat the key detail back, and ask for a clear yes. Leave low-stakes actions light.

## Reuse the agent you already trust

The fourth rule says to wrap voice around your strongest existing agent and not rebuild one. Luke Harries at ElevenLabs puts it plainly in the chapter: "I've already got my agent. I spent loads of time doing the evals." Keep the tools, the evals, and the workflow logic. If the underlying system is weak, voice will expose that faster. So run your existing evals against the agent before you add the voice layer, and fix what fails.

The fifth rule asks you to give the system a way to say "I'm not sure" out loud. In voice the human watches it hesitate in real time. Write three spoken phrases for uncertainty: one to clarify, one to confirm, and one to hand off. Then check that an escalation path exists behind the third.

## A plan for the week

Monday, measure P95 and list slow tools. Tuesday, add acknowledgments. Wednesday, rank actions and tighten confirmations. Thursday, run existing evals on the core agent. Friday, write the uncertainty phrases and test the handoff.

The takeaway is one number and one habit. Know your voice-to-voice P95, and never leave the caller in silence while a slow step runs.

This post draws on Chapter 8 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
