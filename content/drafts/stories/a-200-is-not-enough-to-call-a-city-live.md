title: A 200 is not enough to call a city live
slug: a-200-is-not-enough-to-call-a-city-live
excerpt: Two of my map addresses answered with other people's sites. How that changed the rule for what "live" means, and why my maps now live on subdomains.
category: Product engineering
category: Web performance
date: 2026-11-17T10:00:00.000Z

On 14 November I tested the addresses I had planned for two new maps. `lisboa-3d.vercel.app` and `faro-3d.vercel.app` both answered with a normal 200. Both were other people's sites.

Names on `*.vercel.app` are first come, first served. A plain "does it answer?" check would have called both of my cities live. A visitor would have landed on a stranger's page.

## The rule

The README now states it: a place counts as live when its address answers 200 with one of our city maps that names it. A 200 alone is not enough.

Two commands enforce the rule. `npm run check` validates the city data and the landmarks, and every place marked live must answer. `npm run check:live` tests every address and prints which `live` flags are wrong.

## How a map names itself

Each place record has a ready flag, or null when the site exposes none. Some maps run on a different engine and have no such flag. Madeira and Pena Park are two. For those, the record lists the marks that appear in the page `<title>`, and the check looks for them.

The check does not judge quality. It answers one question: is this page ours, and does it name this place?

## "Coming soon" never links

A place that is not live shows a card with a clear label. The card is an `<article>` that can take focus but has no link. A visitor cannot click through to a dead or foreign page. The check and the card enforce the same promise from two sides.

## The fix: subdomains of my own domain

On 15 November I told the agent to decide everything itself. It chose a subdomain for each new map: `https://<name>.portugal-3d.com`, with `douro` for Pinhão. Subdomains of my own domain cannot belong to a stranger.

The setup needs one wildcard DNS record at the registrar. I added it. After that, each repository gets its own deploy, and the subdomain is attached to it with `vercel domains add`. Then I run the live check and flip the `live` flag.

Until the wildcard existed, the globe linked the eleven new maps at their Vercel addresses. Two of those names carried a suffix that Vercel had added, because the plain names were taken. When the record went live, all eleven subdomains served their maps with certificates. The globe switched its links to the subdomains.

On 16 November I moved Guimarães, Barcelos and Arouca to subdomains too. Braga and Porto keep their own domains, `braga-3d.com` and `porto-3d.com`. Pena Park stays on its Vercel address.

## What I take from it

Test the claim, not the status code. "Does it return 200?" and "is this our page?" are different questions. Only the second one protects a visitor.

Own the namespace. A shared hostname is fine for a prototype. For a public front door, put every address under a name you control.

Keep the check in the repository, so the command knows which flags are right.

The next article covers [what happens after a visitor picks a city](/blog/scroll-dive-and-the-way-back).
