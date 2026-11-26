# Sources: porto-3d-walk-mode-street-level-faults-and-fixes

Primary: the porto-3d progress log (`~/Dev/porto-3d/claude-progress.md`, session entries for porto-031 to porto-041, 2026-11-24 to 2026-11-26) and the runner's git evidence (`factory/evidence/porto-3d.txt`).

Slug note: this topic did not come from the backlog. The first unchecked backlog item reads `~/.claude/projects`, which is outside `factory/sources.txt`. The other unchecked items are `[research]` topics for the research lane. The writer scanned the allowlisted evidence files and added five topics.

## Intro and timeline

- Four faults in the porto-3d progress log: freeze (porto-038), terraces (porto-037), Ribeira hump and the start in the river (porto-039 and its follow-up), paving against ground (porto-041).
  Source: ~/Dev/porto-3d/claude-progress.md (porto-037, porto-038, porto-039, porto-041)
- Repo URL https://github.com/isatimur/porto-3d.
  Source: factory/evidence/porto-3d.txt
- porto-3d has 166 commits from 2 October to 26 November 2026.
  Source: factory/evidence/porto-3d.txt ("commits total: 166", "first commit: 2026-10-02", "last commit: 2026-11-26")
- Walk mode arrived in e2efaf7 on 24 November, ported from braga-3d, with a GLB walker and /play. Commit subject: "Walk mode from braga-3d: street level, GLB walker, collision, GLB passers-by, /play (porto-031)".
  Source: factory/evidence/porto-3d.txt
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-24, porto-031, "Goal")
- Link to the shared-engine post (/blog/one-engine-many-cities).
  Source: content/posts/archive.json (archive-one-engine-many-cities)

## Fault 1: freeze (porto-038)

- "hitch.mjs on porto-3d.com: long tasks of 0.3-0.5 s every 4-5 s while walking."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038, "Owner report")
- A CPU profile put 80 % of the time inside them in walk.js readSurface; it "re-read all 66 walkable meshes (about 1 M triangles) whenever the set of visible meshes changed".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038)
- Fix: "builds the new index as a generator, 3 ms per frame, while the old index stays in use". Commit 7a8a137.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038, "Fix")
  Source: factory/evidence/porto-3d.txt
- "0 and 1 over 200 ms in two 40 s runs, against 6 and 6 on main".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038, "Fix")
- "Start, teleport and a walker near the edge of the old index still read in one go."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038, "Fix")

## Fault 2: terraces (porto-037)

- Report: "at the Ponte Luís I lower deck (...) the road looked like flat plates at different heights".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Report")
- "strip() in src/roads.js drew one quad per 12 m segment and lengthened it by half the road width at both ends, flat at the end height. On a slope the lengthened end of one quad lay over the start of the next, 0.1 to 0.3 m apart."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Cause 1")
- Cause 2, the bridge ends: "Each way gets its ramp from its own junction (...), so ways that overlap in plan (...) stood 0.3 to 1.4 m apart."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Cause 2")
- Fix: strip() mitres the joint at a bend up to 60 degrees; harmoniseRamps(): "where two ramps overlap in plan and stand less than 3 m apart, the lower takes the higher's lift". Commit 3030d20.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Fix")
  Source: factory/evidence/porto-3d.txt
- Mouzinho stacked samples 27/60 -> 1/60.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Evidence")

## Fault 3: Ribeira hump (porto-039) and the start in the river (porto-039 follow-up)

- Owner report: "walk mode at Praça da Ribeira / Cais da Ribeira: humps of terrain in front of the arcades".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Owner report")
- "the DEM (25-30 m source) smears the quay wall and the hill into one ramp, 10-13 m high at the house fronts against a real quay of about 4-5 m".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Cause")
- quay_terraces: one polygon, 4.6 m above sea level. Commit 23df719.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Fix")
  Source: factory/evidence/porto-3d.txt
- Across the square: "before 2.8 -> 13.9 m (...), after 3.9 -> 4.8 m".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Numbers")
- The follow-up is filed in the porto-039 entry: "Follow-up on porto-batch (regression): the default /play start stood waist-deep in the river". The post does not claim that the terrace commit caused it; it quotes the log's cause.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039 follow-up)
- "the start (41.14012) lies 14 m river-ward of the OSM quay line"; "The terrace lifts the ground only to the quay line, so the ground under the deck is the river bed"; "The deck (...) was 3 m over it. That is more than the walker climbs (1.8 m), so the deck was a ceiling".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039 follow-up)
- The start check "had passed with the walker in the river".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039 follow-up "Fix")
- Fix: a deck whose ground inland is a terrace "lies 3 cm over the terrace level" (`pinToTerrace`); "a quay deck (quays-*) is never a ceiling: it is a floor wherever it stands over the terrain"; "the start check now asks that the feet are on the top drawn surface". Commit c05f740, subject "Ribeira walk start on the quay deck, not in the river (porto-039 follow-up)".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039 follow-up "Fix")
  Source: factory/evidence/porto-3d.txt
