# Sources: portugal-3d-phone-pass-44-px-targets

Primary: the runner's git evidence (`factory/evidence/portugal-3d.txt`), the Playwright phone tests (`~/Dev/portugal-3d/tests/e2e/mobile.spec.js`), and the CSS, HTML and JS that the tests check.

Pick note: the first unchecked backlog item reads `~/.claude/projects`, which is outside `factory/sources.txt`. The `[research]` items belong to the research lane. This is the next unchecked build topic.

## Intro and timeline

- Repo URL https://github.com/isatimur/portugal-3d.
  Source: factory/evidence/portugal-3d.txt
- The repo is a globe landing in front of the city maps.
  Source: ~/Dev/portugal-3d/README.md
  Source: factory/evidence/portugal-3d.txt (ed83f4f "cinematic dive and hand-off to city sites")
- 80 commits from 7 to 22 November 2026.
  Source: factory/evidence/portugal-3d.txt ("commits total: 80", "first commit: 2026-11-07", "last commit: 2026-11-22")
- The phone pass merged on 18 November in 7514296, subject "Merge ux/mobile-pass: phone layout, touch pins, 44 px targets, readable bar, lighter phone load".
  Source: factory/evidence/portugal-3d.txt
- Twelve commits dated 2026-11-18 sit between a655009 (Guimarães routes merge) and 7514296 in the evidence list (lines 13-24): 56fd0aa, 3f742fb, 3e3ddf7, 39c351d, d55e63e, 65d2012, 051e0d6, 7e384b1, 1a9dc17, bba98ab, 7a461de, fef2cff.
  Source: factory/evidence/portugal-3d.txt
- 7aa913d on 2026-11-18 added a smoke test for the live sites.
  Source: factory/evidence/portugal-3d.txt
- Link to /blog/a-globe-in-front-of-eighteen-maps.
  Source: content/posts/archive.json (archive-a-globe-in-front-of-eighteen-maps)

## Bar and 44 px targets

- 56fd0aa: "Bar: 44 px language targets, a language menu on phones, a readable bar over the opener".
  Source: factory/evidence/portugal-3d.txt
- Brand, Places link and language links have `min-height: 44px`; language links also `min-width: 44px`.
  Source: ~/Dev/portugal-3d/src/style.css (lines 56, 58, 63)
- Comment quoted: "six 44 px links do not fit beside the name, so the same links sit in a menu (works with script off)". The menu is a `<details>` element.
  Source: ~/Dev/portugal-3d/index.html (lines 36-37)
- Summary and menu rows are 44 px.
  Source: ~/Dev/portugal-3d/src/style.css (lines 69, 74)
- Test at 320 x 568 checks full language names and 44 px rows; a script-off test opens the menu.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("on a 320 px phone the languages sit in a menu of 44 px rows", "script off")
- 7a461de quote: "wraps at very large text sizes instead of pushing the language menu off the screen".
  Source: factory/evidence/portugal-3d.txt
- 200 % text test at 390 px checks name, Places and menu button stay on screen.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("with the text at 200 percent")

## Pins

- Pin button is 28 px.
  Source: ~/Dev/portugal-3d/src/pins.js (line 12, `const PIN = 28`)
- On a coarse pointer, `.pin::before` with `inset: -8px`; quote "each pin answers a 44 px circle around it while the drawing stays 28 px".
  Source: ~/Dev/portugal-3d/src/style.css (lines 363-366)
- `CLUSTER = COARSE ? 44 : 30` and the comment "pins group sooner there: two hit areas never overlap and a tap never lands on the neighbour". The heading and excerpt ("keep their 44 px areas apart") describe this design rule. No file records an earlier overlap failure, so the post claims none.
  Source: ~/Dev/portugal-3d/src/pins.js (lines 13-17)
- Pins merge into a group at 44 px on a coarse pointer, else 30 px.
  Source: ~/Dev/portugal-3d/src/EGM.md (line 177)
