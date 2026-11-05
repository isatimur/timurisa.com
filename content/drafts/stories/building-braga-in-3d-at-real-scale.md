title: Building Braga in 3D at real scale
slug: building-braga-in-3d-at-real-scale
excerpt: How I built an interactive map of Braga where every building sits on its real footprint, and the rule that kept it honest.
category: Product engineering
category: Three.js
date: 2026-11-06T09:00:00.000Z

I love Braga, a city in northern Portugal. I wanted a 3D map of it that felt like the real city. Not a toy. Not a diorama. A map where a church tower has the height of the church tower, and a street has the width of the street.

The project is a Three.js app built with Vite and plain JavaScript. The interface speaks Russian, English, and Portuguese. It runs at braga-3d.com. This is the story of how it got built, and what I learned about data on the way.

## One rule: real scale only

Early on, the map had a diorama mode. It showed the city as a small, friendly model. It looked nice. It was also a lie, because the proportions bent to make things look good.

On 28 September I removed it. Real scale became the only mode. Models are authored one to one, in metres, on top of OpenStreetMap footprints.

A rule that you only believe is not a rule. So I wrote a check. The `check-fit` script fails if any model covers less than 97% of its OpenStreetMap extent, or falls short of its real height. If I draw a landmark too small, the build tells me.

I run other checks as well: `check-data`, `check-geo`, `check-dimensions`, and `count-tris`. Together they catch the quiet mistakes. A building that drifts by a few metres still looks fine to the eye. The checks do not look with eyes.

## Where the data comes from

The ground is EU-DEM terrain. The city is about 17,000 buildings from OpenStreetMap. Walking routes come from OSRM. The pipeline lives in `scripts/fetch-*.mjs` and writes to `data/*.json`.

Three details cost me time. I list them so they cost you less.

First, the public Overpass servers are busy. The mirror that worked for me was maps.mail.ru.

Second, the main OSRM demo server ignores the foot profile. You ask for a walking route and get a driving route. The server at routing.openstreetmap.de does the job properly.

Third, panoramas. I wanted 360 views of the main sites. Wikimedia Commons has no equirectangular panoramas of Braga. The fallback is YouTube 360 video, and it covers 6 of my 16 sites. Detecting a 360 video needs a full Chrome user agent. The rule that works: the video metadata must show MESH or EQUIRECTANGULAR.

## Working with agents

I built the first version on 28 September with a team of AI subagents. I did not let them all touch everything. I split the work by file ownership.

One group owned models, fit checks, and landmarks. One owned the scene, effects, and interface. One owned the data folder. Nobody edited a file that belonged to another group. This removed most of the merge trouble before it started.

Two habits saved me. Before each big round, I commit a work-in-progress checkpoint and make a snapshot tarball. Agent rounds sometimes stop halfway when usage limits hit. A checkpoint turns a mess into a clean restart.

I also keep one dev server on port 5173 and take screenshots with Playwright. The screenshots run on a software renderer, so they work on any machine.

## What I would tell my past self

Pick the hard constraint first. "Real scale" sounded like a detail. It became the architecture. Everything else followed from it: the footprints, the terrain, the checks, the way the models are authored.

Write the check at the same time as the rule. A rule without a check decays.

And keep the notes about the odd data sources. Next month I will not remember which mirror works. The note will.

Braga was the first city. It would not be the last.
