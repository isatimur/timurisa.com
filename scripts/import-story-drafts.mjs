// Appends the markdown stories in content/drafts/stories/ to content/posts/archive.json.
// Header lines (title, slug, excerpt, category, date) come first, then a blank line, then the body.
// Body: "## " starts a heading, a blank line splits paragraphs, `x` marks code, [text](url) is a link.
// A slug already in the archive is replaced in place, so a rerun is safe.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const DIR = new URL('../content/drafts/stories/', import.meta.url);
const ARCHIVE = new URL('../content/posts/archive.json', import.meta.url);
const archive = JSON.parse(readFileSync(ARCHIVE, 'utf8'));

function inline(text, key) {
  const markDefs = [];
  const children = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/).filter(Boolean).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const defKey = `${key}l${markDefs.length}`;
      markDefs.push({ _type: 'link', _key: defKey, href: link[2] });
      return { _type: 'span', _key: `${key}s${i}`, text: link[1], marks: [defKey] };
    }
    const isCode = part.startsWith('`') && part.endsWith('`');
    return { _type: 'span', _key: `${key}s${i}`, text: isCode ? part.slice(1, -1) : part, marks: isCode ? ['code'] : [] };
  });
  return { markDefs, children };
}

let added = 0;
for (const file of readdirSync(DIR).filter(f => f.endsWith('.md')).sort()) {
  const [head, ...rest] = readFileSync(new URL(file, DIR), 'utf8').split(/\n\s*\n/);
  const meta = { category: [] };
  for (const line of head.split('\n')) {
    const [k, ...v] = line.split(':');
    const value = v.join(':').trim();
    if (k === 'category') meta.category.push(value);
    else meta[k] = value;
  }
  const existing = archive.findIndex(p => p.slug.current === meta.slug);
  const body = rest.map((chunk, i) => {
    const isHeading = chunk.startsWith('## ');
    const { markDefs, children } = inline(isHeading ? chunk.slice(3) : chunk.replace(/\n/g, ' '), `n${i}`);
    return { _type: 'block', _key: `n${i}`, style: isHeading ? 'h2' : 'normal', markDefs, children };
  });
  const entry = {
    _id: `archive-${meta.slug}`,
    title: meta.title,
    slug: { current: meta.slug },
    authorName: 'Timur Isachenko',
    publishedAt: meta.date,
    _updatedAt: meta.date,
    excerpt: meta.excerpt,
    categories: meta.category,
    body,
  };
  if (existing >= 0) archive[existing] = entry;
  else archive.push(entry);
  added++;
}

writeFileSync(ARCHIVE, JSON.stringify(archive, null, 2) + '\n');
console.log(`Wrote ${added} posts`);
