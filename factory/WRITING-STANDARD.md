# Writing standard

Every factory post and digest follows this list. The writer reads it first. The reviewer fails a post that breaks it.

It comes from two kinds of source. Google's own guidance on helpful content is the primary one. Developer-blog guides from draft.dev, daily.dev, DEV Community and IEEE-USA InSight are secondary. They agree with each other and with Google. Their numbers (for example "700 to 1500 words") are rules of thumb, not measured facts.

## A post must have

1. **A real question.** Start from a problem someone met, not a broad topic. "Why did the cache stop invalidating after we added a read replica" beats "Redis caching".
2. **Original information.** The post says something the sources alone do not: a measurement, a failure, a decision, a run of real commands. A summary of other people's work adds nothing and fails.
3. **Proof the reader can check.** Real commands and output where a file shows them, versions, dates, commit counts, and links to the repo and its commits. No "really fast" without a number. Never claim a run that did not happen. Say what you did not measure. Factory writers cannot run commands, so the runner supplies git facts in `factory/evidence/`.
4. **A descriptive, non-sensational title** that states what the reader will learn. No clickbait.
5. **The answer early.** The first paragraph says who the post is for, what problem it solves, and what the reader gets. Headings alone tell the story.
6. **Short paragraphs** of two to four sentences. Simplified Technical English. Active voice. One term per thing.
7. **Honest failures.** Show the errors and dead ends. Cut hedging such as "I think".
8. **Disclosure.** Factory posts end with one line saying how they were made: an AI agent drafted from the listed sources, a second agent reviewed, Timur merged.

## A post must not be

- Made to rank. No topic picked because it trends. No word-count target. No changed dates to look fresh.
- A rewrite of someone else's page.
- One of many posts made with no care per post. One post a day is the ceiling.
- A claim of expertise or a client the owner does not have.

## News digest rules

- A digest links to the original. It never copies the text. Notes are one or two sentences in the writer's own words, about 240 characters at most.
- A note restates what the title and feed summary say. It adds no fact that is not in them.
- Each item carries a label: `release`, `spec`, `research`, `opinion`, `vendor-claim`, or `talked-about`. Label hype as hype. `talked-about` means the item scored 300 or more points on Hacker News this week. It says nothing about quality.
- Links and titles come from the feed, never from an agent.

## Sources

- Google Search Central, "Creating helpful, reliable, people-first content": https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- draft.dev, "Best Technical Blogs for Developers in 2026": https://draft.dev/learn/technical-blogs
- daily.dev, "Checklist: Writing Blogs Developers Read": https://business.daily.dev/resources/checklist-writing-blogs-developers-read/
- IEEE-USA InSight, "How to Write a Compelling Technical Blog": https://insight.ieeeusa.org/articles/how-to-write-a-compelling-technical-blog/
- DEV Community (AWS), "How to Write Compelling Technical Blogs": https://dev.to/aws/how-to-write-compelling-technical-blogs-4ohh
- daily.dev, "Developer Email Marketing That Gets Opened": https://business.daily.dev/resources/developer-email-marketing-gets-opened-newsletters-drips-product-updates/
- Paved, "TLDR Newsletter and the Art of Content Curation": https://www.paved.com/blog/tldr-newsletter-curation/
