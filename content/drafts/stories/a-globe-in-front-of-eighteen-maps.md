title: A globe in front of eighteen maps
slug: a-globe-in-front-of-eighteen-maps
excerpt: How portugal-3d.com went from an idea on 5 November to the front door of eighteen real-scale 3D maps. What it is, how it is built, and what the git log says about the pace.
category: Product engineering
category: Three.js
date: 2026-11-17T09:00:00.000Z

By early November I had five city maps and no front door. Each map lived at its own address. A visitor had to know the address first.

On 5 November I described a different shape to my agent. A globe, or a sphere, with the 3D cities on it. Pick any city. It should be a standalone project on its own domain, portugal-3d.com. Scroll a little and the globe moves with you, then a city gets selected.

This article is the first in a series about that site. It covers what the site is and how fast it came together.

## What it is

The README describes it in one paragraph. It is the front door to eighteen real-scale 3D maps of Portugal, from Ponte de Lima to Faro and out to Madeira. A scroll-driven globe pulls the visitor toward Portugal and highlights the outline. Every place shows as a pin. A focused place shows its best-known landmarks, its UNESCO listing, and the straight-line distance to its neighbours. A pick plays a dive that ends in that place's own site.

A place whose site is not up shows as "coming soon". It never sends anyone to a dead page.

## One list of places

`data/cities.json` is the only list of places. It runs north to south by region. A record holds an id, a region, and a rank that sets label priority. It holds the names and a short fact in six languages, and the fact's source: a URL and a quoted passage. It holds the coordinates, the map's address, a `live` flag, a card image, a theme colour, and the UNESCO listing if there is one.

The README says plainly that four of the six languages are machine translations. Spanish, French, German and Russian need a native review. I have not done that review yet.

## HTML first, globe second

The cards for all places are written into `index.html` at build time, grouped by region in one sideways rail. They work with script off, with reduced motion, and on a device without WebGL. Script then adds the globe on top.

A small module picks one of three tiers for the globe: full, lite or static. Phones always get lite. The next article in the series, on [the draw-call budget](/blog/the-globe-costs-five-draw-calls), shows what that costs.

## The pace, from git

The repository has 62 commits. They fall on six days.

On 7 November: 13 commits. The design and plan came first, then the scaffold, the static landing, and the globe scene. Then a gap with no commits until 13 November. That is the day I bought the domain. On the 13th: 13 commits. On the 14th: 15 commits, with sixteen pins, collision-aware labels, and a panel with landmarks and distances. On the 15th: 6 commits, and all sixteen maps went live. On the 16th: 6 commits. On the 17th: 9 commits.

The count grew from five places to eighteen. Madeira joined as the seventeenth place on 15 November. Pena Park joined as the eighteenth on 17 November.

I do not read commit counts as effort. An agent writes most of the code. What they show is rhythm: a burst, a pause, then three days of steady work.

## What came out of it

The rest of the series takes one piece at a time:

- [A 200 is not enough to call a city live](/blog/a-200-is-not-enough-to-call-a-city-live)
- [Scroll, dive, and the way back](/blog/scroll-dive-and-the-way-back)
- [Labels that do not collide](/blog/labels-that-do-not-collide)
- [Claims with a status](/blog/claims-with-a-status)
- [Eleven city maps in three days, and the limits behind them](/blog/eleven-city-maps-in-three-days-and-the-limits-behind-them)
- [What my Claude sessions show about my own work](/blog/what-my-claude-sessions-show-about-my-own-work)

The lesson from the first week is small. Start the front door with a list in plain HTML. The globe is a layer on top of the list, not a replacement for it.
