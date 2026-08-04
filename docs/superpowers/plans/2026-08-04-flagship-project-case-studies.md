# Flagship Project Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give six flagship career projects their own deep, narrative case-study pages at `/projects/[slug]`, framed as engineering "case files" with per-project accent theming, while leaving the rest of `/projects` unchanged.

**Architecture:** A new typed data file (`src/constants/caseStudies.ts`) holds six scaffolded entries with real metadata but empty narrative fields. A new dynamic route (`app/projects/[slug]/page.tsx`) renders them through three new presentational components. `/projects` gets a conditional "Read the Full Story" link per flagship card, shown only once an entry's narrative fields are actually populated — so nothing links to an empty page.

**Tech Stack:** Next.js 15 (App Router, async `params`), TypeScript, Tailwind CSS, Framer Motion (`useReducedMotion`, `whileInView`), lucide-react icons.

## Global Constraints

- Never fabricate facts, quotes, or specifics not already published elsewhere on this site or in `src/constants/index.js`. Narrative fields (`situation`, `problem`, `approach`, `pitfalls`, `outcome`, `lessons`) stay empty until Timur supplies real content — do not invent placeholder war stories.
- Next.js 15: dynamic route `params` are `Promise<{ slug: string }>` and must be `await`ed — see `app/blog/[slug]/page.tsx:14,137` for the existing convention in this repo.
- Path alias `@/*` resolves to the repo root (`tsconfig.json`). Root-level `components/` holds `NavBar`; feature components live under `src/components/`. Follow this split — new components go in `src/components/case-study/`.
- Reuse existing brand tokens, do not introduce new ones: base background `#030712`, display font Space Grotesk (already global), label/mono font `"JetBrains Mono", monospace` (already aliased to `.font-mono`), existing `bg-grid-pattern` and `cyber-glass` utility classes.
- Commit messages must never include "Co-Authored-By", "Authored-By", or any AI attribution line.
- Use the `playwright` CLI directly for any e2e/visual verification — do not wrap it in another test runner.
- No unit test framework exists in this repo (`package.json` has no test script). The verification gate for every task is `npm run build` (type-check + compile), plus Playwright screenshots for the final visual QA pass in Task 8.

---

### Task 1: Case-study data file

**Files:**
- Create: `src/constants/caseStudies.ts`

**Interfaces:**
- Produces: `CaseStudyAccent { primary: string; secondary?: string }`, `CaseStudyBookTieIn { chapterTitle: string; url: string }`, `CaseStudy { slug, projectRef, company, role, timeframe, awards?, accent, hook, tags, situation, problem, approach, pitfalls, outcome, lessons, bookTieIn? }`, `caseStudies: CaseStudy[]`, `getCaseStudyBySlug(slug: string): CaseStudy | undefined`, `getCaseStudyByProjectRef(projectRef: string): CaseStudy | undefined`, `hasCaseStudyContent(caseStudy: CaseStudy): boolean`.

- [ ] **Step 1: Write the file**

