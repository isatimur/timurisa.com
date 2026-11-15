title: A feature list agents cannot game
slug: a-feature-list-agents-cannot-game
excerpt: A JSON file with three rules and an evidence field. How my Porto repo tracks features, and where the file stopped following its own rules.
category: Spec-driven development
category: AI engineering
date: 2026-11-15T12:00:00.000Z

An agent that is asked "are you done?" will often say yes. The answer costs nothing. So I do not ask. I keep a file that says what done means, and I check the file.

In the Porto repository, that file is `feature_list.json`.

## The shape of an entry

Each feature has the same fields: an id, a priority, an area, a title, the user-visible behaviour, a status, a list of verification steps, a list of evidence, and a notes field.

Here is the first entry, trimmed. Its id is `porto-001`, its area is skeleton, and its title is "Engine fork, Porto config, shell, green build". Its user-visible behaviour is that the app runs for Porto and draws the terrain and city fabric. Its verification steps say to run the dev server, confirm that Porto is the default city and the terrain renders, and confirm that the build completes. Its evidence lists a commit, a passing `npm run verify` with the date, and a note that the config holds the core area and 70 landmark ids.

Notice the order. The behaviour comes first, in terms a user would see. Then the way to check it. Then the proof.

## Three rules at the top

The file opens with three rules, each a boolean: only one feature is active at a time, passing requires evidence, and verification must not be skipped.

There are four statuses. Not started means work has not begun. In progress means the feature is the current task, or only part of it has shipped. Blocked means a documented blocker stops the work. Passing means the required verification passed and the evidence is recorded.

The rule that matters most is the second one. A status of passing without evidence is not allowed. This is what makes the list hard to game. To flip a feature to passing, an agent must write down a command, a file, or a count that someone else can check.

## Where the file stopped following its rules

I read the file as I write this. It holds 31 features. 24 are passing and 7 are in progress.

The first rule says only one feature is active at a time. Seven are in progress.

The legend explains part of it. In progress also covers a feature where only part has shipped. But my clean-state checklist says exactly one feature should be in progress at the end of a session. The file and the checklist disagree.

There is a sharper mismatch. My session handoff from 5 October says two features, the quay walls and the building geometry detail levels, are not started. The feature list marks both as in progress. One of the two files is wrong, and nothing checks them against each other.

This is useful. The spec shows where the project drifted. Seven open items is a fact I can act on. The fix is either to split "partly shipped" into its own status, or to close the entries that are done. Both are small edits.

## Why a file and not a chat

My `AGENTS.md` tells agents to prefer durable repository artifacts over chat summaries. A chat message disappears when the session ends. The feature list is in version control. A new session can read it, and a reviewer can read the history.

The same logic keeps agents honest about scope. If a task is not in the list, it is a new feature, and it gets an entry before it gets code.

## Try it

Write three entries for a project you are working on. For each, write the behaviour a user would see, one check you could run, and what evidence would prove the check passed. If you struggle with the third part, the feature is not specified yet.

Next: [the definition of done is a command](/blog/the-definition-of-done-is-a-command).
