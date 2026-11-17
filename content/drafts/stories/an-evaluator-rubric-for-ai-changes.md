title: An evaluator rubric for AI changes
slug: an-evaluator-rubric-for-ai-changes
excerpt: Nine questions, scored 0 to 2, with three of them able to block a change on their own. The rubric I keep in my Porto repo.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T14:00:00.000Z

A passing build tells you the code runs. It does not tell you the change is good. For that my repository holds a short rubric. Its first line says to use it after implementation and before final acceptance.

## Nine categories

Each category is a question. The answer is a score from 0 to 2.

The first is the verify gate: did the full verify command run and end green, with the smoke test passing and not skipped? The second is the 1:1 fit: do the fit checks pass, and does every landmark still have its own hand-written builder? The third is the triangle budget.

The fourth is languages: do Russian, English, and Portuguese cover every new landmark, route, story chapter, and interface string? The fifth is data provenance: does every changed dimension entry carry sources with a fact and reasoning, and a confidence value? Was generated data rebuilt by the pipeline and not edited by hand?

The sixth is performance: does the change stay inside the load-time and frame-rate budget, and does the adaptive governor still step down on a slow device? The seventh is leftovers: does the change add no ids, coordinates, or text from Braga, the first city, outside inherited engine comments? The eighth is the web surface: do the sitemap, the landmark pages, and the share images stay in step with the landmark data, and do the API routes still answer? The ninth is scope and handoff: did the session stay inside the chosen feature, and do the state files hold true evidence?

## What a score means

A 0 means the item is missing, failing, or has no evidence. A 1 means it is partly met, or met without recorded evidence. A 2 means it is fully met, with evidence in the repository: command output, a file path, or a count.

That last clause is the important one. A score of 2 needs proof that a reviewer can find. The rubric rewards written evidence as much as correct work.

The maximum is 18.

## Three questions can block alone

The verdict has three levels. Accept needs 16 or more, with no zero in the verify gate, the 1:1 fit, or the triangle budget. Revise covers 10 to 15, or any zero outside those three. Block means below 10, or a zero in one of the three.

Those three guard the project's core promise: real scale and a working build. A change can be excellent everywhere else and still be unacceptable if it breaks them.

The rubric ends with three blanks to fill in: missing evidence, required fixes, and the next review trigger. A review that finds problems must say what to do next.

## Why a rubric and not a feeling

A rubric moves the question from "does this sound finished?" to "can you show me?" It also makes reviews comparable. Two changes reviewed a month apart get the same nine questions.

My notes from the research for my book point the same way. Specs create eval seeds: the best evals often start as well-framed task definitions. This rubric is a small case of that. The questions came from the project's own rules.

## What I have not measured

The rubric is a template in the repository. I have not recorded how often each category catches a problem, so I cannot tell you which question earns its place. If I tracked scores over several weeks, I would learn which rows to sharpen and which to drop.

Next: [a handoff note that fits on one screen](/blog/a-handoff-note-that-fits-on-one-screen).
