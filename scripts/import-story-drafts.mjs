// Appends the markdown stories in content/drafts/stories/ to content/posts/archive.json.
// Header lines (title, slug, excerpt, category, date) come first, then a blank line, then the body.
// Body: "## " starts a heading, a blank line splits paragraphs, `x` marks code.
// Slugs already in the archive are skipped, so a rerun is safe.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const DIR = new URL('../content/drafts/stories/', import.meta.url);
const ARCHIVE = new URL('../content/posts/archive.json', import.meta.url);
const archive = JSON.parse(readFileSync(ARCHIVE, 'utf8'));
const seen = new Set(archive.map(p => p.slug.current));

function spans(text, key) {
  const parts = text.split(/(`[^`]+`)/).filter(Boolean);
  return parts.map((part, i) => {
    const isCode = part.startsWith('`') && part.endsWith('`');
    return { _type: 'span', _key: `${key}s${i}`, text: isCode ? part.slice(1, -1) : part, marks: isCode ? ['code'] : [] };
  });
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
  if (seen.has(meta.slug)) continue;
  const body = rest.map((chunk, i) => {
    const isHeading = chunk.startsWith('## ');
    return {
      _type: 'block',
      _key: `n${i}`,
      style: isHeading ? 'h2' : 'normal',
      markDefs: [],
      children: spans(isHeading ? chunk.slice(3) : chunk.replace(/\n/g, ' '), `n${i}`),
    };
  });
  archive.push({
    _id: `archive-${meta.slug}`,
    title: meta.title,
    slug: { current: meta.slug },
    authorName: 'Timur Isachenko',
    publishedAt: meta.date,
    _updatedAt: meta.date,
    excerpt: meta.excerpt,
    categories: meta.category,
    body,
  });
  added++;
}

writeFileSync(ARCHIVE, JSON.stringify(archive, null, 2) + '\n');
console.log(`Added ${added} posts`);
