# Sources: arouca-3d-delta-contract-against-braga

## Opening paragraph

- The delta contract against braga-3d: 15 files identical to Braga, 88 shared files differ, 62 files exist only in Braga.
  Source: ~/Dev/arouca-3d/EGM.md
- The first commit forks porto-3d at `4996c26` (b2febfb: "fork of porto-3d 4996c26"); the contract says "a large part of the 'changed' list below is engine lineage drift". The post does not name who cut the fork; no source says.
  Source: factory/evidence/arouca-3d.txt, ~/Dev/arouca-3d/EGM.md, ~/Dev/arouca-3d/README.md

## Source list sentence

- The facts come from the arouca-3d `README.md`, `claude-progress.md`, `EGM.md` and git log, and the braga-3d git log.
  Source: ~/Dev/arouca-3d/README.md, ~/Dev/arouca-3d/claude-progress.md, ~/Dev/arouca-3d/EGM.md, factory/evidence/arouca-3d.txt, factory/evidence/braga-3d.txt

## Repo and timeline

- arouca-3d is at https://github.com/isatimur/arouca-3d.
  Source: factory/evidence/arouca-3d.txt
- arouca-3d is an interactive 3D map of Arouca, Portugal.
  Source: ~/Dev/arouca-3d/README.md
- The repo has 204 commits, first 2026-10-26, last 2026-11-22; 112 in 2026-10 and 92 in 2026-11.
  Source: factory/evidence/arouca-3d.txt
- b2febfb (2026-10-26) "arouca-3d: W0 skeleton, fork of porto-3d 4996c26 with Arouca config and 20 seed places".
  Source: factory/evidence/arouca-3d.txt
- c1bc8bc (2026-11-18) "Layers: definitions, manifest and status logic with tests (ported from braga-3d)".
  Source: factory/evidence/arouca-3d.txt
- dda1978 (2026-11-19) "Merge feat/layers-and-loading: Layers panel, loading status and Retry; phones start on Compact".
  Source: factory/evidence/arouca-3d.txt
- 293f034 (2026-11-22) "docs: add EGM delta contract against braga-3d 431ff94".
  Source: factory/evidence/arouca-3d.txt
- The port started 23 days after the fork (2026-10-26 to 2026-11-18); the contract came three days after the merge (2026-11-19 to 2026-11-22). Day counts computed from the dates above.
  Source: factory/evidence/arouca-3d.txt

## The Layers port

- Six files ported from braga-3d: `src/layer-defs.js`, `src/layers.js`, `src/layers-ui.js`, `src/load-status.js`, `scripts/layers-manifest.mjs`, `scripts/layers.test.mjs`; engine hooks in `tiles.js`, `buildings-ms.js`, `life.js`; `scripts/check-layers.mjs` "is written for this engine".
  Source: ~/Dev/arouca-3d/claude-progress.md
- Layers: ring tiles up to 464 KB, extra buildings up to 365 KB, aircraft 14 KB plus live data; no street-level or photo-texture layer; panel offers Light, Compact and Full; Compact is the extra buildings only.
  Source: ~/Dev/arouca-3d/claude-progress.md
- Owner decision 2026-11-18: phones of class S and P start on Compact, not on Light. Lite scene (class P) builds no ring, no extra buildings, no life, so it gets no panel and no pill.
  Source: ~/Dev/arouca-3d/claude-progress.md

## Checks and faults

- 2026-11-19, Node 22: `npm test` 30/30 (was 6/6); `npm run verify` OK, 12 passed; check-layers five runs in a row, 41 of 41 at 1440x900, 42 of 42 at 360x740. The post gives these as a bullet list summarising a prose sentence in the progress log, not as captured terminal output.
  Source: ~/Dev/arouca-3d/claude-progress.md
- No file shows the terminal output of these runs.
  Source: ~/Dev/arouca-3d/claude-progress.md (results appear only as a prose summary)
- Three faults in the first draft of the check, marked "fixed": trail ribbons demanded on a class that builds none; Retry read one round trip after the failed state; a 43.99 px box failed against 44 px.
  Source: ~/Dev/arouca-3d/claude-progress.md (line 109: "Three faults in the first draft of the check, fixed")
- No file says whether the fixes came before or after the five passing runs.
  Source: ~/Dev/arouca-3d/claude-progress.md (line 109 gives no order)

## The delta contract

- Compares fork HEAD `dda1978` with braga-3d at `431ff94`, dated 2026-11-22.
  Source: ~/Dev/arouca-3d/EGM.md
