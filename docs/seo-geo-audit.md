# SEO and AI search improvements — 7 September 2026

## Coverage baseline

User-supplied Search Console export: `timurisa.com-Coverage-2026-09-07`.
The latest chart row (4 September) reports 3 indexed and 3 excluded pages.
Critical issues: 2 pages with redirects and 1 crawled but currently not indexed.
The CSVs do not contain URL-level examples. These statuses cannot be attributed
to specific pages or declared resolved from this export. Redirect exclusions may
be intentional (for example, alternate hosts or old URLs).

## Implemented

- Removed the homepage canonical inherited by unrelated routes. Public pages
  now have self-referencing canonical and Open Graph URLs, unique titles, and
  relevant descriptions. Article descriptions fall back to actual article text.
- Included all 23 project detail pages in the sitemap. Removed the about fragment
  and artificial current-time modification dates. CMS article dates remain.
- Rendered the published article archive on the server so every article link is
  available without JavaScript. Search remains interactive after hydration.
- Added Person/WebSite structured identity using existing public profile links;
  corrected article publisher from an invented organization to a person.
  BlogPosting includes canonical identity, publication/modification dates and
  author. Book metadata comes directly from the visible book collection.
- Added visible author context and links to experience, books, and projects.
- Added a 1200×630 social preview matching the site's design.
- Added noindex for the Sanity studio and covered its bare URL in robots.txt.
- Public crawling and snippet access remain enabled; no new bot-specific
  training permissions were introduced.

## Verification

Run `npm run build`, start the production server, then run
`python3 scripts/check-seo.py`. The regression check inspects server HTML for
all sitemap pages, canonical/title/description/social tags, crawlable archive
links, parsed JSON-LD, real 404 responses, admin noindex, robots and image size.
Production build passed (39 generated routes). All 34 sitemap pages passed the
regression check. Browser verification confirmed the archive renders and the
Swagger search returns the matching article. One existing lint warning remains
in the unused FuturisticHero component. These are implementation checks, not
proof of indexing or AI citations.

## Search Console follow-up

After deployment, resubmit `https://timurisa.com/sitemap.xml`. Inspect the exact
URLs behind both exclusion reasons and compare Google's selected canonical
with the declared canonical. Request indexing for important updated pages.
Check eligibility settings for Google's generative AI features in Search Console.
Monitor indexed pages, non-brand impressions, clicks and AI referrals against
this baseline. Do not treat a successful local build or push as recrawling evidence.

## Primary references

Google's [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
emphasizes ordinary SEO, useful original content, crawlability and indexing;
there is no special required AI markup and Google does not use llms.txt for ranking.
Its [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
calls for canonical URLs and accurate modification dates. These changes improve
discovery and interpretation; they cannot guarantee rankings or inclusion.