- The test hit-tests with `document.elementFromPoint` (it does not tap) at the centre and 21 px left, right, up and down. Post wording: "The centre must land on that pin. No edge point may land on another pin. An edge point that hits no pin fails if it lands in the globe stage (`#stage`), unless the place panel or the zoom-out button covers it. Elements outside the stage, such as the bar, may cover an edge." Code: a point fails if another pin takes it (line 137), if the centre hits no pin (line 138), or if it hits no pin and its element sits inside `#stage` (any stage child counts) and not inside `.place-panel, .zoom-out` (line 139). An edge point that hits no pin and lands on an element outside `#stage` passes. The code comment on line 136 reads "the bar and the panel may lie over a pin's edge; another pin may not".
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("each pin answers a 44 px circle", lines 126-145, rule at lines 134-139)
- 3e3ddf7: "Touch: 44 px pins, tap to preview then dive, 44 px arrows and zoom-out". Two tests: in both, the first tap shows the panel. In one, a second tap on the pin dives (lines 147-163). In the other, the panel button dives (lines 165-172). The first test checks panel button height >= 44 (lines 155-156) and that `window.__navigated` contains `from=globe` (line 162). The second test waits for `window.__navigated` (line 171).
- "Dive" means the camera flies in and the page opens that city's site.
  Source: factory/evidence/portugal-3d.txt (ed83f4f "cinematic dive and hand-off to city sites")
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js (lines 161-162, 171)
  Source: factory/evidence/portugal-3d.txt
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("a first tap on a live pin shows the place", lines 147-163)
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("the panel button dives", lines 165-172)

## Text size

- d55e63e quote: "no text under 12 px, the browser text size is honoured, whole facts on phones".
  Source: factory/evidence/portugal-3d.txt
- The test fails on computed font size under 11.9 px, on `/?lang=de` at 390, `/?lang=ru` at 1280, `/partners?lang=pt` at 390; it opens the Sintra panel on the home page.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("no visible text is under 12 px")

## Loading

- 65d2012 quote: "the globe first, card pictures later; landscape phones get the light globe".
  Source: factory/evidence/portugal-3d.txt
- Head script adds `has-globe` unless reduced motion; comment "five screens down, wait their turn instead of loading before the globe"; removes the class on error before `window.__globeBoot`.
  Source: ~/Dev/portugal-3d/index.html (lines 10-21)
- Test at 390 x 844: no `/cards/` request until network idle after ready; requests after `toFrac(page, 1)`, which scrolls to the end of the `#hero` globe story, where the cards rise (lines 6-10, 259).
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("a phone loads no card picture before the globe")
- tier.js uses the short side; 844 x 390 gets `lite`; comment "a 0.5 MB texture, no hero video".
  Source: ~/Dev/portugal-3d/src/tier.js (lines 4, 20-22)
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("a phone held sideways gets the light globe")
- fef2cff: "a page script that throws or fails to parse also brings the plain page back". Three tests: abort, throw, no parse.
  Source: factory/evidence/portugal-3d.txt
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("if the page script ... the plain page comes back")

## Layout tests

- 320 and 390 px in en, de, ru; three scroll points; nothing sticks out sideways.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js (lines 29-42)
- 320 x 568 and 375 x 667 in en, pt, de, ru: title, six chapters, one whole card fit.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js (lines 52-93)
- Reduced motion: no canvas, no video, 18 cards.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js ("reduced motion")

## Not measured

- No file records a run on a real phone. Tests use Playwright viewport sizes and touch emulation.
  Source: ~/Dev/portugal-3d/tests/e2e/mobile.spec.js
- The only frame-time figures date from 2026-11-14, before the pass, on an Apple-silicon Mac with CPU slowed 4x; quote "shows relative cost, not a real phone".
  Source: ~/Dev/portugal-3d/docs/perf.md
- No file shows test run output after the merge.
- No file records load times or picture bytes before and after the card-picture change.
