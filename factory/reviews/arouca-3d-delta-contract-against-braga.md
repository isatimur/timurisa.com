# Review: arouca-3d-delta-contract-against-braga

Sources opened: the post, the sidecar, `factory/WRITING-STANDARD.md`, `~/Dev/arouca-3d/EGM.md`, `~/Dev/arouca-3d/claude-progress.md` (lines 98-111), `~/Dev/arouca-3d/README.md`, `factory/evidence/arouca-3d.txt`, `factory/evidence/braga-3d.txt`, `content/posts/archive.json`.

Spot checks that held:
- Counts 89 / 88 / 62 / 15 match EGM.md lines 23, 64, 158, 179.
- `src/layers.js` and `src/load-status.js` are in the identical list. The other four ported files are in the changed table: `src/layer-defs.js` 74, `src/layers-ui.js` 51, `scripts/layers-manifest.mjs` 14, `scripts/layers.test.mjs` 73.
- The changed table has 87 rows (EGM.md lines 68-154). 70 cells start with "Not read" (grep count).
- The Braga-only groups on lines 160-169 hold 31 files. 30 model names plus `index.guimaraes.js` give 62. With "31 files" the total is 63. The post's arithmetic is correct.
- "Ten lines later": the quotes sit on EGM.md lines 5 and 15.
- Commit hashes, dates and subjects match `factory/evidence/arouca-3d.txt` (b2febfb on line 213, c1bc8bc, dda1978, 293f034). The b2febfb quote leaves out the "arouca-3d: " prefix. The rest is an exact substring.
- braga-3d has b6b2d8c (2026-11-22) and 8e88972 (2026-11-24), both newer than 431ff94.
- The layer sizes, the class S/P decision, the check results, the three faults, the "Not done" items and the open pill bug match claude-progress.md lines 101-111 word for word in substance. The post does not claim a run of its own. It says that no file shows the terminal output.
- `/blog/one-engine-many-cities` exists in archive.json.
- Standard: the post asks a real question and answers it in the first paragraph with numbers. The title is descriptive. The headings carry the story. The post finds original content: the 87 vs 88 mismatch, the 31 vs 30 mismatch, and the ordering gap between the fixes and the five runs. The closing section adds open items and does not restate the article. The disclosure line is present. The post names no client or employer and contains no secrets, local paths or copied external text.

Checked: 65 sentences
VERDICT: PASS
