title: Claims with a status
slug: claims-with-a-status
excerpt: Every statement on my globe story has a status (works, trying, idea) and a source file. How the check works, and what a claims list found when I turned it on my own pages.
category: Engineering practice
category: Product engineering
date: 2026-11-17T14:00:00.000Z

A tourism site that says "tested on phones" when it was not tells a small lie. My globe keeps its sentences in a file that makes this kind of sentence hard to write.

## The story is data

The globe tells a story in six chapters as you scroll. The text does not live in the page. It lives in two files.

`data/claims.json` holds each statement as a record with a status and a source. The status is one of three words: `works`, `trying`, or `idea`. `data/story.json` builds the chapters out of claim ids.

Today the file holds nine claims. Six are `works`, one is `trying`, and two are `idea`.

## One rule for adding a sentence

To add a statement, add a claim with a source. If there is no source, mark it `idea` and word it as an idea. Only then list its id in a chapter. The wording of an `idea` must read like one.

## A check that opens the sources

The command `npm run check:story` validates the data. It checks that every source file exists. The paths are relative to my development folder. It then writes `docs/story-claims.md`, a plain list for me to review.

The check cannot tell me that a source supports the sentence. It can only tell me that a source exists. The written list exists so that I read it.

## The same habit on another page

I used the same method on a page for institutions that I have not linked from the site yet. For each line in its "works today" column, I wrote down which file proves it. I checked by reading the code of each map. For that column I did not open the live sites, and the list says so.

The list also has a "left out" section.

- A guide that answers questions is built but parked. It loads only with `?guide=1`, and no API key is set, so it has never answered a real question.
- "Tested on phones" stays out. No map has had a test on a real phone.
- A statement that a trail is official stays out. Its official status is not confirmed.
- "Reconstructions are labelled" stays out. No map shows a reconstruction label yet.

## What a claims list finds

Two sentences changed on 17 November when Pena Park joined. "Day and night on every map" became "on the town maps and Madeira", because Pena Park has no night. "Weather on every map except Madeira" became "on the town maps", because Madeira and Pena Park have none.

The list also counted photos. Eight of the 301 town-map landmarks have no photo. So "a photo for every landmark" is false, and the page says "a photo where a free one exists".

The list records conflicts between sources. One map's README still says "not deployed", while its progress log and data say the map is built. The page follows the progress log and the data.

Next: [eleven city maps in three days, and the limits behind them](/blog/eleven-city-maps-in-three-days-and-the-limits-behind-them).
