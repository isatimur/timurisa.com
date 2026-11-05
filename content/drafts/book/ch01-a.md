---
slug: ai-engineering-starts-with-delegation
title: AI engineering starts when answers become delegated work
excerpt: Chapter 1 argues the hard problem in AI is no longer better answers. It is trusting a system that comes back with work done.
categories: [AI engineering, Delegation]
chapter: 1
---
For a while, the most impressive thing AI could do was answer. It answered faster than search and more fluently than documentation. That changed user expectations and product design. It did not yet change the nature of work.

The change begins when we ask the system to return with work done. Research this market and come back with a memo. Refactor this service, run the checks, and prepare the patch for review. In Chapter 1 I argue that this is a different standard, and that most of AI engineering follows from it.

## A different kind of failure

A helpful answer can be wrong and still be useful. Delegated work costs more. It consumes time, touches systems, and shapes decisions. It also hides its mistakes inside output that looks plausible enough to pass a casual glance.

I wrote that the primary failure surface is not the work that looks broken. It is the work that looks finished. A test claimed to pass, a source claimed to be checked, a step claimed to be done: the same shape of failure appears wherever an agent reports on its own success. So the question moves from "is the answer good?" to "can we verify the work by something other than the system's own account of itself?"

## Three roles and one test

The book separates three kinds of system. An assistant suggests. A copilot collaborates inside a tight human loop. A delegate is given a unit of work and is expected to come back with an artifact, a recommendation, or a completed step. The labels matter less than where the human sits. With an assistant, nothing takes effect until you read it. With a delegate, you step out of the moment-to-moment loop and back in at review.

I offer one quick test. Ask what happens if no human looks at the output for the next 24 hours. An assistant's suggestion goes stale, which is harmless. A delegate's output has usually already changed something: a pull request opened, a record updated, a deadline running that someone else now inherits. If your system fails that test the delegate way, you are past the assistant stage, whatever the product page says.

## Trust under action

Joel Hron puts the shift cleanly: the north star has moved "from helpfulness to productive." Once a system acts for users, prompt cleverness stops being the central problem. Trust under action takes its place.

That is why I define AI engineering as the discipline of turning raw model capability into delegated work that can be structured, measured, supervised, and trusted. Prompting, retrieval, evals, workflow engines, guardrails, observability, and approval systems often look like separate subcultures. In the book they are pieces of one discipline. Each answers the same question: what must surround intelligence before it is safe to delegate work to it?

The chapter also takes a position on autonomy. The goal is not maximum agency in every direction. In many valuable systems the right design is adjustable autonomy. Let the machine move fast where the risk is low and the checks are strong. Slow it down where consequences are harder to reverse.

Here is the takeaway to try this week. Pick one AI feature your team runs or plans to ship and apply the 24-hour test. Write down what changes in the world if nobody reads its output for a day. If the answer is "something," treat the feature as a delegate. That means giving it the structure, measurement, and review points you would give any colleague whose work others will rely on.

This post draws on Chapter 1 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
