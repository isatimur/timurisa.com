title: Capturing UI inspiration with headless Playwright
slug: capturing-ui-inspiration-with-headless-playwright
excerpt: How I collect daily UI inspiration from product sites with a headless browser, and the small rules that keep the captures clean.
category: Developer workflow
category: Design
date: 2026-11-06T13:00:00.000Z

I keep a habit: each day I capture a few well-made product interfaces, so I can study how they handle layout, motion, and detail. On 29 October I ran it for five sites: Linear, Resend, Raycast, Cursor, and Framer.

This post is about the tooling, not the sites. The captures are for my own study. I do not republish them.

## The tool I did not have

My capture workflow was written for the in-app browser of another coding tool. My Claude Code sessions do not have that browser. I could have stopped there. Instead I asked for a substitute: headless Playwright. I approved it, and the run went ahead.

The setup is small. I use `playwright-core` from the Playwright command-line package, with the headless Chromium shell that is already in its cache. Crops are made with `sharp`, which my site already uses. Frames and short videos come from `ffmpeg`.

The scripts live in a temporary folder. If the folder is gone, I rebuild them. They are not the valuable part. The rules are.

## Rules that keep captures clean

Decline the cookie banner first. I click "Reject" before I capture anything. A banner in the corner of every screenshot is noise, and accepting it is not my choice to make for a study run.

Scroll in steps. A page that loads images lazily gives you blank boxes in a full-page screenshot. I scroll down in small steps and wait two seconds before each capture.

Accept that some things only draw on screen. One card on the Raycast page, the one called "AI Extensions", only renders while it is visible. I do not fight this. I write down which cards behave this way and move on. A note in the manifest is better than a hack in the script.

## A checker for repeats

A daily habit has one risk: capturing the same site twice and calling it new. A small script guards against this. It compares each new bundle against the earlier manifests and flags duplicates.

The checker also gives me a rule for the next run. Rotate away from the five sites I just did. Each run gets a new dated folder in the same repository, with its own manifest.

## A note on process

I keep the bundle in the repository of my own site, under `articles/` in a dated folder. Pushing to the main branch deploys the site, so I treat a push as a publishing step. I push the capture commits when I mean to.

One habit from this run is worth copying. When a tool I need is missing, I name the gap, pick a close substitute, say what I picked, and carry on. I do not wait for the perfect setup.

## The loose end

The capture scripts live in a temporary folder, so I rebuild them from my notes when they disappear. The rules above are what survives. The duplicate checker is the one script that lives in the repository.
