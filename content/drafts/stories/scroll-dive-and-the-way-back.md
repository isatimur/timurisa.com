title: Scroll, dive, and the way back
slug: scroll-dive-and-the-way-back
excerpt: How scroll drives the globe, how a pick becomes a dive into a separate site, and the three values that let a city link back without confusing a visitor who never saw the globe.
category: Product engineering
category: Three.js
date: 2026-11-17T11:00:00.000Z

The globe page has to do three jobs. It has to follow the scroll. It has to hand a visitor to a city's own site without a seam. And it has to let that visitor come back.

## Scroll as the only input

One module, `src/timeline.js`, maps scroll progress to everything on screen: the camera, the glow on Portugal's outline, the dimming, the opener, the six story chapters, and the fade-in of the cards.

The hero spacer is 600vh tall. Progress runs from 0 to 1 over that height. The opener takes up to 0.12. The six chapters run from 0.12 to 0.84. The cards take the last part, 0.84 to 1.

A function of one number is easy to test. The repository has a unit test file for the timeline and an end-to-end scroll test. The end-to-end test does what a visitor does: it scrolls.

## The opener

A short hero video plays at the start. `src/opener.js` loads it after the globe is ready, plays it once, and stops it when it has faded. A helper called `pickOpener` decides whether the video plays at all. It plays only on the full tier and only if the visitor has not asked to save data. Otherwise only the poster shows.

## The dive

When a visitor picks a place, `src/dive.js` plays a descent. The shot ends at the city's own address with two values added: `?intro=1&lang=<lang>&from=globe`. The city site plays its own fly-in as the last part of the shot. The two animations meet in the middle, so the visitor sees one movement.

The dive needs very little from the other site: an address and a theme colour. That is why it works for Madeira and Pena Park, which run on a different engine.

## The way back

A visitor who clicked through from the globe should be able to return. A visitor who found a city through a search engine should not see a link to a globe they never saw.

The `from=globe` value solves this. Each city repository carries `src/back-to-globe.js`. It shows the back link only when the address contains `from=globe`. The link points to `https://portugal-3d.com/#from=<id>`, and `src/ascend.js` on the globe reads that value and flies back to the right place.

So three values carry the whole contract: `intro`, `lang`, and `from`.

## Where the contract has a hole

Pena Park has no ready flag and no back link to the globe. The README states both facts. The dive still works for it, because the dive needs only an address and a theme.

## Tests

The repository has a unit test for the dive and one for the return path. An end-to-end test covers the return. Together they cover the loop: pick, dive, arrive, return.

## Lesson

Keep the contract between two sites small and explicit. Three named values are easy to document, to test, and to explain to the next agent that touches either side.

The next article looks at what all of this costs on a phone: [the globe costs five draw calls](/blog/the-globe-costs-five-draw-calls).
