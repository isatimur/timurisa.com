title: Giving Porto a real coastline
slug: giving-porto-a-real-coastline
excerpt: The sea in my Porto map now follows the OpenStreetMap coastline, with moles, piers, lighthouses, and foam that follows the waves.
category: Product engineering
category: Three.js
date: 2026-11-06T16:00:00.000Z

My Porto map is built at real scale, and the sea is part of the city. Porto's coast is not a simple line. The Douro meets the Atlantic among breakwaters, piers, and small harbours.

On 10 October the sea got a real shape. Two agents worked in parallel: one built the shore, and one built the look of the water.

## The shore from OpenStreetMap

The new sea follows the real OSM coastline. It is a ring of 981 points. The sea mesh is a quadtree and costs about 5,000 triangles. Around it sit a shore apron of 22,600 triangles, 127 moles and breakwaters at 24,000 triangles, and rock armour on the moles at 44,000 triangles. The armour only appears for medium landmark classes and above. The map also has 79 piers and 17 lighthouses and harbour lights.

In total, the shore adds 96,800 triangles. The overview of the whole city stands at 1.94 million triangles.

The work comes with scripts: one fetches the coast data, and one checks it. A check that fails when the data is wrong matters more than the data itself. The same idea drives my fit checks.

## One landmark, rebuilt

The mole at Felgueiras shows what real data does to a model. Its pin is now anchored to a real OSM node, 6 metres from the coast, at 41.14673 north and 8.6773 west.

The model is now the real OSM mole, rebuilt in 16 slabs, with a 10-metre hexagonal granite tower. The crown stands 4 metres above the root and 6 metres at the head. Those heights are my estimate, and the code says so.

Two other landmarks sit close to the new sea. Castelo do Queijo is 41 metres from the coast, and Praia dos Ingleses is 35 metres. The checks confirm that no landmark lies inside the new sea.

## The look of the water

The second agent rewrote the water shader. Crest foam now comes from the Jacobian of the wave field, so foam appears where waves actually fold. Shoreline swash uses the distance to the shore. The swell no longer repeats, because its phase is warped. The Atlantic reads blue-green. The estuary reads olive, and the two blend at the river mouth.

The sea mesh carries three attributes for this: distance to the shore, depth, and a mouth mask. At the time of writing, the shader uses the shore distance and the mouth mask. The depth is stored but not yet used for shoaling.

## A bug named after pixels

During this round we found a shadow artefact: a hatch pattern, like a screen door. The cause was small. The landmark focus effect, which fades buildings that block the view, kept one pixel in eight of each blocking landmark, in a 4 by 2 pattern. That pattern showed up in the shadows as a hatch. The fix drops the blocking landmark whole.

## What is not done

I keep this list in the handoff, so I can keep it here too. The Leixões docks are not water in OpenStreetMap, so they are missing. Beaches have no foam line. The Passeio Alegre pools are not done. The rocks and apron have only one level of detail. Green strips still cross the sea at the river mouth. Four tower-like boxes stand beside the Congregados church, because OSM buildings sit inside its outline.

Real data is honest in both directions. It gives you the shape of the coast, and it shows you where the map still has gaps.
