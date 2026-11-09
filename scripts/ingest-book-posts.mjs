// Usage: node scripts/ingest-book-posts.mjs
// Turns content/drafts/book/*.md into `book-*` entries in content/posts/archive.json. Idempotent.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const draftsDir = path.join(repo, 'content/drafts/book');
const archiveFile = path.join(repo, 'content/posts/archive.json');
const BOOK_URL = 'https://fromcopilottocolleague.com/';
const DATE = '2026-10-29T00:00:00.000Z';
const TITLES = {
  0: 'From Copilot to Colleague',
  1: 'Chapter 1 — The Shift: From Assistant to Delegate',
  2: 'Chapter 2 — Taste Still Matters When Code Gets Cheap',
  3: 'Chapter 3 — Harnesses, Specs, and Codebases Agents Can Actually Use',
  4: 'Chapter 4 — Evals Are the Control System',
  5: 'Chapter 5 — Context Is Infrastructure',
  6: 'Chapter 6 — Runtimes, State, and the Human Control Plane',
  7: 'Chapter 7 — Security, Identity, and High-Stakes Trust',
  8: 'Chapter 8 — Realtime, Voice, and the Cost of Being Interruptible',
  9: 'Chapter 9 — The AI-Native Organization',
  10: 'Chapter 10 — What Endures',
};

const archive = JSON.parse(fs.readFileSync(archiveFile, 'utf8')).filter((p) => !p._id.startsWith('book-'));
const slugs = new Set(archive.map((p) => p.slug.current));
const files = fs.readdirSync(draftsDir).filter((f) => f.endsWith('.md')).sort();
const added = [];
const problems = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(draftsDir, f), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { problems.push(`${f}: no front matter`); continue; }
  const fm = Object.fromEntries(m[1].split('\n').map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));
  const cats = fm.categories.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim()).filter(Boolean);
  const chapter = Number(fm.chapter);
  const text = m[2].trim();
  const words = text.split(/\s+/).length;
  if (words < 380 || words > 760) problems.push(`${f}: ${words} words`);
  if (fm.excerpt.length < 90 || fm.excerpt.length > 175) problems.push(`${f}: excerpt ${fm.excerpt.length} chars`);
  if (slugs.has(fm.slug)) problems.push(`${f}: duplicate slug ${fm.slug}`);
  slugs.add(fm.slug);
  if (!TITLES[chapter]) problems.push(`${f}: bad chapter`);

  const body = [];
  text.split(/\n{2,}/).forEach((para, i) => {
    const key = `b${i}`;
    const h = para.match(/^##\s+(.*)$/);
    if (h) {
      body.push({ _type: 'block', _key: key, style: 'h2', markDefs: [], children: [{ _type: 'span', _key: `${key}s0`, text: h[1].trim(), marks: [] }] });
      return;
    }
    const markDefs = [];
    const children = [];
    let last = 0, n = 0;
    const clean = para.replace(/\n/g, ' ');
    for (const lm of clean.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
      if (lm.index > last) children.push({ _type: 'span', _key: `${key}s${n++}`, text: clean.slice(last, lm.index), marks: [] });
      const lk = `${key}l${markDefs.length}`;
      markDefs.push({ _type: 'link', _key: lk, href: lm[2] });
      children.push({ _type: 'span', _key: `${key}s${n++}`, text: lm[1], marks: [lk] });
      last = lm.index + lm[0].length;
    }
    if (last < clean.length) children.push({ _type: 'span', _key: `${key}s${n++}`, text: clean.slice(last), marks: [] });
    body.push({ _type: 'block', _key: key, style: 'normal', markDefs, children });
  });

  added.push({
    _id: `book-${fm.slug}`,
    title: fm.title,
    slug: { current: fm.slug },
    authorName: 'Timur Isachenko',
    publishedAt: DATE,
    _updatedAt: DATE,
    excerpt: fm.excerpt,
    categories: cats,
    source: {
      title: TITLES[chapter],
      url: BOOK_URL,
      platform: 'From Copilot to Colleague',
      publishedAt: DATE,
      editorialNote: chapter === 0
        ? 'Written for this blog from the book’s public README and method notes. Figures and claims come from those documents.'
        : `Written for this blog from ${TITLES[chapter].split(' — ')[0]} of the book. Ideas and quotations come from that chapter.`,
    },
    body,
  });
}

if (problems.length) { console.log('PROBLEMS\n' + problems.join('\n')); process.exit(1); }
fs.writeFileSync(archiveFile, JSON.stringify([...archive, ...added], null, 2) + '\n');
console.log('added', added.length, 'total', archive.length + added.length);
