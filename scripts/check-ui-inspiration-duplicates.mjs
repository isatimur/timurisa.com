// Usage: node scripts/check-ui-inspiration-duplicates.mjs articles/YYYY-MM-DD-ui-inspiration-capture/manifest.json
// Compares the target manifest with every earlier ui-inspiration-capture manifest.
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '');
if (!fs.existsSync(target)) {
  console.error('Usage: node scripts/check-ui-inspiration-duplicates.mjs <manifest.json>');
  process.exit(2);
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const normUrl = (u) => {
  if (!u) return '';
  try {
    const x = new URL(u);
    return `${x.hostname.replace(/^www\./, '')}${x.pathname.replace(/\/$/, '')}`.toLowerCase();
  } catch {
    return String(u).toLowerCase();
  }
};

const articlesDir = path.dirname(path.dirname(target));
const others = fs.readdirSync(articlesDir)
  .filter((d) => d.endsWith('-ui-inspiration-capture'))
  .map((d) => path.join(articlesDir, d, 'manifest.json'))
  .filter((f) => fs.existsSync(f) && path.resolve(f) !== target);

const seen = { title: new Map(), source: new Map(), image: new Map() };
for (const file of others) {
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const it of m.items || []) {
    seen.title.set(norm(it.title), file);
    if (it.sourceUrl) seen.source.set(normUrl(it.sourceUrl), file);
    if (it.imageUrl) seen.image.set(normUrl(it.imageUrl), file);
  }
}

const manifest = JSON.parse(fs.readFileSync(target, 'utf8'));
const duplicates = [];
const inBundle = { title: new Set(), source: new Set() };
for (const it of manifest.items || []) {
  const t = norm(it.title);
  const s = normUrl(it.sourceUrl);
  const i = normUrl(it.imageUrl);
  if (seen.title.has(t)) duplicates.push({ title: it.title, kind: 'title', previous: seen.title.get(t) });
  if (s && seen.source.has(s)) duplicates.push({ title: it.title, kind: 'sourceUrl', previous: seen.source.get(s) });
  if (i && seen.image.has(i)) duplicates.push({ title: it.title, kind: 'imageUrl', previous: seen.image.get(i) });
  if (inBundle.title.has(t)) duplicates.push({ title: it.title, kind: 'title-within-bundle' });
  if (s && inBundle.source.has(s)) duplicates.push({ title: it.title, kind: 'sourceUrl-within-bundle' });
  inBundle.title.add(t);
  if (s) inBundle.source.add(s);
}

console.log(JSON.stringify({
  manifest: path.relative(process.cwd(), target),
  itemCount: (manifest.items || []).length,
  comparedManifests: others.length,
  duplicateCount: duplicates.length,
  duplicates,
}, null, 2));
process.exit(duplicates.length ? 1 : 0);
