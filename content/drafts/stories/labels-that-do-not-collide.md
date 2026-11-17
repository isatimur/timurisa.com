title: Labels that do not collide
slug: labels-that-do-not-collide
excerpt: Eighteen pins on a small country. The rules that merge, place and hide labels, and the tests that run them at four screen sizes in two languages.
category: Product engineering
category: UI
date: 2026-11-17T13:00:00.000Z

Portugal is a narrow country. At the full view of the globe, several of my eighteen places sit almost on top of each other. Naive labels would pile up into an unreadable smear. This article covers the rules that stop that.

## Merge close places

Every frame, `src/labels.js` looks at the pins on screen. Places that sit closer than 30 pixels merge under the name of the best-ranked one. The label reads like "Lisbon +2".

Rank is a field in the data. Rank 1 wins. The focused place always leads its group, whatever its rank.

## Place what is left

Each label tries eight sides around its pin. It takes the first side that is clear of other labels, other pins, the info panel, the chapter text, and the bar. If no side is clear, the label hides. The pin's button keeps its name.

## Zoom a group

A click on a merged group zooms the camera until the places in it stand apart. "Back to all of Portugal" or the Escape key returns to the full view.

## Featured places follow the same rules

One place, Pena Park, carries a "Featured" badge and a gold ring on its pin. A featured place follows its rank like any other. At the country view, Pena Park has rank 18 and sits inside the group "Pinhão +1". Its gold ring shows when you hover over it, focus it, zoom to it, or when its card is in view in the rail.

## The panel and the arcs

The place panel shows the focused place's landmarks, its UNESCO mark, and its three nearest places with great-circle distances. It also draws fine arcs to those neighbours in an SVG laid over the canvas. The arcs cost no extra draw calls.

On a phone, the card in view in the rail focuses its place. The visitor scrolls cards, and the globe follows.

## Tests

Layout rules are easy to break without noticing. The repository covers them from three sides.

A unit test file checks the merge and placement logic. An end-to-end test checks label overlap at four screen sizes, in English and in Russian. Other end-to-end tests cover the panel, the distances and the arcs, and the card-in-view focus on a phone. The Russian copy ran long, so it was shortened to fit a small phone.

## Lesson

A layout that looks right in one language and one size is an accident. Write the rules as code, then test them in the longest language at the smallest size.

The next article is about the words on the page: [claims with a status](/blog/claims-with-a-status).
