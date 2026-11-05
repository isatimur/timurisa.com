---
slug: context-is-the-working-set
title: Context is the working set, not the knowledge base
excerpt: The book argues that AI systems fail when they assemble the wrong working set, not only when the model is weak. Here is the idea in short.
categories: [AI engineering, Context engineering]
chapter: 5
---
Useful AI systems do not fail only because the model is weak. In Chapter 5 of my book I make a plain claim. They fail because the system cannot assemble the right working set of information at the right moment, in the right shape, at a cost the product can bear.

That claim moves context out of the prompt box. For a while, context looked like an input-field problem. You had a token limit and a collection of tricks for filling it. I argue that this framing gets the problem backwards. Context is the substrate that decides what the system can notice at all.

## Access is not context

Teams often treat access to more information as the same thing as better context. It is not. A company may hold millions of documents. A codebase may hold thousands of files. None of that guarantees the model sees the right few things for this task, in this turn.

So the unit I care about is the active working set. The question is what the model should look at right now to do this job well. It is a stricter question than what the model can reach in principle.

Kuba Rogut relays Jeff Dean on the sizing rule: you do not need a trillion tokens at once, you need the right million. The number worth instrumenting is how little of the index the answer needed.

Nupur Sharma's work at Qodo gives one mechanism. Models privilege the start and end of the window and degrade in the middle. A longer prompt does not buy more attention. It buys a wider blind spot. Her cue is concrete: when accuracy drops as you add retrieved documents, you are watching the middle get dropped. The fix is better assembly, such as summarization, graphs, and iterative retrieval. A bigger window does not fix it.

## Misassembly is not hallucination

Teams often call the failure hallucination. Sometimes it is. Just as often it is context misassembly. The distinction matters because the remedy changes. Hallucination invites better model behavior. Misassembly invites better infrastructure.

There is a second reason to take this seriously. A stronger model raises both the return on good context and the cost of bad context. It does more with the right evidence in front of it. It also produces more persuasive nonsense when the context is badly assembled. A better model is a reason to invest more in context, not less.

For that reason, Chapter 5 puts context in the same bucket as harnesses, evals, runtimes, and security. These are engineered surroundings. They decide whether intelligence becomes useful. A machine colleague does not need infinite information. It needs the right binder.

Here is the takeaway for your own system. The next time your assistant disappoints, do not reach for a new model first. Look at what it was shown. Log what the system retrieved and how little of it the answer used. If accuracy falls as you add documents, change how you assemble the set before you change anything else.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
