title: Cleaning 98 GB down to 21 GB, and the backup I chose not to make
slug: cleaning-98-gb-out-of-my-dev-folder
excerpt: An audit of my Dev folder removed 77 GB. The more useful part was a plan I did not run.
category: Engineering practice
category: Developer workflow
date: 2026-11-06T12:00:00.000Z

In August I audited my `~/Dev` folder. It held 98 GB across 139 entries. After the cleanup it held 21 GB across 94 entries.

Most of the 77 GB was caches that rebuild themselves: `node_modules`, build output, package caches. Nothing exciting. The interesting parts were the decisions.

## Scripts that start in dry-run mode

I wrote the cleanup as scripts: one to reclaim caches, one to remove redundant copies, one to back up risky repos, one to restructure. Each script does nothing by default. It prints what it would do. You pass a flag to make it act.

This habit costs a minute and prevents the worst mistakes.

## A tree I did not build

I had a proposal for eight top-level folders: one for my company, one for products, one for skills, one for clients, one for experiments, and so on. The restructure script was ready. A dry run showed 120 moves.

I looked at the plan and called it questionable. I skipped it.

One fact limits any tree: two of my folders cannot move at all, because their paths are written into my tool configuration. The script stays in the toolbox, dry-run clean, in case I change my mind.

The index lives in my notes, not in the repo. For each project it holds a name, a purpose, and a status. Where I no longer remember the purpose, the entry shows a dash. I fill the gap when I next touch the project. I do not guess.

## The backup I did not make

Some repos had history only on my machine. Some of them were work I did for an employer or for clients.

The first plan was simple: create private repositories on my personal GitHub account and push everything. It protects the history, and it is wrong. That code does not belong on a personal account. Moving it there is a policy decision, and the cleanup was not the place to make it.

I used `git bundle` instead. A bundle is a single file that holds a full repository history. It gives the same protection. Nothing is published anywhere.

An honest limit: the bundles sit on the same disk. That is not a real backup yet. A real one means a second location, and choosing it is still open. I would rather write that down than pretend the problem is solved.

## One small macOS lesson

macOS is case-insensitive by default. I had a repo called `Skills`. A new folder called `skills` would have collided with it. If your restructure moves things between names that differ only in case, check this first.

## Takeaways

Make destructive scripts dry-run by default. Treat a skipped plan as a result. Keep client and employer code out of personal accounts, and say so in the notes. Fill index gaps when you touch a project, not before.

A clean folder is nice. A folder whose rules you can explain is better.
