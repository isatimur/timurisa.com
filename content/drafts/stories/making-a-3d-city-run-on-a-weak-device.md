title: Making a 3D city run on a weak device, and where I fell short
slug: making-a-3d-city-run-on-a-weak-device
excerpt: Lazy-loaded models and a lite scene cut memory and start-up time in my Porto map. Some goals stayed unmet, and I measured them honestly.
category: Web performance
category: Three.js
date: 2026-11-06T17:00:00.000Z

My Porto map holds 70 landmarks, a whole city of buildings, and a lot of art. On a good laptop it runs well. On a weak phone it can struggle. On 10 October I worked on two ideas to help: load models lazily, and add a lite scene for the weakest devices.

This post gives the numbers I measured. It also gives the goals I missed.

## Lazy models

Models used to be built at start-up. Now each model is built in a worker, when the camera comes near. The model builders are split into 10 chunks. A queue caps how many models stay built, with a different cap for each performance class: 70 on the strongest, down to 8 on the weakest.

A script bakes the fit data for all models into one 56 KB file, and the build re-bakes it only when the inputs change. The check for this runs with the rest of my verify suite.

Results:
- The critical chunk fell from 299.5 KB to 237.5 KB gzipped, a drop of 21 percent.
- GPU memory fell from 672 MB to 543 MB on desktop, and from 335 MB to 214 MB on a high-end phone.
- CPU-side vertex arrays for the largest class fell from 124 MB to 61 MB.
- First frame and time to ready stayed the same, within noise.
- V8 heap stayed the same, because typed arrays live outside it.

## The lite scene

For the weakest devices, there is now a separate lite scene. It runs with `?scene=lite`, and the menu offers it as "Potato — lite scene". I measured it on a software renderer, with 1280 by 720 pixels and the CPU slowed four times.

- Time to ready fell from 58.1 s to 5.0 s.
- Mean frame time fell from 2,742 ms to 45 ms, which is 22 to 36 frames per second.
- The 95th percentile frame fell from 6,133 ms to 67 ms.
- The overview fell from 0.88 million triangles to 0.126 million.
- Draw calls fell from 159 to 9.
- GPU memory fell from 349 MB to 6.4 MB, and heap from 178 MB to 18 MB.

On a simulated low phone with `?quality=potato`, time to ready fell from 38.3 s to 13.7 s, and it ran at 60 frames per second.

These come from a test bench. They are not real devices.

## What I did not achieve

I did not make hitches near landmarks go away. Frames over 50 ms, when the camera approaches a landmark, were about the same before and after: 8, 6, and 10 before, and 8, 7, and 7 after, at four times CPU slowdown on the Low setting. The remaining hitches come from tile integration, clustered copies, and the first GPU upload.

I did not show the 1 ms phone slice that I aimed for.

The soak test fails. Over five minutes, GL memory grows past the gate by a hair on the Ultra setting, at 5.0 percent. It fails clearly on Low, at 14 percent. The working set of 70 models is larger than the Low cap of 14, so the map built 455 models and freed 403 in 300 seconds. The fix is to raise the Low cap or to stop freeing models near the camera.

## The lite scene has limits

It has no weather, people, vehicles, or trees. Browsers with only WebGL 1 cannot run three.js r186, so those users see a message. The performance governor cannot switch scenes at run time. If it learns that a device is weak, the next visit starts in the lite scene. And the lite scene is not yet the default for the Low class, because I need real-device numbers first.

One more item is unverified. Gold pins lacked glow in the "after" overview shots. I suspect the governor turned effects off under load, not the lazy models. I have not confirmed it.

## Lessons

Write the numbers that failed next to the ones that passed. A table with only wins is a poster.

Measure on a stress bench, and say that it is a bench. Real devices will disagree.

A lite mode is a safety net. It is not a reason to stop improving the full scene.
