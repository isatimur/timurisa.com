title: Moving a small site off WordPress to a Cloudflare Worker
slug: moving-a-site-off-wordpress-to-cloudflare
excerpt: A WordPress site became a static site on a Cloudflare Worker, with the same design and a mobile PageSpeed score of 93. What worked and what did not.
category: Web performance
category: Cloudflare
date: 2026-11-06T11:00:00.000Z

In October I moved a small professional site off WordPress. The old site ran on WordPress and Elementor. The new one is a static site served by a Cloudflare Worker. It went live on 19 October.

The owner gave me one hard rule: the design must stay pixel-identical. That rule shaped every decision.

## The setup

The source is a folder with a `wrangler.jsonc` file and a `public` directory. One command deploys it: `npx wrangler deploy`. I used Workers static assets with an SPA fallback. Cloudflare Pages is the older route, and I did not need it.

A few limits showed up early. The `_redirects` file only supports 301 redirects. Workers assets do not support rewrites that return 200. Old WordPress URLs now redirect with plain 301s.

I also keep a plain-language set of diagrams for the owners: a system map, the update loop, and a "the site looks wrong" decision tree. A site is only maintainable if the person who owns it can read the manual.

## Speed work, with measurements

I measured with real PageSpeed on 20 October. Mobile scored 93.

Here is what moved the score, and what did not.

Google Fonts load from a small script in the head, right after the first paint. Requesting them earlier cost about 25 points in the Lantern simulation. Self-hosting the fonts scored worse than the Google request in my tests. Deferring the main script also scored worse.

Images are WebP with a `srcset`. The `src` stays a JPEG for old browsers. The three.js code on the page is minified and loads lazily.

I tested each idea and kept only the ones that the numbers supported. Several ideas that sound right, like local fonts, were wrong here.

## Two traps

First, caching. Files under `/assets` and `/vendor` are cached as immutable for a year. This is fast, and it has a catch: a changed file needs a new file name. Forgetting this means visitors see old files for a year.

Second, the page is rendered in the browser by a script. It loads React from `/vendor/react` and checks it against a hash. Cloudflare features that rewrite JavaScript, such as Rocket Loader, would break that check. I left them off.

## The day the old site would not go away

After the DNS change, my own Mac kept showing the old site for a day. My home router had cached the old delegation. The site was live for everyone else.

The fix for testing is a direct request that skips the cache:

`curl --resolve example.com:443:<worker-ip> https://example.com`

A browser can lie about DNS for a day. A direct request cannot.

## How I checked the design

"Pixel-identical" needs proof. I took before and after screenshots of all six routes at 390 pixels and at 1440 pixels. Then I compared them.

One gotcha: full-page screenshots leave lazy images blank. Scroll the page first, then capture.

## Lessons

Measure before you tune. Keep a backup of the old public folder, and keep it out of the deploy. Write the manual for the owner on day one. And never trust one browser to tell you that DNS has changed.
