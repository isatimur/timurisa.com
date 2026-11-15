title: Five city maps in seven weeks: what the git log says about my pace
slug: five-city-maps-in-seven-weeks
excerpt: Five real-scale 3D city maps, 453 commits, 48 days. The numbers, the bursts and pauses behind them, and why commit counts overstate what one person does.
category: Product engineering
category: AI engineering
date: 2026-11-15T21:00:00.000Z

How fast do I move? I would rather answer with data than a feeling, so I counted.

## The numbers

I build real-scale 3D maps of Portuguese cities. Five repositories share one engine. The first commit was on 28 September, in the Braga repository. The most recent was on 14 November. That is 48 days, about seven weeks.

Across the five repositories there are 453 commits. By repository, Braga has 60, Guimarães 40, Barcelos 51, Porto 112, and the fifth city 190.

By 10 October, four of them were live with 134 places in total: Braga 30, Guimarães 18, Barcelos 16, and Porto 70. Porto is the flagship, with real streets, a coastline from OpenStreetMap, and models of all its landmarks. A fifth city followed in late October.

## Bursts and pauses

Commits did not arrive evenly. Counting by calendar week, the weeks of 28 September and 5 October brought 98 and 139 commits. The next two weeks brought 5 and 1. Then 136, 66, and 8 in the last, partial week.

Only 26 of the 48 days have any commit at all. The busiest day, 30 October, has 95 commits.

The gap in the middle is real. Work paused for about two weeks after the second week and resumed in late October. My notes record that agent rounds can die when usage limits hit, and that my 10 October stop was written as a handoff for that reason. They do not say why the gap lasted two weeks. The pace is not a smooth line. It is a series of sprints and stops.

## What a commit count hides

I want to be careful here. Commits are a poor measure of progress.

First, agents wrote most of the code. I direct the work, define the checks, and decide what ships. My agents type. A commit count measures the output of a team of agents, and I am the lead of that team. It says little about how much one person writes.

Second, commits vary in size. A commit that fixes one typo counts the same as one that adds a coastline. And agents commit often, so a busy day can inflate the count.

Third, the numbers do not measure quality. The same repositories contain a failed soak test, a branch that nearly shipped by mistake, and features that are only half done. I have written about those too.

## What I would call speed

If I have to choose one number, I would not pick commits. I would pick this: five working maps, each with its own live site and its own checks, in seven weeks, by one person directing agents.

What made it possible was not typing speed. It was the structure around the agents: a shared engine, a repository per city, a verify command, a feature list, and handoff notes that let a stopped session resume. I describe those files in my series on spec-driven development, which starts with [what spec-driven development means to me](/blog/what-spec-driven-development-means-to-me).

## Where it is slow

Some things do not speed up. Real-device testing is still on my list. Language editions made by machine translation need a native reader. A few decisions, such as licences for generated art, are mine alone, and they wait for me.

Pace is a property of the whole system. The agents are fast. The checks, the decisions, and the review set the speed of the loop.