- 89 fork-only files; 88 shared files differ; 62 Braga-only files; 15 identical files.
  Source: ~/Dev/arouca-3d/EGM.md
- `src/layers.js` and `src/load-status.js` are in the identical list; `src/layer-defs.js` (74 lines), `src/layers-ui.js` (51), `scripts/layers-manifest.mjs` (14), `scripts/layers.test.mjs` (73) differ.
  Source: ~/Dev/arouca-3d/EGM.md
- `src/layer-defs.js` is listed under "Shared files where Braga is clearly ahead".
  Source: ~/Dev/arouca-3d/EGM.md
- Overview: "a single-city fork of the Braga 3D engine"; then "The fork was not cut from Braga. It was cut from porto-3d at `4996c26`"; and "a large part of the 'changed' list below is engine lineage drift".
  Source: ~/Dev/arouca-3d/EGM.md
- "Ten lines later": the "single-city fork" phrase is in the Overview paragraph on line 5; "The fork was not cut from Braga" is on line 15. No file calls line 15 a correction.
  Source: ~/Dev/arouca-3d/EGM.md
- Storage keys `porto-fx` and `porto-time` remain in the fork.
  Source: ~/Dev/arouca-3d/EGM.md
- The post drops the console prefix `[porto]` from the example list. EGM.md says the prefix remains, but commit bbb6dbe (2026-10-30) is titled "Log prefix: [porto] becomes [arouca]". No file resolves the conflict.
  Source: ~/Dev/arouca-3d/EGM.md, factory/evidence/arouca-3d.txt

## Limits named in the sources

- 70 rows of the changed-files table say "Not read" (counted by grep on rows matching `| <file> | <n> | Not read`).
  Source: ~/Dev/arouca-3d/EGM.md
- "Which side is newer for a given shared file is not determined, except where Braga has files the fork lacks."
  Source: ~/Dev/arouca-3d/EGM.md
- For the 62 Braga-only files: "Whether the fork needs each one is not determined." (line 158)
  Source: ~/Dev/arouca-3d/EGM.md
- The Braga-only list includes walk, game and quest modes, discovery, events and news (lines 160-165). It also lists spatial cells, route pages, placeholder data and Braga-specific content (lines 166-169).
  Source: ~/Dev/arouca-3d/EGM.md
- The Braga-only list includes 31 files the contract calls landmark models ("31 files in `src/models/`, one per landmark"), plus `index.guimaraes.js`; the contract says "These are Braga content" (line 170).
  Source: ~/Dev/arouca-3d/EGM.md
- `AGENTS.md` "still says 'W0 skeleton'; it is stale against the git log."
  Source: ~/Dev/arouca-3d/EGM.md
- README status line: "early skeleton (wave W0)".
  Source: ~/Dev/arouca-3d/README.md
- Not done (the post gives these as a three-item list): no load measurement on a throttled phone; no negative control run for ring-off; physical phones, Safari, Firefox not checked.
  Source: ~/Dev/arouca-3d/claude-progress.md
- Listed under "Noticed, not fixed" (a known open bug, not an untested item): the loading pill covers the start marker of an open trail on a phone with every layer on, while the area loads.
  Source: ~/Dev/arouca-3d/claude-progress.md (line 111)

## Footer

- "an AI agent drafted it from the sources listed above": the sources are listed in the post's source sentence and in this sidecar.

## Links

- /blog/one-engine-many-cities exists; its excerpt says Braga became four city maps on one engine.
  Source: content/posts/archive.json

## Not measured

- No file shows a load time for the Layers panel or the Compact preset on a real phone.
- The changed-files table has 87 rows (grep count); the contract text says 88 shared files differ. No file explains the difference.
- The contract counts "31 files" of landmark models but names 30 (`arco` … `uminho`). Its Braga-only groups (lines 160-170) add up to 63 with 31 models plus `index.guimaraes.js`, and to 62 with the 30 named models. Line 158 says 62.
  Source: ~/Dev/arouca-3d/EGM.md (lines 158-170, counted by hand)
- No file compares the fork with porto-3d after `4996c26`. EGM.md compares only against braga-3d.
  Source: ~/Dev/arouca-3d/EGM.md
- No file shows a re-comparison with braga-3d after 2026-11-22. braga-3d has commits after `431ff94` (for example b6b2d8c and 8e88972).
  Source: factory/evidence/braga-3d.txt
