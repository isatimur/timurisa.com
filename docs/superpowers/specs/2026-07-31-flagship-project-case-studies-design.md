# Flagship Project Case Studies — Design

## Problem

The `/projects` page shows every project as a small card with a two-bullet-point modal.
That's fine for the long tail of side projects, but it flattens the six career-defining
engagements into the same shallow format as a weekend Chrome extension. Timur wants his
most significant projects told as real stories — situation, problem, approach, what went
wrong, outcome, and what he learned — connected to his role (architect/tech lead/CTO-type
work) and to the research he's doing for *From Copilot to Colleague*.

## Scope

Six flagship projects get a dedicated, deep-narrative case-study page. Everything else on
`/projects` is unchanged.

1. Sochi 2014 Olympics IT Infrastructure (Atos)
2. Sberbank.ru / UC2GET Platform Redevelopment (AT-Consulting)
3. IDS Reactive Billing Platform (IDS)
4. Enterprise Education Platform (Business Environment — 20-engineer team)
5. IRS Grant Management System (EastBanc Technologies)
6. From Copilot to Colleague (the book)

Out of scope for this spec: bespoke per-project illustration/art direction (deferred to a
later phase), Sanity-backed editing (blocked on a valid write token and unnecessary for
content that changes rarely), and any change to how the other ~16 projects render.

## Architecture

- New route: `app/projects/[slug]/page.tsx`, statically generated via `generateStaticParams`
  from the new case-study data file (one static page per flagship, six total).
- `app/projects/page.tsx` (the existing grid) is only touched to add a "Read the Full
  Story →" link on the six flagship cards. That link renders **only if** a matching entry
  exists in the case-study data file with populated content — this prevents ever shipping
  a linked-to page that is empty or placeholder text.
- Non-flagship projects keep the existing modal dialog behavior untouched.
- `generateMetadata` per slug for OG/Twitter tags, following the same pattern already used
  in `app/blog/[slug]/page.tsx`.
- 404 via Next's `notFound()` if a slug doesn't match any case study.

## Data

New file: `src/constants/caseStudies.ts`, exporting a `caseStudies` array. Plain TypeScript
data, not Sanity — this content changes rarely, and Sanity write access is currently
blocked on an invalid API token, so a code file is the right amount of infrastructure and
has zero dependency on that being resolved.

Each entry:

```ts
type CaseStudy = {
  slug: string;                 // e.g. "sochi-2014-olympics"
  projectRef: string;           // matches `name` in the existing `projects` array
  accent: 'ice' | 'sber-green' | 'ids-amber' | 'be-violet' | 'irs-navy' | 'cyan';
  role: string;                 // e.g. "Third-Level Support Engineer"
  timeframe: string;
  hook: string;                 // one-line summary shown in the hero
  situation: string;            // context: what existed before, what was needed
  problem: string;              // the specific technical/organizational challenge
  approach: string[];           // steps taken, decisions made, tech callouts
  pitfalls: string[];           // what broke, what went wrong — the honest part
  outcome: string;              // concrete result
  lessons: string[];            // what he learned
  bookTieIn?: { chapterTitle: string; url: string }; // link into fromcopilottocolleague.com
};
```

Content will be filled in one project at a time as Timur supplies real specifics (via a
follow-up structured fill-in list) — not fabricated, not generated generically. Until an
entry has real content, its page is not built/linked.

## Visual design

Grounded in what's already live sitewide, not a new look bolted on: `#030712` base,
Space Grotesk for display type, JetBrains Mono for labels/eyebrows, cyber-glass cards,
grid-pattern background. The case studies extend this system with one signature device
and a per-project accent.

**Signature device — "Case File" framing.** Timur's actual background is
support/incident/architecture work (Sochi: "third-level support," "incident management";
IDS: reactive billing; IRS: compliance). Each case study is framed as an incident/ops
report using that real vocabulary instead of generic numbered sections:

```
CASE_FILE // SOCHI-2014.LOG
ROLE: Third-Level Support Engineer · Atos · 2012–2014 · ★ Silver Accolade ×2
```

Section eyebrows, identical across all six pages: `SITREP` (Situation) → `ROOT_CAUSE`
(Problem) → `EXEC_LOG` (Approach) → `INCIDENT` (Pitfalls) → `RESOLUTION` (Outcome) →
`DEBRIEF` (Lessons).

**Per-project signal color** — the "own atmosphere" mechanism. One accent per page,
grounded in something real about that project, not an arbitrary color wheel:

| Case study | Accent | Why |
|---|---|---|
| Sochi 2014 Olympics | `#38BDF8` ice-blue + `#94A3B8` silver | Winter Games, the Silver Accolade itself |
| Sberbank / UC2GET | `#16A34A` deep green | Sberbank's actual brand green |
| IDS Reactive Billing | `#F59E0B` amber | ledger/invoice tone |
| Business Environment | `#8B5CF6` violet | the scale-up from dev to Head Architect |
| IRS Grant Management System | `#1E40AF` navy | federal/compliance tone |
| From Copilot to Colleague | `#22D3EE` cyan | the site's own brand — this story is home turf |

## Page template

Single-column, ~740px reading width (matches blog prose), read top to bottom like a
long-form piece — not a dashboard of cards:

1. Hero — back-to-projects link, `CASE_FILE` stamp, project name (Space Grotesk,
   signal-color gradient), role/company/timeframe/awards line, one-line hook
2. `SITREP` — The Situation
3. `ROOT_CAUSE` — The Problem
4. `EXEC_LOG` — The Approach (with tech-stack callouts)
5. `INCIDENT` — Pitfalls & What Broke
6. `RESOLUTION` — Outcome
7. `DEBRIEF` — Lessons Learned (with book-chapter citation callout where `bookTieIn` exists)
8. Footer — tags, back-to-projects link

Sections reveal on scroll via Framer Motion (already a project dependency, same pattern as
the existing `app/template.tsx` page-transition wrapper), each triggering once, respecting
`prefers-reduced-motion`. No tabs, no stepper — a scroll-read.

## Error handling

- Unknown slug → `notFound()` → Next's standard 404 page.
- Case-study card link is conditionally rendered based on data presence, so there is no
  path to a dead link from the grid.

## Testing / verification

- `npm run build` locally to confirm the new route and metadata generation compile cleanly.
- Playwright screenshot pass once at least one case study has real content: the updated
  `/projects` grid (flagship card shows the new link) and the case-study page itself,
  desktop and mobile widths, checking for console errors.
- Confirm the existing modal still works unchanged for a non-flagship project.

## Rollout

Ship the route/template now with the data file scaffolded (six entries, slugs and
metadata fields filled in, narrative fields empty). Populate narrative content one project
at a time as Timur provides real specifics — first candidate to fill in fully is whichever
project he wants to talk through first.