```ts
export type CaseStudyAccent = {
    primary: string;
    secondary?: string;
};

export type CaseStudyBookTieIn = {
    chapterTitle: string;
    url: string;
};

export type CaseStudy = {
    slug: string;
    projectRef: string;
    company: string;
    role: string;
    timeframe: string;
    awards?: string;
    accent: CaseStudyAccent;
    hook: string;
    tags: string[];
    situation: string;
    problem: string;
    approach: string[];
    pitfalls: string[];
    outcome: string;
    lessons: string[];
    bookTieIn?: CaseStudyBookTieIn;
};

export const caseStudies: CaseStudy[] = [
    {
        slug: 'sochi-2014-olympics',
        projectRef: 'Sochi 2014 Olympics IT Infrastructure',
        company: 'Atos',
        role: 'CGS Duty Manager',
        timeframe: '2012 – 2014',
        awards: '★ Silver Accolade ×2',
        accent: { primary: '#38BDF8', secondary: '#94A3B8' },
        hook: 'Supported mission-critical IT infrastructure for the Sochi 2014 Olympic and Paralympic Games, building automation for package deployment and Identity Management — earning two Silver Accolade Awards.',
        tags: ['Identity Management', 'Automation', 'Incident Management'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'sberbank-uc2get-migration',
        projectRef: 'Sberbank.ru Platform Redevelopment',
        company: 'AT-Consulting',
        role: 'Expert / Consultant / Software Engineer',
        timeframe: '2014 – 2017',
        accent: { primary: '#16A34A' },
        hook: "Led integration of React widgets with the Java backend during Sberbank.ru's migration to the BackBase platform, resolving a critical UC2GET blocker that unblocked the full rollout.",
        tags: ['React', 'Java', 'BackBase'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'ids-reactive-billing-platform',
        projectRef: 'IDS Reactive Billing Platform',
        company: 'IDS',
        role: 'Team Lead / Solution Architect',
        timeframe: '2022 – 2024',
        accent: { primary: '#F59E0B' },
        hook: 'Team Lead and Solution Architect building a microservice-based billing product from the ground up — a custom Spring Cloud API Gateway, Keycloak SSO, Kafka event streaming, and reactive R2DBC data access.',
        tags: ['Kotlin', 'Spring WebFlux', 'R2DBC', 'Kafka', 'Keycloak'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'business-environment-education-platform',
        projectRef: 'Enterprise Education Platform',
        company: 'Business Environment',
        role: 'Head Architect',
        timeframe: '2017 – 2022',
        accent: { primary: '#8B5CF6' },
        hook: 'Head Architect leading a 20-engineer team building a microservices-based education platform, including payment processing and webhook integrations for third-party partners.',
        tags: ['Play Framework', 'MyBatis', 'PostgreSQL', 'Microservices'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'irs-grant-management-system',
        projectRef: 'IRS Grant Management System',
        company: 'EastBanc Technologies',
        role: 'Technical Lead',
        timeframe: '2023 – 2024',
        accent: { primary: '#1E40AF' },
        hook: 'Technical Lead across the Discovery and MVP phases of a federal Grant Management System for the IRS, translating complex compliance requirements into a reactive service architecture.',
        tags: ['Kotlin', 'Java 17', 'JOOQ', 'Spring WebFlux'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'from-copilot-to-colleague',
        projectRef: 'From Copilot to Colleague',
        company: 'AI Engineer Press',
        role: 'Co-Author',
        timeframe: '2026 – Present',
        accent: { primary: '#22D3EE' },
        hook: 'With Daniel Mohanrao. A source-anchored, evolving online book on AI engineering, where every claim links to the exact conference-talk video and timestamp it came from.',
        tags: ['AI Engineering', 'Source-Anchored Research', 'Open Access'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyByProjectRef(projectRef: string): CaseStudy | undefined {
    return caseStudies.find((caseStudy) => caseStudy.projectRef === projectRef);
}

export function hasCaseStudyContent(caseStudy: CaseStudy): boolean {
    return caseStudy.situation.trim().length > 0 && caseStudy.problem.trim().length > 0;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors (this file isn't imported anywhere yet, so it only needs to type-check on its own).

- [ ] **Step 3: Commit**

```bash
git add src/constants/caseStudies.ts
git commit -m "Add flagship case-study data model with six scaffolded entries"
```

---

### Task 2: Case-study CSS tokens

**Files:**
- Modify: `app/globals.css` (insert after the `:focus-visible` block, currently around line 119-123)

**Interfaces:**
- Consumes: nothing
- Produces: CSS classes `.case-study`, `.case-eyebrow`, `.case-title`, `.case-rule`, `.case-card`, `.case-bullet`, all scoped under `.case-study` and reading a `--case-accent` custom property that callers set inline per page.

- [ ] **Step 1: Add the CSS block**

Insert immediately after the existing `:focus-visible { ... }` rule in `app/globals.css`:

```css
.case-study {
    --case-accent: #22d3ee;
}

