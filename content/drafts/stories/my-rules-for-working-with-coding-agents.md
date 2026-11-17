title: My rules for working with coding agents
slug: my-rules-for-working-with-coding-agents
excerpt: The rules in my own agent configuration, with the reason wherever my notes give one.
category: Engineering practice
category: AI engineering
date: 2026-11-15T22:00:00.000Z

I keep a global instructions file that every one of my agent sessions reads. A section of it is headed with the date of an opportunity scan on 28 September. Here are the rules in it. Where my notes give a reason, I give it too.

## Run sessions in short loops

One session per pull request. Start a fresh session after a merge, and do not resume a session older than a day. The review found five sessions that had run for weeks, at over one million tokens per turn. A long session is expensive, and its context fills with old details.

## Edit files with the right tool

File changes go through the edit and write tools, not through shell heredocs. The shell runs things. It does not write source files.

## Never sleep in a command

Do not use `sleep` inside a shell call. Wait with a purpose-built tool, a monitor with an until-loop, or a background run. A guard on my shell blocks sleep chains. Its message says polling with sleep burned 47 blocked calls and 27 loops in past sessions.

## Treat a denial as a decision

When the permission classifier blocks a command, do not issue it again. Give the exact command to the person to run themselves, and carry on with other work. A block is a decision, not an obstacle.

## Answer once, in the right language

Reply once, in the language of the last message. Do not repeat the answer in a second language.

## Stop on re-authorisation

When a tool server says it needs re-authorisation, stop and ask for the settings command. Do not retry.

## Look at what you made

View every generated image or asset before reporting it done.

## Read big files in windows

Never read a large file whole. Search for the symbol, then read a window. A guard blocks whole-file reads above 1,200 lines.

## Keep secrets out of reports

When a subagent finds a credential anywhere, it reports the fact and the location, never the value. A secret quoted in a subagent's report lands in the parent transcript, and no hook can remove it afterwards.

## Commit messages carry no AI attribution

My commit messages do not include co-author or attribution lines for the AI. That is a style choice about authorship on my own repositories.

## The orchestrator role

The same file describes how I run delegation. I act as the orchestrator: plan, decompose, delegate, and synthesise, and keep my own context lean. Reasoning-heavy work goes to a deep-reasoning agent. Mechanical work goes to a fast worker. For a fresh angle, I may ask a second engineering agent from another vendor. For high-stakes decisions, I may give the same problem to two agents without showing either the other's answer, then combine the best of both.

## Why write these down

A new session has no memory of the last one. The file is what it reads first. That is the same idea as the rest of this blog: a spec for the agent, written once, read every time. If you are new to it, start with [what spec-driven development means to me](/blog/what-spec-driven-development-means-to-me).
