Method: I read the draft, the sidecar and the runner evidence (factory/evidence/portugal-3d.txt). I opened the cited files in ~/Dev/portugal-3d and checked each claim: src/style.css, index.html, src/pins.js, src/tier.js, tests/e2e/mobile.spec.js, docs/perf.md. I checked content/posts/archive.json for the linked post.

Verified against source:
- Evidence: 80 commits, 7 to 22 Nov 2026. Merge 7514296 on 18 Nov with the quoted subject. Twelve 18 Nov commits (56fd0aa to fef2cff) sit between a655009 and 7514296. 7aa913d added the live-sites smoke test. All commit quotes (56fd0aa, 7a461de, d55e63e, 65d2012, fef2cff, 3e3ddf7) match the evidence subjects.
- CSS: min-height 44px on .brand, .bar-places, .langs a. min-width 44px on .langs a. .lang-menu summary and .lang-menu a are 44 px. .pin::before has inset -8px under (pointer: coarse). The quoted comment matches.
- index.html: the details.lang-menu element, the quoted comment about six 44 px links, and the head script. The script adds has-globe unless reduced motion, and removes it on error before window.__globeBoot.
- src/pins.js: PIN = 28, COARSE, CLUSTER = COARSE ? 44 : 30, and the quoted comment.
- src/tier.js: short side of the window, 844x390 gets lite, and the quoted comment "a 0.5 MB texture, no hero video".
- Tests: the pin test uses elementFromPoint at the centre and 21 px offsets, and the failure rule matches the draft wording (spec lines 137 to 139). The two dive tests match, including the 44 px .pp-go check and from=globe. The 12 px test uses 11.9, the three pages and widths, and opens the Sintra panel. The card-picture test matches. The three script-failure tests (abort, throw, no parse) match. The 200 % test matches. The 320 px menu test lists the six full names. The layout loops match (320 and 390 in en, de, ru, three scroll points; 320x568 and 375x667 in en, pt, de, ru). The reduced-motion test matches (no canvas, no video, 18 cards).
- docs/perf.md: dated 2026-11-14, CPU slowed 4x, Apple-silicon Mac, and the quote "shows relative cost, not a real phone".
- The link /blog/a-globe-in-front-of-eighteen-maps exists in archive.json.

Writing standard: the title is descriptive and not sensational. The question and the audience are in the first paragraph. The headings carry the story. The post has original content: the pin hit-test rule, the cluster constant and the lazy-picture test, each tied to files. Paragraphs run two to four sentences; the two dense paragraphs the old review flagged are now split. "What is not measured" claims no run that did not happen. The disclosure line is present. No client or employer names, no secrets, no copied external text. The closing section does not restate the article.

Checked: 74 sentences

VERDICT: PASS
