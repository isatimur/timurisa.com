---
slug: the-deduction-that-cited-the-wrong-source
title: The deduction that cited the wrong source
excerpt: A tax assistant at Hargrove ranked a public explainer above a senior attorney's matter note. The fix taught the team what context topology means.
categories: [AI engineering, Context engineering]
chapter: 5
---
In Chapter 5 of my book I follow a firm called Hargrove. Hargrove runs a tax practice. Its assistant began as a helpful chat surface. It summarizes documents, answers questions, and cites plausible authorities. Users like it. In the book I call this kind of system the High-Stakes Colleague: an assistant that works where evidence and provenance change the quality of the work.

After the novelty phase, users ask for something harder. They stop saying help me think. They say help me do the work.

## The request

A tax associate asks the assistant to trace the support for a deduction a client has claimed for years. The assistant answers fluently. It cites a clean-looking authority, a public explainer whose wording matches the query almost perfectly. The answer reads as decisive.

It is also wrong for this client. The governing position lives in a matter note that a senior attorney wrote earlier, in a different file, under a jurisdiction the explainer never mentions. The system ranked the explainer first because nothing told it that a public article and a matter-specific note are different kinds of evidence.

I want to stay with this failure, because it is easy to misread. The model did not lack knowledge. It did not invent a source. The explainer was real. The system simply treated all text as interchangeable and ranked by closeness to the query. In the book I note that simplistic retrieval systems flatten everything into one searchable pile and act as if the only problem were semantic similarity.

## The remedy

The remedy was not a smarter model. The team typed its knowledge topology into the system. In practice that meant three changes. Source typing ranks internal precedent above public background. Access boundaries apply per matter. The retrieval surface carries provenance, so the associate can see which layer an answer came from.

Context topology is my name for this idea. Different kinds of information should not be treated as interchangeable text. A draft contract is not signed language. An old Slack discussion is not a policy. A matter note from a senior attorney is not a general explainer from a public source. What matters is what kind of thing a document is, how trustworthy it is, how recent it is, and whether the task needs literal quotation or background.

Chau Tran's Glean work makes the same point operational. Much of it is filtering on signals the corpus already carries: the user's permission scope, the freshness of the source, and the document's role in the organization. That filtering runs before the reranker, so material the task should never see never reaches the window. Without it, ranking on raw embedding similarity will happily surface a deprecated wiki page that reads almost exactly like the current one.

The chapter says that in high-stakes work, a system that is 90 percent right for unclear reasons can still be professionally unusable. The associate needs to know why an answer is right. Provenance gives that.

Here is the lesson to carry away. List the kinds of documents your assistant can retrieve. For each pair, ask whether one should outrank the other. If the answer is yes, write that rule into the system, and show the source type next to every citation. At Hargrove, the misranked matter note became the scar the rest of the build-out was designed around. You can learn the same lesson from a list, before a client pays for it.

This post draws on Chapter 5 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
