title: The cliff in the Crystal Palace garden: a bug that was not the terrain
slug: the-cliff-in-the-crystal-palace-garden
excerpt: A grey cliff appeared in my 3D map of Porto. The terrain data looked guilty. It was innocent. The cause was a level pad cut 61.6 metres deep.
category: Product engineering
category: Debugging
date: 2026-11-06T14:00:00.000Z

While building my 3D map of Porto, I sent my agents a screenshot. It showed a grey cliff wall where a garden should be. The garden belongs to the Palácio de Cristal, a landmark on a hill above the Douro river.

The map is at porto-3d.com. This post is about why that cliff was there, and why the first suspect was wrong.

## The wrong suspect

The first suspect was the elevation data. The map uses a coarse elevation grid, and coarse grids make crude slopes. A cliff on a slope sounded like a data problem.

It was not. An agent traced the cliff to a different part of the pipeline. I call that part pads.

A pad is a flat platform. Real landmarks stand on level ground, but real hills are not level. So the engine levels the ground under each landmark. It cuts the hill where the ground is too high, and it fills where the ground is too low.

## What the pad did

The Palácio de Cristal garden is large. Its pad was 417 by 438 metres. The garden outline falls about 88 metres towards the river. To make that whole area level, the engine cut 61.6 metres out of the hill. That is the pit, and the grey cliff was its wall.

The first fix capped the cut. That created a new problem. With a smaller cut, the pad could no longer reach the level it wanted from the hill side, so it filled in from the river side. It piled up 83 metres of ground on the shore of the Douro. A garden spur 80 metres high stood in the river.

So I had two bugs sharing one cause. The pad algorithm had no sense of proportion. It would move any amount of earth to keep a floor flat.

## The caps

The fix gives every pad a budget.

A cut may not exceed one third of the building height, with a minimum of 3 metres. Gardens and streets may cut 6 metres. A stadium may cut 10 metres. A fill may raise the ground by 2.5 metres at most, and never at all below 1.5 metres above sea level. This stops pads from filling the river. Slope faces may not be steeper than 1 to 1.8.

Where a pad stands higher than the land beside it, the engine builds retaining walls under its edge. The final count is 429 wall segments. They cost 858 triangles and one draw call.

The Palácio extent also changed. The base now sits on the plateau, an area of 270 by 245 metres, not on the full garden outline.

## The numbers

The worst cut fell from 61.6 metres to 10.8 metres. The worst fill fell from 83 metres to 11.2 metres.

The agent read the screenshots from before and after. The grey pit wall was gone. A grass plateau and street ribbons read sensibly. Two problems remained: a flat grey ring around the plateau, and bare lawn without trees.

## A note on the terrain data

The terrain data was not the cause, but it is not perfect. I compared it against the EU-DEM source on six reference points. The mean error was 12.0 metres for the data I use, and 12.4 metres for EU-DEM. They are about equally accurate. Hill tops still read 10 to 30 metres too low. Serra do Pilar shows 70 metres, and the real value is about 100.

I wrote this limit into the notes. A map that states its own error is easier to trust.

## Lessons

Do not blame the data first. Find the layer that changes the data. Here, that layer was the pad algorithm.

A fix can move a bug. Capping the cut made the fill worse. Check both sides of any change that balances two quantities.

Give every automatic correction a budget. An algorithm that can move any amount of earth will, sooner or later, move 61 metres of it.
