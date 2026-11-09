---
slug: five-repo-changes-for-agent-ready-code
title: Five repo changes that make agents useful this week
excerpt: A practical plan from Chapter 3. Five steps a team can start this week to turn a repository into a place where a coding agent can work.
categories: [AI engineering, Harness engineering]
chapter: 3
---
Clone your repo into a clean container. Time how long an agent takes to reach a green test run. That one test, from Chapter 3, shows how much of your setup lives only in people's heads.

The chapter says production software starts with the environment, not the model. The environment is the harness: repository, specs, validations, and workflow. Its checklist gives five steps a team can start this week.

## Test the repo and fix the spec

First, run the fresh-container test. Every step that lives in someone's shell history is a hole. The agent will fill that hole by guessing. Write the step into a setup script. Run the test again until the agent gets there without help.

Second, watch for repeated hand-patching. If you keep fixing the same kind of mistake in the output, stop fixing the output. Al Harris says: "The spec then becomes the natural language representation of your system." Treat it that way. Find the line in the spec that under-specified the work, change it, and regenerate. Repeated correction signals that intent belongs in a persistent artifact the next run will read. Ask one question: would the intent survive a fresh agent picking up the task cold? If not, it does not belong only in the prompt.

Third, size the spec to the cost of being wrong. Not every ticket needs a design doc. Over-specification can turn exploration into bureaucracy. Save the ceremony for work that is large, parallelized, safety-sensitive, or expensive to review. Let everything else move fast.

## Hold back the fan-out

Fourth, do not run many agents until one agent succeeds alone, nearly every time. Eno Reyes is explicit on this point. You cannot fan out parallel agents until single-task execution succeeds nearly 100 percent of the time. If you cannot tell automatically whether one change is safe, running twenty only multiplies unverified output. The validation you have sets the ceiling on how much you can delegate.

Reyes sets the bar low on purpose: "a slop test is better than no test." A rough check is a start. Once it exists, the next agent follows it, and the rules ratchet tighter. You can even ask a coding agent to find where your linters are not opinionated enough, then have it write the missing rule.

## Audit the list and fix the first gap

Fifth, audit your repo against the agent-readiness list in the chapter. Check for these items:

- A stable folder structure.
- Explicit setup, build, and run commands.
- Type, lint, and test gates the agent can run repeatedly.
- Architecture decisions stored in files.
- Examples of accepted patterns for tests, APIs, migrations, and reviews.
- Specs close enough to the work to survive handoff.
- Narrow scripts for common operations.

Then fix the first item that is missing. Do not fix the easiest one. The chapter says each skipped item is a place where the agent will guess. The first gap you find is the first place a guess will hurt you.

None of this is glamorous. That is exactly why it matters. The chapter says the biggest gains in coding agents often come from removing avoidable ambiguity in the repository, not from clever prompting. Reyes puts a number on it: this is where "the real like 5x, 6x, 7x comes from," and "it's a choice that you as an organization have."

Start the fresh-container test on Monday. By Friday you will know which of your team's standards sit in files and which sit in heads.

This post draws on Chapter 3 of [From Copilot to Colleague](https://fromcopilottocolleague.com/).
