title: Portugal 3D on a phone: 44 px targets, 12 px text, and the globe before the card pictures
slug: portugal-3d-phone-pass-44-px-targets
excerpt: On 18 November 2026 the portugal-3d globe landing got a phone pass. Here is how each control became a 44 px target, how pins on a touch screen keep their 44 px areas apart, how the tests hold text at 12 px or more, and why card pictures now wait for the globe. No file records a run on a real phone.
category: Product engineering
category: Three.js
date: 2026-11-27T09:00:00.000Z

How do you make a WebGL globe with tappable pins and a six-language bar usable on a 320 px phone? This post is for developers who put a 3D scene behind a normal web page. It follows the phone pass in [portugal-3d](https://github.com/isatimur/portugal-3d), the globe landing in front of the city maps. You get the CSS rules, the pin grouping rule, and the Playwright checks that hold each rule in place.

## When the phone pass landed

portugal-3d has 80 commits from 7 to 22 November 2026. The phone pass merged on 18 November in [7514296](https://github.com/isatimur/portugal-3d/commit/7514296): "phone layout, touch pins, 44 px targets, readable bar, lighter phone load". Twelve commits dated 18 November sit between the Guimarães routes merge and this merge.

The same day, [7aa913d](https://github.com/isatimur/portugal-3d/commit/7aa913d) added a smoke test for the live sites. [A globe in front of eighteen maps](/blog/a-globe-in-front-of-eighteen-maps) covers the landing itself.

## How the bar became 44 px targets

Commit [56fd0aa](https://github.com/isatimur/portugal-3d/commit/56fd0aa) gave the bar "44 px language targets, a language menu on phones". In `src/style.css`, the brand, the Places link and each language link get `min-height: 44px`. The language links also get `min-width: 44px`.

Six such links do not fit beside the name on a phone. A comment in `index.html` says so: "six 44 px links do not fit beside the name, so the same links sit in a menu (works with script off)". The menu is a `<details>` element. Its `summary` and each row are 44 px.

A test at 320 x 568 checks that the menu rows name their language in full ("Português", "English", "Español", "Français", "Deutsch", "Русский"). A second test opens the menu with script off.

After commit [7a461de](https://github.com/isatimur/portugal-3d/commit/7a461de), the bar wraps when the text size is raised, so the language menu stays on the screen. A test sets the root font size to 200 % at 390 px and checks that the name, Places and the menu button stay on the screen.

## How pins on a touch screen keep their 44 px areas apart

A pin button is 28 px. On a coarse pointer, `style.css` adds a `::before` layer with `inset: -8px`, so "each pin answers a 44 px circle around it while the drawing stays 28 px".

`src/pins.js` sets the grouping distance with one constant:

```js
const COARSE = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
const CLUSTER = COARSE ? 44 : 30;
```

Pins closer than `CLUSTER` on screen merge into a group. The code comment says that "pins group sooner there: two hit areas never overlap and a tap never lands on the neighbour".

The test hit-tests five points on each visible pin with `elementFromPoint`: the centre and 21 px left, right, up and down. The centre must land on that pin. No edge point may land on another pin.

An edge point that hits no pin fails if it lands in the globe stage (`#stage`), unless the place panel or the zoom-out button covers it. Elements outside the stage, such as the bar, may cover an edge.

Two more tests cover the tap flow from [3e3ddf7](https://github.com/isatimur/portugal-3d/commit/3e3ddf7). Both tests end in a dive: the camera flies in and the page opens that city's site. In both, the first tap must show the place panel. Then a second tap on the pin starts the dive in one test, and the panel button starts it in the other.

The first test also checks that the panel button is at least 44 px tall, and that the page goes to an address that contains `from=globe`.

## How the tests hold text at 12 px or more

Commit [d55e63e](https://github.com/isatimur/portugal-3d/commit/d55e63e) reads: "no text under 12 px, the browser text size is honoured, whole facts on phones". The test walks every visible element with its own text and fails on a computed font size under 11.9 px. It runs on three pages: `/?lang=de` at 390 px, `/?lang=ru` at 1280 px, and `/partners?lang=pt` at 390 px. On the home page it first opens the Sintra panel, so the panel text counts too.

## Why the card pictures now wait for the globe

Commit [65d2012](https://github.com/isatimur/portugal-3d/commit/65d2012): "the globe first, card pictures later; landscape phones get the light globe". A short script in the `<head>` adds the `has-globe` class at first paint, unless the visitor asks for reduced motion. The comment says the card pictures, "five screens down, wait their turn instead of loading before the globe".

The test loads the page at 390 x 844 and records each request to `/cards/`. Up to network idle after the globe is ready, the list must be empty. After a scroll to the end of the globe story, where the cards come up, it must not be empty.

For landscape phones, `src/tier.js` uses the short side of the window. A phone held at 844 x 390 therefore gets the `lite` tier, which the comment describes as "a 0.5 MB texture, no hero video".

The head script also has a way back. If the page script fails to load, to parse, or to run before it sets `window.__globeBoot`, the script removes `has-globe` and the plain page returns. Commit [fef2cff](https://github.com/isatimur/portugal-3d/commit/fef2cff) added the throw and parse cases. Three tests cover them with a blocked request, a script that throws, and a script that does not parse.

## How the layout tests cover small screens

`tests/e2e/mobile.spec.js` checks layout at 320 and 390 px in English, German and Russian. At three scroll points, no visible element may stick out sideways. At 320 x 568 and 375 x 667, in four languages, the title, each of six chapters and one whole card must fit on the screen. With reduced motion, the page must show no canvas, no video and 18 cards.

## What is not measured

No file in the repo records a run on a real phone. The tests run in Playwright with set viewport sizes and touch emulation.

The only frame-time figures are in `docs/perf.md`. They come from 14 November, before this pass, on an Apple-silicon Mac with the CPU slowed 4x. That file says it "shows relative cost, not a real phone".

No file shows the output of a test run after the merge. The repo does not record load times or picture bytes before and after the card-picture change.

*How this post was made: an AI agent drafted it from the project files listed in the repo, a second agent reviewed it, and Timur merged it.*
