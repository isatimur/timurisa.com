// Appends the markdown stories in content/drafts/stories/ to content/posts/archive.json.
// Header lines (title, slug, excerpt, category, date) come first, then a blank line, then the body.
// Body: "## " starts a heading, a blank line splits paragraphs, "- " and "1. " start list items,
// a ``` fence holds a code block, `x` marks code, **x** is bold, *x* is italic, [text](url) is a link.
// A slug already in the archive is replaced in place, so a rerun is safe.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const DIR = new URL('../content/drafts/stories/', import.meta.url);
const ARCHIVE = new URL('../content/posts/archive.json', import.meta.url);
const archive = JSON.parse(readFileSync(ARCHIVE, 'utf8'));

const TOKEN = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/;

function inline(text, key) {
  const markDefs = [];
  const children = text.split(TOKEN).filter(Boolean).map((part, i) => {
    const k = `${key}s${i}`;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const defKey = `${key}l${markDefs.length}`;
      markDefs.push({ _type: 'link', _key: defKey, href: link[2] });
      return { _type: 'span', _key: k, text: link[1], marks: [defKey] };
    }
    if (part.length > 1 && part.startsWith('`') && part.endsWith('`')) return { _type: 'span', _key: k, text: part.slice(1, -1), marks: ['code'] };
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) return { _type: 'span', _key: k, text: part.slice(2, -2), marks: ['strong'] };
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) return { _type: 'span', _key: k, text: part.slice(1, -1), marks: ['em'] };
    return { _type: 'span', _key: k, text: part, marks: [] };
  });
  return { markDefs, children };
}

// Line-based body parser. A block's key is its position, so posts with only paragraphs and headings keep their old keys.
function parseBody(text) {
  const blocks = [];
  const push = ({ _type, ...rest }) => blocks.push({ _type, _key: `n${blocks.length}`, ...rest });
  const lines = text.split('\n');
  let para = [];
  let list = null; // { style, lines: [] } for the item being built
  const flushPara = () => {
    if (!para.length) return;
    const key = `n${blocks.length}`;
    push({ _type: 'block', style: 'normal', ...inline(para.join(' '), key) });
    para = [];
  };
  const flushItem = () => {
    if (!list) return;
    const key = `n${blocks.length}`;
    push({ _type: 'block', style: 'normal', listItem: list.style, level: 1, ...inline(list.lines.join(' '), key) });
    list = null;
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      flushPara(); flushItem();
      const code = [];
      for (i++; i < lines.length && !/^```\s*$/.test(lines[i]); i++) code.push(lines[i]);
      push({ _type: 'code', language: fence[1] || 'text', code: code.join('\n') });
      continue;
    }
    if (!line.trim()) { flushPara(); flushItem(); continue; }
    if (line.startsWith('## ') && !para.length) {
      flushItem();
      const key = `n${blocks.length}`;
      push({ _type: 'block', style: 'h2', ...inline(line.slice(3), key) });
      continue;
    }
    const item = line.match(/^(?:[-*]|\d+[.)])\s+(.*)$/);
    // A bullet may interrupt a paragraph. A numbered item may not, so "In 2026. Then" stays prose.
    if (item && (!para.length || /^[-*]\s/.test(line))) {
      flushPara(); flushItem();
      list = { style: /^\d/.test(line) ? 'number' : 'bullet', lines: [item[1]] };
      continue;
    }
    if (list && /^\s+\S/.test(line)) { list.lines.push(line.trim()); continue; }
    flushItem();
    para.push(line.trim());
  }
  flushPara(); flushItem();
  return blocks;
}

let added = 0;
for (const file of readdirSync(DIR).filter(f => f.endsWith('.md')).sort()) {
  const raw = readFileSync(new URL(file, DIR), 'utf8');
  const cut = raw.search(/\n\s*\n/);
  const head = raw.slice(0, cut);
  const meta = { category: [] };
  for (const line of head.split('\n')) {
    const [k, ...v] = line.split(':');
    const value = v.join(':').trim();
    if (k === 'category') meta.category.push(value);
    else meta[k] = value;
  }
  const existing = archive.findIndex(p => p.slug.current === meta.slug);
  const body = parseBody(raw.slice(cut).replace(/^\s+/, ''));
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