- Walker climb limit 1.8 m.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-24, porto-031, "Porto differences in walk.js"; 2026-11-26 follow-up)

## Fault 4: paving against ground (porto-041)

- Owner report: around the Luís I bridge foot "paving patches and ramps lie at odd angles on a raw olive hillside", "a bench and a parked car float".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Owner report")
- "Causes (measured)" lists five; cause (2): "the drawn ground is a 12 m lattice: it cannot follow a 6 m street cut into a slope".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Causes")
- src/street-ground.js builds a raster (2 m) over a district of 1.15 x 1.14 km, from the network; the district is drawn on a 3 m lattice. Commit c51163b.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Fix")
  Source: factory/evidence/porto-3d.txt
- Table, main -> branch: (a) "drawn ground over the top paving by more than 0.15 m: 1,105 of 28,297 (...) -> 44 of 29,883"; (c) "props whose base is more than 0.2 m off the top drawn surface: 209 of 592 -> 5 of 611". Metric script `/tmp/pg/metric.mjs`, named in the log.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Metric")
- Triangles at the /play start +6 %; "`ready` 17.3 s -> 18.7 s on a loaded machine".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Cost")
- "`npm test` 91/91 (...); `npm run verify` OK, 17 passed, 0 failed, 0 skipped."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Checks")

## What the log lists as not fixed, and what later entries change

- "Not fixed: a one-off shader compile when a new material first draws."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-038, "Not fixed")
- porto-040 (26 November, the map `/`) names "0.5-1.2 s shader compiles when a layer first draws during a flight" and adds "materials precompile in idle slots after ready (KHR_parallel_shader_compile only)". The entry's goal says "/play must not regress"; it records no walk-mode effect of the precompile. The post says the log does not record its effect in walk mode.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-040, "Goal", "Profile", "Changes")
- porto-037 (25 November) listed: "the ramps at both bridge ends still stand 6 to 9 m over the DEM on grass embankments".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-037, "Not fixed")
- porto-039 lowered raised ways within 250 m of the bridge foot: "Muro dos Bacalhoeiros 10.3 -> 6.7 m over the ground".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Fix"/"Result")
- "the west embankment of the lower-deck approach (way 600, 9 m lift) is gone from the quay".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Result")
- "the east embankment of the lower-deck approach (way 600) is still a dark grass wedge beside the bridge abutment".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Not fixed")
- The 699 -> 113 count belongs to the porto-041 metric box (`/tmp/pg/metric.mjs`, box 41.1395-41.1440, -8.6160 to -8.6080), not to the 1.15 x 1.14 km street ground district. The post names the box. porto-041's "Not fixed (plan)" list does not name the bridge-end ramps or the east embankment, so the post says porto-041 no longer lists them and does not say "not fixed, in part".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Metric" and "Not fixed (plan)")
- The street ground district covers "the Ribeira, Barredo, Sé, the bridge foot, the riverside east and the Gaia quay".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Change")
- "paving more than 1 m over the drawn ground with no wall or embankment: 1,346 -> 9 (on a wall or embankment: 699 -> 113, now granite walls, no grass embankments)".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Result")
- "Largo Luiz I on the Gaia side still stands 9 m over the DEM".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039, "Not fixed")
- Order: porto-039 comes before the street ground work of porto-041. The post ties each "still" quote to porto-039. porto-041's "Not fixed" list names neither the east embankment nor Largo Luiz I, and its "Result" line gives a district count, not these two places. The post says the log does not record whether porto-041 changed them.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-039 "Not fixed"; 2026-11-26, porto-041 "Result" and "Not fixed (plan)")
- "the remaining (a) samples sit where OSM draws ways over each other at 2-5 m apart"; (a) on the branch is 44.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Metric" and "Not fixed (plan)")

## Not measured

- Frame time on the owner's laptop: "Stage 0 (frame time on the owner's laptop) decides whether stage 1b or 2 is needed." Stage 1a is the walk-mode level of detail.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-034, "Next")
- GPU time, in part. porto-033: "GPU timer queries on this M1 Max were too noisy to report a time."
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-25, porto-033 paragraph)
- porto-041: "GPU ms the same in the paired run (59.8 -> 59.1)". The post gives this as one paired run. The log's "on a loaded machine" belongs to the `ready` figure, so the post does not attach it to the GPU figure.
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Cost")
- "The perf soft gate missed 11 budgets at load average about 25 (...): part is the machine, part may be the street ground step on a throttled phone CPU. Not measured apart".
  Source: ~/Dev/porto-3d/claude-progress.md (2026-11-26, porto-041, "Checks")
- The writer ran no commands. Every number comes from the progress log or the evidence file.
