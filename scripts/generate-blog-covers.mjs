// Renders one 1200x630 cover per local post into public/blog-covers/<slug>.webp.
// Palette comes from DESIGN.md. The motif is seeded by the slug, so a rerun gives the same image.
import { readFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const OUT = new URL('../public/blog-covers/', import.meta.url);
const posts = JSON.parse(readFileSync(new URL('../content/posts/archive.json', import.meta.url), 'utf8'));

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rng(seed) {
  const bytes = createHash('sha256').update(seed).digest();
  let i = 0;
  return () => bytes[i++ % bytes.length] / 255;
}

function wrap(title, max = 20, maxLines = 4) {
  const lines = [];
  let line = '';
  for (const word of title.split(/\s+/)) {
    if (line && (line + ' ' + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? line + ' ' + word : word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

function motif(slug) {
  const r = rng(slug);
  const shapes = [];
  const cell = 70;
  const originX = 760;
  for (let gx = 0; gx < 6; gx++) {
    for (let gy = 0; gy < 9; gy++) {
      const v = r();
      const x = originX + gx * cell;
      const y = gy * cell;
      if (v > 0.82) shapes.push(`<rect x="${x + 8}" y="${y + 8}" width="${cell - 16}" height="${cell - 16}" fill="#ff7b42"/>`);
      else if (v > 0.66) shapes.push(`<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="${cell / 2 - 10}" fill="none" stroke="#ff7b42" stroke-width="3"/>`);
      else if (v > 0.52) shapes.push(`<path d="M${x + 8} ${y + cell - 8} L${x + cell - 8} ${y + 8}" stroke="#a7aaa2" stroke-width="3"/>`);
      else if (v > 0.4) shapes.push(`<rect x="${x + 8}" y="${y + 8}" width="${cell - 16}" height="${cell - 16}" fill="#232821" stroke="#656b5d" stroke-width="2"/>`);
    }
  }
  return shapes.join('');
}

function svg(post) {
  const slug = post.slug.current;
  const roomy = wrap(post.title);
  const lines = roomy.length > 3 ? wrap(post.title, 24) : roomy;
  const size = roomy.length > 3 ? 48 : 56;
  const tspans = lines
    .map((l, i) => `<tspan x="72" dy="${i === 0 ? 0 : size * 1.18}">${esc(l)}</tspan>`)
    .join('');
  const category = esc((post.categories?.[0] || 'Journal').toUpperCase());
  const grid = Array.from({ length: 7 }, (_, i) => `<path d="M${760 + i * 70} 0V${H}" stroke="#353833" stroke-width="1"/>`).join('')
    + Array.from({ length: 10 }, (_, i) => `<path d="M760 ${i * 70}H${W}" stroke="#353833" stroke-width="1"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#141615"/>
${grid}
${motif(slug)}
<text x="72" y="96" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="4" fill="#ff7b42">${category}</text>
<text x="72" y="210" font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="600" fill="#f0eee7">${tspans}</text>
<text x="72" y="${H - 64}" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#f0eee7">ti<tspan fill="#ff7b42">.</tspan></text>
<text x="132" y="${H - 64}" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#a7aaa2">timurisa.com</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const post of posts) {
  await sharp(Buffer.from(svg(post))).webp({ quality: 88 }).toFile(new URL(`${post.slug.current}.webp`, OUT).pathname);
}
console.log(`Wrote ${posts.length} covers to public/blog-covers/`);