.case-study .case-eyebrow {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--case-accent);
}

.case-study .case-title {
    background-image: linear-gradient(90deg, var(--case-accent), #f8fafc);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.case-study .case-rule {
    border-color: color-mix(in srgb, var(--case-accent) 35%, transparent);
}

.case-study .case-card {
    border-color: color-mix(in srgb, var(--case-accent) 30%, transparent);
    background-color: color-mix(in srgb, var(--case-accent) 8%, #030712);
}

.case-study .case-bullet {
    background-color: var(--case-accent);
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds (pure CSS addition, unused until Task 6 wires it up, so nothing else can break).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "Add scoped CSS tokens for case-study accent theming"
```

---

### Task 3: `CaseFileHeader` component

**Files:**
- Create: `src/components/case-study/CaseFileHeader.tsx`

**Interfaces:**
- Consumes: `CaseStudy` type from `@/src/constants/caseStudies` (Task 1)
- Produces: `CaseFileHeader({ caseStudy: CaseStudy }): JSX.Element`, a default export named component used by Task 6.

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { CaseStudy } from '@/src/constants/caseStudies';

export function CaseFileHeader({ caseStudy }: { caseStudy: CaseStudy }) {
    const logId = caseStudy.slug.toUpperCase();

    return (
        <header className="max-w-[740px] mx-auto px-4 pt-28 pb-10">
            <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors mb-8"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Projects
            </Link>

            <div className="case-eyebrow mb-4">CASE_FILE // {logId}.LOG</div>

            <h1 className="case-title text-4xl md:text-5xl font-bold leading-tight mb-4">
                {caseStudy.projectRef}
            </h1>

            <p className="text-sm font-mono text-slate-400 mb-6">
                {caseStudy.role} · {caseStudy.company} · {caseStudy.timeframe}
                {caseStudy.awards ? ` · ${caseStudy.awards}` : ''}
            </p>

            <p className="text-lg text-slate-300 font-light leading-relaxed">
                {caseStudy.hook}
            </p>
        </header>
    );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds (component isn't imported yet, but must type-check standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/CaseFileHeader.tsx
git commit -m "Add CaseFileHeader component for case-study hero"
```

---

### Task 4: `CaseStudySection` component

**Files:**
- Create: `src/components/case-study/CaseStudySection.tsx`

**Interfaces:**
- Consumes: nothing from prior tasks (plain props)
- Produces: `CaseStudySection({ eyebrow: string; heading: string; paragraph?: string; items?: string[] }): JSX.Element`, used by Task 6 once per narrative section (SITREP, ROOT_CAUSE, EXEC_LOG, INCIDENT, RESOLUTION, DEBRIEF).

- [ ] **Step 1: Write the component**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface CaseStudySectionProps {
    eyebrow: string;
    heading: string;
    paragraph?: string;
    items?: string[];
}

export function CaseStudySection({ eyebrow, heading, paragraph, items }: CaseStudySectionProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="case-rule border-t pt-8 pb-10"
        >
            <div className="case-eyebrow mb-3">{eyebrow}</div>
            <h2 className="text-2xl font-bold text-white mb-4">{heading}</h2>

            {paragraph && (
                <p className="text-slate-300 leading-relaxed font-light">{paragraph}</p>
            )}

            {items && items.length > 0 && (
                <ul className="space-y-2.5">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-300 font-light">
                            <span className="case-bullet mt-2 w-1.5 h-1.5 rounded-full shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.section>
    );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/CaseStudySection.tsx
git commit -m "Add CaseStudySection component with scroll-reveal"
```

---

### Task 5: `BookTieIn` component

**Files:**
- Create: `src/components/case-study/BookTieIn.tsx`

**Interfaces:**
- Consumes: `CaseStudyBookTieIn` type from `@/src/constants/caseStudies` (Task 1)
- Produces: `BookTieIn({ tieIn: CaseStudyBookTieIn }): JSX.Element`, used by Task 6 only when a case study's `bookTieIn` is set.

- [ ] **Step 1: Write the component**

```tsx
import { BookOpen } from 'lucide-react';
import type { CaseStudyBookTieIn } from '@/src/constants/caseStudies';

export function BookTieIn({ tieIn }: { tieIn: CaseStudyBookTieIn }) {
    return (
        <a
            href={tieIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="case-card mt-6 flex items-center gap-3 rounded-xl border px-4 py-3.5 text-sm text-slate-300 hover:text-white transition-colors"
        >
            <BookOpen className="w-4 h-4 shrink-0" style={{ color: 'var(--case-accent)' }} />
            <span>
                Cited in <span className="font-semibold text-white">From Copilot to Colleague</span> — &ldquo;{tieIn.chapterTitle}&rdquo;
            </span>
        </a>
    );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/BookTieIn.tsx
git commit -m "Add BookTieIn citation callout component"
```

---

### Task 6: Dynamic case-study route

**Files:**
- Create: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: `caseStudies`, `getCaseStudyBySlug`, `hasCaseStudyContent` from `@/src/constants/caseStudies` (Task 1); `CaseFileHeader` (Task 3); `CaseStudySection` (Task 4); `BookTieIn` (Task 5); `.case-study` CSS scope (Task 2); `NavBar` from `@/components/NavBar`.
- Produces: the `/projects/[slug]` route itself — consumed by Task 7's links.

- [ ] **Step 1: Write the route**

```tsx
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { CaseFileHeader } from '@/src/components/case-study/CaseFileHeader';
import { CaseStudySection } from '@/src/components/case-study/CaseStudySection';
import { BookTieIn } from '@/src/components/case-study/BookTieIn';
import { caseStudies, getCaseStudyBySlug, hasCaseStudyContent } from '@/src/constants/caseStudies';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return caseStudies.filter(hasCaseStudyContent).map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = getCaseStudyBySlug(slug);

    if (!caseStudy || !hasCaseStudyContent(caseStudy)) {
        return { title: 'Case Study Not Found' };
    }

    const title = `${caseStudy.projectRef} — Case Study | Timur Isachenko`;

    return {
        title,
        description: caseStudy.hook,
        openGraph: { title, description: caseStudy.hook },
        twitter: { card: 'summary_large_image', title, description: caseStudy.hook },
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const caseStudy = getCaseStudyBySlug(slug);

    if (!caseStudy || !hasCaseStudyContent(caseStudy)) {
        notFound();
    }

    const accentStyle = { '--case-accent': caseStudy.accent.primary } as CSSProperties;

    return (
        <div className="case-study min-h-screen bg-[#030712] bg-grid-pattern" style={accentStyle}>
            <NavBar />
            <CaseFileHeader caseStudy={caseStudy} />

            <main className="max-w-[740px] mx-auto px-4 pb-24">
                <CaseStudySection eyebrow="SITREP" heading="The Situation" paragraph={caseStudy.situation} />
                <CaseStudySection eyebrow="ROOT_CAUSE" heading="The Problem" paragraph={caseStudy.problem} />
                <CaseStudySection eyebrow="EXEC_LOG" heading="The Approach" items={caseStudy.approach} />
                <CaseStudySection eyebrow="INCIDENT" heading="Pitfalls & What Broke" items={caseStudy.pitfalls} />
                <CaseStudySection eyebrow="RESOLUTION" heading="Outcome" paragraph={caseStudy.outcome} />
                <CaseStudySection eyebrow="DEBRIEF" heading="Lessons Learned" items={caseStudy.lessons} />

                {caseStudy.bookTieIn && <BookTieIn tieIn={caseStudy.bookTieIn} />}

                <footer className="case-rule pt-10 mt-2 border-t flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-slate-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Link
                        href="/projects"
                        className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        ← Back to all projects
                    </Link>
                </footer>
            </main>
        </div>
    );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds. Since every `caseStudies` entry currently has empty `situation`/`problem`, `generateStaticParams` returns an empty array — expect the build output to show no prerendered `/projects/[slug]` pages yet. This is correct for this task; Task 8 verifies actual rendering with temporary content.

- [ ] **Step 3: Commit**

```bash
git add "app/projects/[slug]/page.tsx"
git commit -m "Add dynamic case-study route with Case File template"
```

---

### Task 7: Wire case-study links into `/projects`

**Files:**
- Modify: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `getCaseStudyByProjectRef`, `hasCaseStudyContent` from `@/src/constants/caseStudies` (Task 1)
- Produces: nothing new for later tasks — this is the last piece of the feature's wiring.

- [ ] **Step 1: Add imports**

At the top of `app/projects/page.tsx`, alongside the existing imports:

```tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getCaseStudyByProjectRef, hasCaseStudyContent } from '@/src/constants/caseStudies';
```

- [ ] **Step 2: Update the side-projects card block**

Find this block (currently rendering `sideProjects.map((project) => (` with a `<div>` wrapping a `<button>` and an optional platforms block). Change the arrow function to a block body so a `caseStudy` lookup can happen per project, and add the case-study link right after the closing `</button>`:

```tsx
{sideProjects.map((project) => {
    const caseStudy = getCaseStudyByProjectRef(project.name);

    return (
        <div
            key={project.name}
            className="p-6 rounded-2xl cyber-glass border border-emerald-500/20 cyber-glass-hover flex flex-col"
        >
            <button
                onClick={() => setSelected(project)}
                className="text-left flex flex-col flex-grow group"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                        <Rocket className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-emerald-300 font-mono text-xs truncate">{project.company_name}</div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                            <Calendar className="w-3 h-3" />
                            {project.date}
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                    {project.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow font-light">
                    {project.description}
                </p>
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-mono group-hover:gap-2 transition-all mb-4">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
            </button>

            {caseStudy && hasCaseStudyContent(caseStudy) && (
                <Link
                    href={`/projects/${caseStudy.slug}`}
                    className="mb-4 inline-flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
                    style={{ color: caseStudy.accent.primary }}
                >
                    Read the Full Story <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
            )}

            {project.platforms && project.platforms.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-500/10">
                    {project.platforms.map((platform) => {
                        const Icon = PLATFORM_ICONS[platform.type];
                        return (
                            <a
                                key={platform.url}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {platform.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
})}
```

- [ ] **Step 3: Update the main grid card block**

Find the `filteredProjects.map((project) => (` block that currently renders a `<button>` as the card root. Change it to a `<div>` root with an inner `<button>` (so the case-study `<Link>` isn't nested inside a `<button>`, which is invalid HTML), and add the case-study link after the button:

```tsx
{filteredProjects.map((project) => {
    const caseStudy = getCaseStudyByProjectRef(project.name);

    return (
        <div
            key={project.name}
            className="p-6 rounded-2xl cyber-glass border border-cyan-500/20 cyber-glass-hover flex flex-col group"
        >
            <button
                onClick={() => setSelected(project)}
                className="text-left flex flex-col flex-grow"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 p-2 flex items-center justify-center shrink-0">
                        {project.icon ? (
                            <Image
                                src={project.icon}
                                alt={project.company_name}
                                fill
                                sizes="48px"
                                className="object-contain p-2"
                            />
                        ) : (
                            <Rocket className="w-5 h-5 text-cyan-400" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <div className="text-cyan-300 font-mono text-xs truncate">{project.company_name}</div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                            <Calendar className="w-3 h-3" />
                            {project.date}
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {project.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow font-light">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-cyan-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <span className="inline-flex items-center gap-1 text-cyan-400 text-xs font-mono group-hover:gap-2 transition-all">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
            </button>

            {caseStudy && hasCaseStudyContent(caseStudy) && (
                <Link
                    href={`/projects/${caseStudy.slug}`}
                    className="mt-4 pt-4 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
                    style={{ color: caseStudy.accent.primary }}
                >
                    Read the Full Story <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
            )}
        </div>
    );
})}
```

- [ ] **Step 4: Verify it compiles**

Run: `npm run build`
Expected: build succeeds. Since no case study currently has content, no "Read the Full Story" links render yet — `/projects` should look and behave exactly as before.

- [ ] **Step 5: Commit**

```bash
git add app/projects/page.tsx
git commit -m "Link flagship project cards to their case-study pages"
```

---

### Task 8: Visual verification, ship

**Files:**
- Temporarily modify then revert: `src/constants/caseStudies.ts`

- [ ] **Step 1: Temporarily populate two entries for a smoke test**

Edit `src/constants/caseStudies.ts` and fill in the `sochi-2014-olympics` and `ids-reactive-billing-platform` entries' narrative fields with clearly-labeled smoke-test text, e.g.:

```ts
situation: 'SMOKE TEST — verifying template rendering, not real content.',
problem: 'SMOKE TEST — verifying template rendering, not real content.',
approach: ['SMOKE TEST bullet one.', 'SMOKE TEST bullet two.'],
pitfalls: ['SMOKE TEST bullet one.', 'SMOKE TEST bullet two.'],
outcome: 'SMOKE TEST — verifying template rendering, not real content.',
lessons: ['SMOKE TEST bullet one.', 'SMOKE TEST bullet two.'],
```

Do this for exactly these two entries (they carry the two most visually distinct accents — ice-blue and amber) so the theming mechanism is actually exercised, not just one color.

- [ ] **Step 2: Build with smoke-test content**

Run: `npm run build`
Expected: build succeeds and the output lists `/projects/sochi-2014-olympics` and `/projects/ids-reactive-billing-platform` as prerendered static pages.

- [ ] **Step 3: Start the app and capture screenshots**

Run: `npm run build && npm run start` (or `npm run dev` if faster to iterate), then use the `playwright` CLI directly (per this repo's standing rule — no wrapping test runner) to screenshot, at both a desktop (1440px) and mobile (390px) viewport:
- `/projects` — confirm exactly two cards ("Sochi 2014 Olympics IT Infrastructure" and "IDS Reactive Billing Platform") show a "Read the Full Story" link in their respective accent color, and no other cards do.
- `/projects/sochi-2014-olympics` — confirm the CASE_FILE stamp, ice-blue gradient title, role/company/timeframe/award line, all six SITREP/ROOT_CAUSE/EXEC_LOG/INCIDENT/RESOLUTION/DEBRIEF sections, tags, and back-link render; scroll to confirm sections reveal.
- `/projects/ids-reactive-billing-platform` — same checks, confirming the amber accent renders distinctly from Sochi's ice-blue.

Check the browser console on each page for errors.

Expected: no console errors, both pages visually match the approved design (Case File header, accent-tinted eyebrows/rules/bullets, six sections, tags footer), and `/projects` shows the link on exactly the two smoke-tested cards.

- [ ] **Step 4: Revert the smoke-test content**

```bash
git checkout -- src/constants/caseStudies.ts
```

This restores the clean, all-empty version already committed in Task 1 — no smoke-test text ships.

- [ ] **Step 5: Final clean build**

Run: `npm run build`
Expected: build succeeds, and the output shows zero prerendered `/projects/[slug]` pages again (matching the intended ship state: infrastructure live, no flagship content published yet).

- [ ] **Step 6: Push**

```bash
git push origin main
```

- [ ] **Step 7: Deploy to Vercel production**

```bash
vercel --prod --yes
```

Wait for the deployment to finish (watch for an `Aliased:` line in the output, or use the Monitor tool if running this in the background).

- [ ] **Step 8: Verify production**

Screenshot the live `/projects` page with Playwright and confirm it renders identically to before this feature shipped (no flagship links visible yet, no console errors, no regression in the existing modal behavior for any project card).
