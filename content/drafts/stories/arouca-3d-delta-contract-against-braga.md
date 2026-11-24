title: What a delta contract shows about the Arouca 3D map and the Braga engine
slug: arouca-3d-delta-contract-against-braga
excerpt: The Arouca 3D map was forked from porto-3d, took its Layers panel from braga-3d, and only then got a written comparison against Braga. Here is the timeline, what the comparison records, and what it leaves open.
category: Product engineering
category: 3D maps
date: 2026-11-24T19:00:00.000Z

When a 3D map is forked from one engine and later takes code from another, how do you know what it still shares with the engine it borrowed from? This post is for developers who keep several forks of one engine. It follows [arouca-3d](https://github.com/isatimur/arouca-3d), an interactive 3D map of Arouca, Portugal. The repo's delta contract against braga-3d gives the answer: 15 files are identical to Braga, 88 shared files differ, and 62 files exist only in Braga.

The first commit forks porto-3d at `4996c26`, and the contract warns that "a large part of the 'changed' list below is engine lineage drift".

The facts come from the repo's `README.md`, `claude-progress.md`, `EGM.md` and git log, and the braga-3d git log.

## The timeline: fork, port, then contract

The repo has 204 commits, from 2026-10-26 to 2026-11-22.

- **2026-10-26.** [b2febfb](https://github.com/isatimur/arouca-3d/commit/b2febfb): "W0 skeleton, fork of porto-3d 4996c26 with Arouca config and 20 seed places".
- **2026-11-18.** [c1bc8bc](https://github.com/isatimur/arouca-3d/commit/c1bc8bc): "Layers: definitions, manifest and status logic with tests (ported from braga-3d)".
- **2026-11-19.** [dda1978](https://github.com/isatimur/arouca-3d/commit/dda1978) merges the branch: "Layers panel, loading status and Retry; phones start on Compact".
- **2026-11-22.** [293f034](https://github.com/isatimur/arouca-3d/commit/293f034): "docs: add EGM delta contract against braga-3d 431ff94".

## What the Layers port from braga-3d brought

The progress log lists six files ported from braga-3d: `src/layer-defs.js`, `src/layers.js`, `src/layers-ui.js`, `src/load-status.js`, `scripts/layers-manifest.mjs` and `scripts/layers.test.mjs`. The port also added engine hooks in `tiles.js`, `buildings-ms.js` and `life.js`.

Arouca has three optional layers: the ring tiles around the centre (up to 464 KB), extra buildings (up to 365 KB) and aircraft (14 KB plus live data). The panel offers Light, Compact and Full. Compact is the extra buildings only.

On 2026-11-18 the owner decided that phones of class S and P start on Compact, not on Light. The lite scene (class P) builds no ring, no extra buildings and no life. So class P gets no panel and no status pill.

## The checks, and three faults in the first draft

The progress log summarises the checks on 2026-11-19, on Node 22, as:

- `npm test`: 30/30 (was 6/6).
- `npm run verify`: OK, 12 passed.
- `check-layers`: five runs in a row, 41 of 41 at 1440x900 and 42 of 42 at 360x740.

No file shows the terminal output of these runs.

The progress log lists three faults in the first draft of the check and marks them "fixed". No file says whether the fixes came before the five runs. The first draft demanded trail ribbons on a device class that builds none. It read the Retry button one round trip too late, when the pill had gone back to loading. It failed a 43.99 px box against a 44 px limit.

## What the delta contract records

`EGM.md` compares the fork at `dda1978` with braga-3d at `431ff94`. It puts the files in four groups:

- 89 files exist only in the fork.
- 88 shared files differ.
- 62 files exist only in Braga.
- 15 files are identical to Braga.

Two of the six ported Layers files, `src/layers.js` and `src/load-status.js`, are in the identical group. The other four differ. `src/layer-defs.js` differs by 74 lines, and the contract lists it as a file "where Braga is clearly ahead".

The contract's overview calls the repo "a single-city fork of the Braga 3D engine". Ten lines later it says: "The fork was not cut from Braga. It was cut from porto-3d at `4996c26`." Porto names remain in the fork, for example the storage keys `porto-fx` and `porto-time`.

For Braga's several city maps on one engine, see [One engine, many cities](/blog/one-engine-many-cities).

## What the contract leaves open

The contract names these limits:

- In the table of changed files, 70 rows say "Not read": a line count with no inspection of the diff.
- "Which side is newer for a given shared file is not determined, except where Braga has files the fork lacks."
- For the 62 Braga-only files, "Whether the fork needs each one is not determined." They include walk, game and quest modes, discovery, events and news. They also include 31 files the contract calls landmark models, plus `index.guimaraes.js`. The contract calls these "Braga content".
- `AGENTS.md` "still says 'W0 skeleton'; it is stale against the git log."

The progress log lists what the Layers work did not test:

- No one measured load time on a throttled phone.
- No one ran a negative control for the ring-off step.
- No one checked physical phones, Safari or Firefox.

The log also notes one bug it did not fix. On a phone with every layer on, the loading pill covers the start marker of an open trail while the area loads.

## What is not measured

- No file shows a load time for the Layers panel or the Compact preset on a real phone.
- The changed-files table has 87 rows. The contract text says 88 shared files differ. No file explains the difference.
- The contract counts "31 files" of landmark models but names 30 landmarks. Its Braga-only groups add up to 63 files with 31 models, and to 62 with the 30 names it lists.
- No file compares the fork with porto-3d after `4996c26`.
- No file shows that the fork was re-compared with braga-3d after 2026-11-22. Braga had more commits after `431ff94`.

*How this post was made: an AI agent drafted it from the sources listed above, a second agent reviewed it, and Timur merged it.*
