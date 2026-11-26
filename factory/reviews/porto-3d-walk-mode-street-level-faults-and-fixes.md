# Review: porto-3d-walk-mode-street-level-faults-and-fixes

Method: I read the draft, the sidecar, `factory/evidence/porto-3d.txt`, and the cited entries in `~/Dev/porto-3d/claude-progress.md` (porto-031, 032, 033, 034, 037, 038, 039 and its follow-up, 040, 041). I compared every number, name, quote, date and order of events against the log text. I checked the `/blog/one-engine-many-cities` link against `content/posts/archive.json` (it exists, slug matches, published 2026-11-06).

Verified against the log or the evidence file, all exact:
- 166 commits, 2 Oct to 26 Nov; e2efaf7 on 24 Nov; commit hashes 7a8a137, 3030d20, 23df719, c05f740, c51163b and their dates (25 and 26 Nov).
- Fault 1: 0.3 to 0.5 s every 4 to 5 s; 80 %; 66 meshes, about 1 M triangles; 3 ms per frame; 6 and 6 to 0 and 1 in two 40 s runs; the three cases that still read in one go.
- Fault 2: 12 m segments, 0.1 to 0.3 m, 0.3 to 1.4 m, 60 degrees, 3 m rule, 27/60 to 1/60.
- Fault 3: 25 to 30 m DEM, 10 to 13 m against 4 to 5 m, 4.6 m terrace, 2.8-13.9 to 3.9-4.8 m, 14 m river-ward, 3 m deck, 1.8 m climb, "had passed with the walker in the river". The sequence is correct: the log files the start-in-river problem as a follow-up regression and the post does not claim the terrace caused it.
- Fault 4: five causes, the 12 m lattice quote, 2 m raster, 1.15 x 1.14 km, 3 m lattice, the metric box (41.1395-41.1440, -8.6160 to -8.6080), 1,105/28,297 to 44/29,883, 209/592 to 5/611, +6 %, 17.3 s to 18.7 s "on a loaded machine", 91/91, 17 passed.
- Open items: porto-038 "Not fixed" shader compile; porto-040 idle-slot precompile with no walk-mode result recorded; porto-037 "6 to 9 m over the DEM on grass embankments"; porto-039 "still a dark grass wedge" and "Largo Luiz I ... still stands 9 m over the DEM"; porto-041 "699 -> 113, now granite walls, no grass embankments" tied to the named metric box; the 2 to 5 m OSM overlap cause for the 44 samples. The post's claims about what later entries do and do not record are accurate (porto-041 "Not fixed (plan)" names neither the ramps, the east embankment, nor Largo Luiz I). The earlier stale review's objections to this section no longer apply: the draft now names the metric box and does not say "not fixed, in part".
- Not measured: porto-034 "Stage 0 ... decides whether stage 1b or 2 is needed"; porto-033 noisy GPU timers; porto-041 59.8 vs 59.1 in one paired run; "Not measured apart" and 11 budgets at load about 25.

Writing standard:
- Real question, answer in the first paragraph, audience stated, numbers and commit links throughout. Pass.
- Original information: timeline from the evidence file plus the repo's own causes and counts. This counts as original under the prompt. Pass.
- Title is descriptive, not sensational. Headings carry the story. Disclosure line present. No claimed run that did not happen. No client or employer names, no secrets, no copied external text. The closing section lists unmeasured items and does not restate the article.

NOTE (not a problem): the title of Fault 3 ("then a start in the river") reads as if the terrace commit caused the river start. The body is careful ("records a regression"), and the log itself labels it a regression on porto-batch, so I do not fail it.
NOTE (not a problem): "Ponte Luís I" and "Luís I bridge" both appear. They name the same bridge; one term would be tidier.

Checked: 78 sentences
VERDICT: PASS
