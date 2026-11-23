# FACTORY.md

The map for the timurisa.com content factory. Read this first. Keep it under 100 lines.

## What it does

A scheduled job writes one blog post per run, checks it, and opens a pull request. It never pushes to `main`. It messages the owner only when a human is needed.

## Rules the owner set

- Posts need a tap: the factory opens a PR, and the owner merges it on GitHub. Nothing publishes without that.
- Maintenance PRs (dependencies, link fixes) auto-merge when the `verify` check is green.
- No client or employer work as a source. `factory/banned-terms.txt` enforces part of this.
- Budget: at most one post per run, at most one run per day, and a hard turn cap on each agent.

## Sources (allowlist)

Only these. Read `factory/sources.txt` for the list. Anything else is off limits.

## Pipeline

1. **Pick.** Take the first unchecked topic in `factory/backlog.md`. If none, scan the allowlist for new commits, handoff notes, and book notes since `lastSourceScan` in `factory/state.json`, add 5 topics, then pick one.
2. **Write.** Follow `factory/prompts/writer.md`. Output: a draft in `content/drafts/stories/<slug>.md`, and `factory/sources/<slug>.md` listing each fact with a `Source:` path.
3. **Review.** A separate agent with no memory of the writing follows `factory/prompts/reviewer.md`. It writes `factory/reviews/<slug>.md` that ends with `VERDICT: PASS` or `VERDICT: FAIL`. One rewrite round is allowed.
4. **Build.** `node scripts/import-story-drafts.mjs`, then `node scripts/generate-blog-covers.mjs`. View the new cover.
5. **Gate.** `node scripts/factory/verify.mjs --build` must print `GATE: PASS`.
6. **PR.** Push the `factory/` branch, open a PR, message the owner on Telegram with the link.

## Writing rules

- Simplified Technical English. Short sentences, active voice, one term per thing.
- Facts only from sources. Mark estimates, limits, and what is not measured.
- No invented motives, numbers, or quotes. No slogans, forced contrasts, or "honest" signals.
- Credit talks and articles by link. Never copy their text.
- Keep the first-person claims that a source file supports. Cut the rest.
- No "Lesson" or "Takeaway" section that restates the article.

## When to message the owner (and only then)

- The gate fails twice for the same post.
- The reviewer fails the rewrite.
- A deploy of a merged PR does not reach Ready.
- A source seems to hold a secret or client data (report the fact and file, never the value).

## Files

- `scripts/factory/verify.mjs` is the gate. `scripts/factory/run.sh` is the runner. `factory/launchd/` holds the schedule.
- `.github/workflows/verify.yml` runs the gate on every PR. `.github/workflows/dependabot-automerge.yml` handles maintenance.
- `factory/state.json` holds run state. `factory/backlog.md` holds topics.

## News digest (Signal)

A weekly lane, separate from posts. `scripts/factory/news-run.sh` runs Fridays 16:00 via `com.timurisa.news.plist`.

1. `news-fetch.mjs` reads the feeds in `factory/news-sources.json` (public, https only). No agent touches it.
2. An agent with no web access reads `factory/news/candidates.json` and writes only `factory/news/commentary.json`: ids, a label, and a short note per item. Prompt: `factory/prompts/news.md`.
3. `news-assemble.mjs` builds `content/news/<date>.json`. Links, titles, sources and point counts come from the feeds, never from the agent.
4. `verify.mjs` checks the digest (6 to 8 items, 4+ sources, https links, allowlisted sources, short notes, no hype words, `talked-about` needs 300+ Hacker News points) and builds the site.
5. A PR opens for one-tap merge. The site shows it at `/news`, with an Atom feed at `/news/feed.xml`.

Writing rules for posts and digests live in `factory/WRITING-STANDARD.md`, with sources.
