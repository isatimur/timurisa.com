title: Elephant, goldfish, me: reviewing a spec with fresh eyes
slug: elephant-goldfish-model-fresh-eyes-for-specs
excerpt: The Elephant-Goldfish Model gives the author a full memory and the reviewers none. How the method works, and what a real run found in an onboarding guide.
category: Spec-driven development
category: AI engineering
date: 2026-11-18T10:00:00.000Z

The author of a document knows too much to review it. Every gap in the text fills itself from memory. The author reads what they meant, not what they wrote.

The Elephant-Goldfish Model, EGM, treats that as a design problem. It comes from Google's open-source [elephant-goldfish-model](https://github.com/google/elephant-goldfish-model) project. Its docs credit Dave Rensin's article "Elephants, Goldfish, and the New Golden Age of Software Engineering" as the base, and describe EGM as an implementation of spec-driven development. I have the plugin installed in Claude Code. This article covers the method and the one run I can report.

## Three roles

The README gives the split in one table.

The **Elephant** holds your project, your requirements, and your earlier decisions. It explores the problem and drafts the specification.

The **Goldfish** reviewers get the document and the source material it references. They do not get the earlier conversation. Their job is to find missing assumptions, unclear requirements, and implementation risks.

**You** resolve the trade-offs, approve the design, and decide what to build.

A goldfish forgets, and here that is the feature. A reviewer who has never heard your reasoning cannot fill the gaps with it.

## The skills

The plugin ships seven skills. Four of them make the core loop:

- `/egm-brainstorm` clarifies the idea with you, runs fresh reviewers against it, and saves a `concepts_brief.md`.
- `/egm-draft` turns the brief into a design document, one section at a time, and pauses after each section for your feedback.
- `/egm-review` sends the draft to fresh reviewers in a zero-context session.
- `/egm-drift-report` compares the documents in a folder with the current source code and reports where they diverge.

The docs also list `egm-bootstrap`, `egm-resolve`, and `egm-review-loop`. The loop skill lets you pick your own reviewers and standards for documents that are not software specs.

The reviewers are personas, each a separate file. The names include a hostile design critic, a naive reader with zero institutional knowledge, a pedantic checker of documentation against the code, a copy editor, a structural validator, a pragmatic tech lead who checks that a plan leaves no design decisions to the implementer, and a "zoom out" reviewer. A synthesizer merges and deduplicates what they find.

Two lines in the docs matter to me. The review gives "a lot of feedback by design", and you take what is relevant and ignore the rest. And a human review of the design still comes before implementation. EGM does not replace it.

## One real run

On 17 November I ran a review on an onboarding guide for a team codebase. The target was one Markdown file of 87 lines. The reviewers worked in stages, and a later stage merged and deduplicated the earlier findings into twelve items.

The final report sorted them like this:

- 11 proposed fixes, applied.
- 1 escalated to me.
- 0 contested, 0 declined.

Three of the findings show how the method works.

**A dead remote.** The guide sent iOS work to a repository that was a stale export with a foreign remote. It also named a clone that does not exist on disk. The report rated it a blocker, with the reason "a new engineer would commit to a dead remote". The Elephant, the session with the project context, checked the disk and the project's context files beyond what the reviewers read. The fix followed from those.

**A wrong claim in the text.** One section proposed an umbrella repository that "pins branches". Submodules pin commits. The same section was a speculative proposal that nobody had pushed. The fix was to delete it.

**Whose numbers.** One person's 30-day usage stats led the guide under a heading that said "team". The report said the stats tell a newcomer nothing they can act on.

The escalated item shows the third role. A repository was missing from the workspace list, and the reviewers could not tell if that was a mistake. It was my call to make, not theirs. I said the omission was deliberate, because that repository is locked down. The fact then went into the guide as a note.

The guide ended at 79 lines, down from 87.

One more detail from the report. Its first draft gave the new length as 70 lines. That number was wrong, and the report was corrected. A review that checks documents should be able to catch its own figures.

## Where it fits in my other spec work

My own checks in the city map repos test a build: the verify command, the fit checks, the evaluator rubric. EGM tests a document before anything is built. The two catch different mistakes. A verify gate cannot see a guide that points to a repository that does not exist. A document review cannot see a model that fails the fit check.

## What I have not measured

I have one run. I do not know how many of the twelve findings I would have found by reading the guide again myself. I also cannot say how much of the value came from the fresh reviewers, and how much from the session that held the context and checked the disk. I would need several runs, with a count of accepted findings each time, to say more.

Next: [an evaluator rubric for AI changes](/blog/an-evaluator-rubric-for-ai-changes).
