title: One engine, many cities: what I learned scaling a 3D map
slug: one-engine-many-cities
excerpt: Braga became four city maps on one engine. Notes on forks versus monorepos, performance work, and keeping long agent runs recoverable.
category: Product engineering
category: Three.js
date: 2026-11-06T10:00:00.000Z

After Braga, I wanted more cities. I now have four real-scale maps that share one engine: Braga, Guimarães, Barcelos, and Porto. Porto is the flagship, with 70 places, at porto-3d.com. A fifth city is in progress.

Adding a city sounds like copying a folder. It is not. This post covers the decisions that mattered.

## A repo per city, not a monorepo

On 30 September I had to choose. One monorepo with all cities, or one repo per city.

I chose one repo per city. Each is a template fork of `braga-3d`, named `<city>-3d`. A city has its own folder, its own deploy, and its own history.

The price is clear. A fix in the engine must be ported by hand to each fork. I felt this later, when I fixed a flicker bug and had to carry the fix to four repos. The benefit is also clear. A mess in one city cannot break another city's deploy.

Each city is driven by a config file. A command runs the geodata pipeline for that city. Per-city models and texts live next to the shared engine. The engine does not need to know which city it runs.

## Performance is a feature

On 10 October I spent a full day on Porto's speed. The draw calls dropped from 499 to 281. That is the difference between a map that stutters on a phone and one that does not.

The same round fixed a seam in the water, added a lite button on the loader for slow devices, and added roof art and 18 story illustrations. Streams that run in culverts no longer cut through streets. Six bridges over the Douro now land on raised pads instead of floating above the river bank.

One bug taught me a lesson about invisible geometry. A black square flickered on screen in one city. The cause was triangles with zero area. They draw nothing, but they confuse the renderer. The fix was small. Finding the cause was not.

I compared Braga and Porto on eleven axes. Porto led on eight. Braga led on three, among them live weather by default and the variety of its crowds. A comparison like this keeps me honest about what to port next.

## Honesty about invented data

Some of my data is a guess. OpenStreetMap does not know how many storeys every building has. For buildings without that tag, my code uses a heuristic. The heuristic is invented. I decided to ship it and to record that it is a guess.

The same goes for translations. New language editions come from machine translation. They need a native speaker's review before I call them finished. I keep a status file so I do not forget.

Maps carry trust. I want to be clear about where the data is measured and where it is estimated.

## Long runs need a recovery path

I build much of this with parallel AI subagents. They work in rounds. A round can die when a usage limit hits. This happened to me three times in two days, on 28 and 29 September.

So the handoff file matters as much as the code. It says what shipped, which commit is deployed, what is half done, and what is open. When I resume, I check the git status, finish or stash the cut-off edits, run `npm run verify`, and deploy once.

I commit before every big round. I snapshot before every big round. The cost is a few seconds. The benefit is that no agent can lose a day of work.

## What is still open

The engine port to Barcelos and Guimarães is not done. Guimarães is the risky one, because its roads, water, and main files conflict with the new engine. Some art is not wired in yet. The Discover tab is missing in some cities. I would rather list these than hide them.

One engine, many cities works. It works because each piece has an owner, each rule has a check, and each run leaves a note for the next one.
