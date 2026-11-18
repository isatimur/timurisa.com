title: Eleven city maps in three days, and the limits behind them
slug: eleven-city-maps-in-three-days-and-the-limits-behind-them
excerpt: Sintra, Faro, Lisboa, Évora, Coimbra and six more went from nothing to live between 13 and 15 November. What made it fast, and the four limits that decided the pace.
category: Product engineering
category: AI engineering
date: 2026-11-17T15:00:00.000Z

The globe needed more places on it. Between 13 and 15 November, eleven new city maps went from nothing to live. This article explains how, and what held the pace down.

## The waves

Each map is a fork of the same engine. I built them in three waves, with agents.

On 13 November: Sintra, Faro, Lisboa, and Ponte de Lima. On 14 November, a UNESCO wave: Évora, Coimbra, Tomar, and Belém. Later that day, a third wave: Batalha, Alcobaça, and Pinhão, where the Douro vineyard terraces are drawn in the ground shader.

All eleven passed `npm run verify` on 14 November. On 15 November, all sixteen maps were deployed and linked from the globe. Madeira followed as the seventeenth the same day.

## Limit one: usage

The agents run on a plan with a five-hour usage limit. Four heavy agents in parallel use it up. Three or four at once hit it again on 15 November. Two at once was safe.

Two rules now go into my briefs. Commit after each round, so a cut-off loses little. And for a repository that I might deploy, work in a git worktree and leave the merge to me. After the merge, remove the worktree, so the deploy tool does not upload it.

## Limit two: the map data

The pipeline asks a public service, Overpass, for the OpenStreetMap data. Overpass was down at times. A script in two of the repositories can answer the same queries from the main OpenStreetMap API when you set `OSM_API=1`.

The result is uneven. On some maps the outer ring of OpenStreetMap data is thin because Overpass failed. Each repository records the commands to resume. Most building heights are estimates.

## Limit three: what a site lets you read

Some heritage and tourism sites refuse automated reads. I did not work around that. The agents do not pretend to be a browser to get past a refusal.

The photo script for Belém rejects Commons authors who ask to be contacted before reuse. The globe uses 33 landmark photos from the city repositories, each with a checked licence and a visible credit. Eight of 301 town-map landmarks still have no photo.

## Limit four: measurement

When the eleven maps first passed `verify`, I had not run the performance bench on them. That is a gap. On 15 November, the faster-start work from Lisboa was ported into the other ten. In the test profile "phone-low", the first frame arrived at about 5.5 seconds, down from about 8. That figure comes from a test profile, not a real phone.

## What made it fast

The engine was shared. A map is mostly data: a city config, landmark records, and a data pipeline that is resumable and writes into the repository. The checks from the first city came along, and all eleven forks passed them on 14 November.

The last article in this series looks at the logs behind all of this: [what my Claude sessions show about my own work](/blog/what-my-claude-sessions-show-about-my-own-work).
