# Writing archive — 8 September 2026

## Delivered editions

Eight reviewed adaptations, approximately 4,200 words, now join the existing
four CMS articles. These are edited/expanded editions, not verbatim imports.
Each has a visible source link, original publication date, edit date, and a
specific editorial note. Article JSON-LD identifies its source through isBasedOn.
The canonical URL identifies the edited edition on timurisa.com.

| Blog edition | Original source | Original date |
| --- | --- | --- |
| Building Zonelyte: from an AI prototype to a tool my team could use | [Medium](https://medium.com/@isatimur_it/i-built-a-timezone-tool-for-distributed-teams-using-google-ai-studio-the-free-lovable-nobodys-daff28818a46) | 2 March 2026 |
| AI progress, and the developers living through it | [LinkedIn article](https://www.linkedin.com/pulse/ai-good-yearai-timur-isachenko-hilme) | 6 January 2026 |
| From a school charity market to a New Year’s Ideas Generator | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7279176894250442752/) | 29 December 2024 |
| Specifications that outlast the model | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7478908677849116673/) | 3 July 2026 |
| What local AI meant to my work at the end of 2024 | [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7279183129351737346/) | 29 December 2024 |
| Returning to coauthoring: from Apache Ignite to generative AI | [LinkedIn](https://www.linkedin.com/posts/timur-isachenko_generativeai-ai-machinelearning-activity-7239211275266732032-rNFN) | 10 September 2024 |
| Our generative AI book reaches a Russian edition | [LinkedIn](https://www.linkedin.com/posts/timur-isachenko_generativeai-llm-machinelearning-activity-7400201208717762561--GrW) | 28 November 2025 |
| Missing Directus translations? Check the related collection permissions | [Stack Overflow answer](https://stackoverflow.com/a/79729693) | 8 August 2025 |

Authorship was checked against the source author profile, article byline, or
original LinkedIn post. Reposts and other people's embedded posts were excluded.
The Medium date comes from its public RSS; the long LinkedIn article shows its
calendar date. LinkedIn feed dates are relative, so exact post timestamps were
recovered from the timestamp component of the observed activity IDs (ID >> 22,
Unix milliseconds). These are source-post dates, not dates of the new editions.
The original Directus answer supplies its displayed publication date.

## Editorial decisions

- Clarity: shortened the Zonelyte title, organised its build narrative, and
  removed dated pricing comparisons and the inconsistent late-2024/Gemini 3
  timeline. Kept the author's reported prototype time as a historical account.
- Evidence: removed unsupported AI adoption, productivity, funding, workforce,
  and health statistics from the January essay. Kept its personal perspective,
  separated observation from prediction, and removed unsourced quotations.
- Specificity: expanded the specification note with an explicitly illustrative
  timezone acceptance criterion; did not invent a customer or project outcome.
- Accuracy: changed the local-AI note's absolute privacy/cost claims to conditional
  tradeoffs. Did not claim a local deployment is inherently secure or cheaper.
- Attribution: retained Shamim Bhuiyan's contribution to the books. These launch
  notes are Timur's own posts about their collaboration, not Shamim's articles.
- Historical context: book deliveries, availability, stack versions and product
  details remain tied to their original dates rather than presented as current.
- Technical review: Directus's [query documentation](https://directus.com/docs/guides/connect/query-parameters)
  supports fields/filter/deep syntax. The adapted request uses an Authorization
  header and placeholder host/ID. It is an illustration, not an integration test.
- Scope: no private drafts, analytics, comments by other people, or third-party
  images were published. Existing CMS articles were not overwritten.

## QuickStart recovery and second batch

The [QuickStart author archive](https://blog.quickstartgenai.com/author/timur/)
indexes 14 entries under a shared Timur/Shamim profile. Some same-title Medium
posts are credited only to Shamim. A shared profile alone is insufficient to
attribute them to Timur. The user confirmed permission on 8 September to republish
all 14 with their original author credits. QuickStart pages timed out; full matching
editions were recovered for 12 technical posts from Shamim’s personal site and for
Timur’s agent-design essay from Ardor. These 13 condensed editions are now added.
The publishing announcement remains unpublished because only its excerpt could be
recovered. The original discovery list is:

1. Update on Our Website & Publishing Direction — 1 October 2025
2. Your AI is a Caged Genius. Here’s How to Set It Free — 27 June 2025
3. Modern AI Integrations, Part 3 — 3 June 2025
4. Modern AI Integrations, Part 2 — 1 June 2025
5. Modern AI Integrations, Part 1 — 31 May 2025
6. Create AI-Driven Content Pipelines with Local LLMs — 14 May 2025
7. Google Agent-to-Agent (A2A) Protocol Explained — 29 April 2025
8. OpenAI Agents SDK with local LLM — 21 March 2025
9. MCP: Connecting Local LLMs to Various Data Sources — 17 March 2025
10. Minion(s): A Simple Protocol — 16 March 2025
11. Web crawling for RAG with CrawlAI — 16 January 2025
12. How to Use Retrieval-Augmented Generation locally — 12 November 2024
13. How to Use Llama 3.2 Vision Models, Part 1 — 16 October 2024
14. First step: installing a local LLM — 8 October 2024

For example, Timur's [Crawl4AI announcement](https://www.linkedin.com/posts/timur-isachenko_web-crawling-for-rag-with-crawlai-activity-7285751792141819904-V1UL)
explicitly credits Shamim, despite an indexed page byline naming Timur.

The [Habr profile](https://habr.com/ru/users/isatimur/publications/articles/)
has three articles. Reactive Architecture and Swagger overlap with existing blog
subjects. The RxJava log-processing article is explicitly a translation of
another writer's work. None was duplicated or relabelled as new original writing.

## Storage and maintenance

The configured Sanity write credential returned `401 Session not found`.
Public CMS reads still work. The eight additions are therefore versioned in
`content/posts/archive.json`, with normal Portable Text bodies. `lib/posts.ts`
merges these with CMS summaries and resolves article detail pages; a local edition
wins a slug collision consistently in the index and detail route. Metadata and
page rendering share the same cached lookup. Search filters the combined summaries
in the browser, so no credential or post body is needed to search.

Edit the JSON for these local editions, or deliberately migrate them into Sanity
and remove their local records after write access is restored. They do not appear
in the Sanity studio merely because they appear on the public blog.

Verification: `npm run build`, then `python3 scripts/check-seo.py` against a running
production server. Browser checks cover new/existing searches, empty/reset states,
source notices and mobile article layout. A push is not evidence of deployment or
search-engine indexing; those states must be checked independently.

Verified on 8 September: production build passed; all 42 sitemap URLs passed the
SEO and publication-history checks. Browser search found both Zonelyte (local)
and Swagger (CMS), empty/reset states worked, and the Zonelyte article showed
its source notice with no horizontal overflow at 390px.


## Second-batch editorial and attribution checks

The archive now contains 21 local editions, alongside four CMS articles. Twelve
new editions retain Shamim Bhuiyan as author, with a visible profile link and
matching BlogPosting author URL. His name is also displayed on index cards and
included in search. The thirteenth is Timur's agent-design essay. No shared
QuickStart profile was treated as evidence of sole authorship.

The new editions are condensed adaptations, not full-text reproductions. Source
links point to the recovered full articles. Original dates use the QuickStart
listing, which can differ from the date of a later mirror; publication history
now separates first publication from the linked source edition. Tutorials are
explicitly historical and were not rerun with today's model/package versions.
No third-party images, copied sample dialogues, credentials, or runtime logs were
imported. Links within the MCP series and RAG sequence point to the local editions.

Corrections include MCP's expanded name and client/server responsibilities,
retrieved text versus embeddings, local inference versus remote tools/tracing,
vision understanding versus image generation, and current weather versus a future
forecast. Removed blanket claims of guaranteed income, zero cost, automatic
security, and unsupported performance. Current primary documentation consulted:

- https://docs.ollama.com/faq
- https://modelcontextprotocol.io/docs/learn/architecture
- https://openai.github.io/openai-agents-python/models/
- https://github.com/HazyResearch/minions

Still needed: the complete text of “Update on Our Website & Publishing Direction”
(1 October 2025). The public QuickStart RSS proxy supplied its date, author and
opening excerpt, but that is insufficient to reconstruct the full announcement.
