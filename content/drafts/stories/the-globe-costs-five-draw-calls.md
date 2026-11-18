title: The globe costs five draw calls
slug: the-globe-costs-five-draw-calls
excerpt: Sixteen pins, labels, a panel and arcs added no draw calls to the globe. The numbers, the test setup, and what they do and do not prove. Plus the same question asked of the city maps.
category: Web performance
category: Three.js
date: 2026-11-17T12:00:00.000Z

The globe page must run on a phone. The repository has a phone probe, and its first commit says it was written before the move from five places to sixteen. That way each change could be measured against a baseline.

## The tiers

`src/tier.js` picks one of three tiers: full, lite, or static. Phones always get lite. The place cards are plain HTML, so they also work with script off or without WebGL.

## The probe

The script `scripts/perf-globe.mjs` runs against a preview build. It uses a 390 by 844 viewport at a pixel ratio of 3, on the lite tier. It slows the CPU four times through the browser's debugging protocol. It then scrolls 180 steps from the top of the page to the end of the globe story. Each result comes from three runs. It records the time between animation frames, the draw calls at the end view, and the triangle count.

## The numbers

On the build with five places, the mean frame interval was 18.5 ms in run 1 and 19.1 ms in run 2. The 95th percentile was 33.3 ms and 16.7 ms.

On the build with sixteen places, the mean was 16.7 and 16.8 ms, and the 95th percentile 16.8 ms in both runs. With Lisboa focused, so the panel and arcs were on screen, the mean stayed at 16.7 ms.

The draw calls stayed at 5 in every row. The triangle count stayed at 5,440.

## Why the cost did not grow

The pins, the labels, the panel, and the arcs are DOM and SVG elements laid over the canvas. They are not part of the 3D scene. Label placement runs once per drawn frame, for sixteen points. That is a small amount of arithmetic.

As a result, adding a place adds an element in the page, not a mesh in the scene.

## What the numbers do not prove

I measured on 14 November on an Apple-silicon Mac using the Metal graphics API. The CPU slowdown is a stress test. The result shows relative cost between builds. It does not show how a real phone behaves.

My own claims list says that no city map has had a test on a real phone. I have no record of a real-phone test for the globe either.

The frame interval of 16.7 ms is the refresh rate of a 60 Hz display. Once a build sits at the refresh rate, the probe cannot show an improvement. It can only show a regression.

## The same question for the city maps

On 17 November I asked for the same discipline in the city maps: do not draw the whole map, draw what is visible, and load and unload objects.

The first result came on Porto. Roads are now drawn by the cells in view. A deep link that opens a route improved from 22.7 seconds to 4.8 seconds in a headless run. Desktop frame time and map load time did not change.

I report both parts. The deep link got much faster. The two numbers I hoped to move stayed where they were. An earlier round on Porto cut draw calls from 499 to 281 at the same image.

Next: [labels that do not collide](/blog/labels-that-do-not-collide).
