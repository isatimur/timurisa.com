---
slug: context-is-the-working-set
title: Context is the working set, not the knowledge base
excerpt: Chapter 5 says AI systems fail when they hand the model the wrong working set, not only when the model is weak. A stronger model makes bad context cost more.
categories: [AI engineering, Context engineering]
chapter: 5
---
A company can hold millions of documents and still show its AI the wrong three paragraphs. Chapter 5 of the book starts here. Useful AI systems do not fail only because the model is weak. They fail because the system cannot assemble the right working set of information at the right moment, in the right shape, at a cost the product can bear.

## Access is not context

The chapter says one confusion persists in AI product work: the belief that access to more information equals better context. It does not. A codebase may hold thousands of files. A legal system may hold a vast corpus of precedent. None of that guarantees the model sees the right few things for this task, in this turn, under this deadline.

The chapter names the usual sequence. The team says the system can reach the knowledge. The product disappoints. The team blames the model. Often the system simply handed the model the wrong working set: too much, too little, or the right ingredients in the wrong order.

So the chapter replaces one question with another. Do not ask what the model can access in principle. Ask what the model should be looking at right now to do this job well.

## A bigger window is not memory

The chapter cites Jack Morris on this point: stuffing context is not memory, updating weights is. Shoving more tokens into the window, the chapter says, is closer to panic than architecture.

The chapter also warns against using retrieval as a universal substitute for state, history, and durable understanding. Working memory, session history, and long-term memory are different layers. Each has its own update rules, its own freshness needs, and its own failure modes. Some things should stay out of the window until someone reintroduces them. Every carried-forward item costs tokens, competes for attention, and may quietly mislead the next step.

## Misassembly is not hallucination

Teams often call a bad answer a hallucination. Sometimes it is. Just as often, the chapter says, it is context misassembly. The remedy differs. Hallucination invites better model behavior. Misassembly invites better infrastructure.

## A stronger model raises the stakes

Some readers expect context work to fade as models improve. The chapter argues the opposite. A stronger model raises both the return on good context and the cost of bad context. It does more with the right evidence in front of it. It also generates more persuasive nonsense when the context is badly assembled. A better model is a reason to invest more in context, not less.

For that reason, the chapter puts context in the same bucket as harnesses, evals, runtimes, and security. These are engineered surroundings. They decide whether intelligence becomes useful. The chapter's image for the goal is a working binder. A strong professional does not walk into a meeting with every file the firm has ever touched. They bring the current notes, a few precedents, and a clear sense of what governs. A machine colleague does not need infinite information. It needs the right binder.

## Try this

Take the last answer your assistant got wrong. Write down every item the system put in front of the model for that turn. Then mark which items the answer needed, which items it did not, and which governing item never arrived. If the governing item never arrived, the model was not the problem. Fix the assembly first.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
