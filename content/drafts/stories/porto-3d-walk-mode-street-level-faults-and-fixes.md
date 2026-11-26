title: Porto 3D walk mode: four street-level faults and the numbers behind each fix
slug: porto-3d-walk-mode-street-level-faults-and-fixes
excerpt: Walk mode came to the porto-3d map on 24 November 2026. In the next two days the progress log records a walk that froze, streets drawn as terraces, a hump of terrain on the Ribeira quay, and paving that disagreed with the ground. Here are the causes, the fixes, the counts, and what is still open.
category: Product engineering
category: Three.js
date: 2026-11-26T18:00:00.000Z

What breaks when you walk at eye height through a 3D city map built to be seen from above? This post is for developers who build Three.js maps on terrain and OpenStreetMap (OSM) data. It follows four faults in the [porto-3d](https://github.com/isatimur/porto-3d) progress log. Each comes with its measured cause, fix commit, counts and open ends.

## Where walk mode came from

porto-3d has 166 commits from 2 October to 26 November 2026. Walk mode arrived in [e2efaf7](https://github.com/isatimur/porto-3d/commit/e2efaf7) on 24 November, ported from braga-3d with a GLB walker and a `/play` page. [One engine, many cities](/blog/one-engine-many-cities) covers the shared engine.

## Fault 1: the walk froze every few seconds

The `hitch.mjs` probe on porto-3d.com found long tasks of 0.3 to 0.5 s every 4 to 5 s. A CPU profile put 80 % of that time in `readSurface` in `walk.js`. It re-read all 66 walkable meshes, about 1 M triangles, whenever the set of visible meshes changed.

The fix in [7a8a137](https://github.com/isatimur/porto-3d/commit/7a8a137) builds the new index as a generator, 3 ms per frame, while the old index stays in use. In two 40 s runs, long tasks over 200 ms fell from 6 and 6 on main to 0 and 1. Start, teleport and a walker near the edge of the old index still read in one go.

## Fault 2: sloped streets looked like terraces

At the Ponte Luís I lower deck, the road looked like flat plates at different heights. Two causes:

- `strip()` in `src/roads.js` drew one quad per 12 m segment, lengthened at both ends, flat at the end height. On a slope, one quad's end lay over the next quad's start, 0.1 to 0.3 m apart.
- At the bridge ends, each way gets its ramp from its own junction. Ways that overlap in plan stood 0.3 to 1.4 m apart.

The fix in [3030d20](https://github.com/isatimur/porto-3d/commit/3030d20) mitres the joint at bends up to 60 degrees. In `harmoniseRamps()`, where two ramps overlap in plan and stand less than 3 m apart, the lower takes the higher's lift. Stacked samples on Mouzinho da Silveira fell from 27 of 60 to 1 of 60.

## Fault 3: a hump of terrain on the Ribeira quay, then a start in the river

The owner reported "humps of terrain in front of the arcades" at Praça da Ribeira. The DEM, a 25 to 30 m source, smears the quay wall and the hill into one ramp, 10 to 13 m high at the house fronts. The real quay is about 4 to 5 m.

Commit [23df719](https://github.com/isatimur/porto-3d/commit/23df719) adds a quay terrace polygon at 4.6 m above sea level. Across the square, the ground went from 2.8–13.9 m to 3.9–4.8 m.

The entry's follow-up records a regression. The default `/play` start stood waist-deep in the river. The start lies 14 m river-ward of the OSM quay line.

"The terrace lifts the ground only to the quay line", so the ground under the deck is the river bed. The deck stood 3 m over it, more than the walker climbs (1.8 m), so it was a ceiling. The start check had passed with the walker in the river.

Commit [c05f740](https://github.com/isatimur/porto-3d/commit/c05f740) pins the deck to the terrace level. In `walk.js`, a quay deck is now a floor wherever it stands over the terrain. The start check now asks that the feet are on the top drawn surface.

## Fault 4: paving and ground disagreed in the old centre

Around the Luís I bridge foot, paving lay at odd angles on a raw hillside, and a bench and a parked car floated. One of five measured causes: "the drawn ground is a 12 m lattice: it cannot follow a 6 m street cut into a slope".

Commit [c51163b](https://github.com/isatimur/porto-3d/commit/c51163b) adds `src/street-ground.js`. It builds a 2 m raster from the street network over a 1.15 x 1.14 km district, drawn on a 3 m lattice. The log's metric script measured a smaller box around the bridge foot (41.1395-41.1440, -8.6160 to -8.6080, 1.5 m grid), not the whole district. The counts, main against branch:

- Drawn ground over the top paving by more than 0.15 m: 1,105 of 28,297 on main, 44 of 29,883 on the branch.
- Props more than 0.2 m off the top drawn surface: 209 of 592 on main, 5 of 611 on the branch.

At the `/play` start, triangles rose by about 6 %. `ready` went from 17.3 s to 18.7 s on a loaded machine. The log records `npm test` 91/91 and `npm run verify` OK, 17 passed.

## What the log lists as not fixed, and what later entries change

- A one-off shader compile when a new material first draws. porto-038 listed it on 25 November. On 26 November, porto-040 added idle-slot material precompiling for the map (`/`). The log does not record its effect in walk mode.
- The bridge-end ramps and the east embankment, which later entries partly close. porto-037 (25 November) listed the ramps at "6 to 9 m over the DEM on grass embankments", and porto-039 (26 November, before the street ground work) called the east embankment "still a dark grass wedge beside the bridge abutment". porto-041 no longer lists them and reports paving on a wall or embankment at 699 -> 113, "now granite walls, no grass embankments", in its metric box around the bridge foot (41.1395-41.1440, -8.6160 to -8.6080). The log does not record the effect on the east embankment itself.
- In porto-039, Largo Luiz I on the Gaia side "still stands 9 m over the DEM". The log does not record whether porto-041 changed it.
- The 44 remaining ground samples sit where OSM draws ways over each other 2 to 5 m apart.

## What is not measured

- Frame time on the owner's laptop. For the walk level of detail, the log says it "decides whether stage 1b or 2 is needed".
- GPU time, in part. GPU timer queries on the M1 Max were too noisy to report (porto-033). porto-041 gives one paired run: 59.8 ms on main, 59.1 ms on the branch.
- The street ground step on a throttled phone CPU: "Not measured apart". The perf soft gate missed 11 budgets at a load average of about 25.

*How this post was made: an AI agent drafted it from the project files listed in the repo, a second agent reviewed it, and Timur merged it.*
