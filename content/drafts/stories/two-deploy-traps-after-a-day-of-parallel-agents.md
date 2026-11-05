title: Two deploy traps after a day of parallel agents
slug: two-deploy-traps-after-a-day-of-parallel-agents
excerpt: Five agents worked on one repo for a day. The code was fine. Deploying it was the risky part, and a handoff file kept me safe.
category: Engineering practice
category: AI agents
date: 2026-11-06T15:00:00.000Z

On 10 October I ran several AI agents in parallel on my Porto map. Each one owned a set of files. One worked on the coastline, one on the sea shader, one on landmarks, one on terrain, and one on loading speed.

They did good work. The risky part came afterwards, when I had to put it all on the live site. I wrote a handoff file for the day I would resume. This post is about what that file warned me about.

## Trap one: a commit that needs its neighbour

One commit changed the water code to import a new file, `coast.js`. That file did not exist at that commit. It only arrived in the next commit, from another agent.

Deploying the state between the two would break the build. The rule I wrote down: never deploy a state between the two commits. Deploy from the newest commit, after both are in.

This is a risk with parallel agents. Each agent commits its own files, and a commit from one agent can depend on a file that another agent has not committed yet.

## Trap two: a build that edits its own inputs

The real build command runs a step before the build. That step rewrites `data/fits.json`, a file that records how models fit their real-world footprints. One agent knew this and built to a temporary folder to avoid it.

If you run the real build for a deploy, expect that file to change. Review the change before you ship it. A build that edits tracked files is easy to forget, and the diff is easy to miss.

## A safe branch that was not safe

One agent produced a branch with lazy-loaded models and a lighter scene for weak devices. It passed all 15 of my verify checks. It looked ready to ship.

It was not. The branch left out the camera clamp, the boat models, the finer terrain, the pads, and the first wave of commits. Deploying it would have rolled back live work.

The agent's own deploy was also denied by the permission classifier, so nothing from that round reached the site. I wrote in the handoff: do not ship that branch. Deploy from `main`, after fixing the checks that fail.

Passing the checks told me the branch worked. It did not tell me the branch was complete.

## What the light scene did

The lighter scene is worth a note. I measured it on a software renderer with the CPU slowed four times, as a stress test.

Time to ready fell from 58.1 seconds to 5.0 seconds. The mean frame time fell from 2742 to 45 milliseconds. Draw calls fell from 159 to 9. GPU memory fell from 349 MB to 6.4 MB.

These are test-bench numbers, not real devices. The handoff says so, and it lists the limits: no weather, people, vehicles, or trees in the light scene, and it is not yet the default for low-end devices. I need real-device numbers first.

## What the handoff did

The handoff file listed each agent, what it finished, what it left half done, and which commits were local only. It named both traps. It gave the state of each repository and the live site. It also said which two verify checks were failing on `main`, so the first job on the next day was clear.

Agents can stop at any time, because of usage limits or errors. A handoff written before the stop turns a stop into a pause.

## Lessons

Treat deploying as its own job. The code can be right while the deploy is wrong.

Do not trust a green check to mean "complete". Compare what a branch contains with what the live site already has.

Write the traps down. The next reader, including me, will not know them.
