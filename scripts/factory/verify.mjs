#!/usr/bin/env node
// Factory gate. Exit 0 only if every check passes. A skipped check is a failure.
// Usage: node scripts/factory/verify.mjs [--build]
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const rel = (p) => path.join(root, p)
const failures = []
const fail = (check, msg) => failures.push(`[${check}] ${msg}`)
const passed = []

const archivePath = rel('content/posts/archive.json')
const archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'))
const slugs = archive.map((p) => p.slug.current)

// 1. Unique slugs
{
  const dup = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  dup.length ? fail('slugs', `duplicate: ${[...new Set(dup)].join(', ')}`) : passed.push('slugs unique')
}

// 2. Internal links resolve
{
  const set = new Set(slugs)
  let bad = 0
  for (const p of archive)
    for (const b of p.body || [])
      for (const d of b.markDefs || []) {
        const h = d.href || ''
        if (!/^(https?:\/\/|\/blog\/)/.test(h)) {
          bad++
          fail('links', `${p.slug.current}: href not allowed (only http(s) and /blog/): ${h.slice(0, 40)}`)
        } else if (h.startsWith('/blog/') && !set.has(h.slice(6))) {
          bad++
          fail('links', `${p.slug.current} -> ${h}`)
        }
      }
  if (!bad) passed.push('internal links resolve')
}

// 3. Every post has a cover, and required fields exist
{
  let bad = 0
  for (const p of archive) {
    if (!fs.existsSync(rel(`public/blog-covers/${p.slug.current}.webp`))) {
      bad++
      fail('covers', `missing cover for ${p.slug.current}`)
    }
    for (const f of ['title', 'publishedAt', 'excerpt']) {
      if (!p[f]) {
        bad++
        fail('fields', `${p.slug.current} lacks ${f}`)
      }
    }
  }
  if (!bad) passed.push('covers and fields present')
}

// 4. Banned terms and secrets in drafts and archive
{
  const patterns = fs
    .readFileSync(rel('factory/banned-terms.txt'), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((l) => new RegExp(l, 'i'))
  const targets = [archivePath]
  const dir = rel('content/drafts/stories')
  for (const f of fs.readdirSync(dir)) if (f.endsWith('.md')) targets.push(path.join(dir, f))
  // Every factory file that gets committed is scanned too.
  for (const sub of ['sources', 'reviews'])
    for (const f of fs.readdirSync(rel(`factory/${sub}`))) if (f.endsWith('.md')) targets.push(rel(`factory/${sub}/${f}`))
  targets.push(rel('factory/backlog.md'), rel('factory/state.json'))
  let bad = 0
  for (const t of targets) {
    const text = fs.readFileSync(t, 'utf8')
    for (const re of patterns) {
      const m = text.match(re)
      if (m) {
        bad++
        fail('banned', `${path.relative(root, t)} matches ${re} (${m[0].slice(0, 4)}***)`)
      }
    }
  }
  if (!bad) passed.push(`banned terms clear (${targets.length} files)`)
}

// 5. Slop detector: zero hits on every draft
{
  const dir = rel('content/drafts/stories')
  const py = rel('scripts/factory/flag_slop.py')
  let bad = 0
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue
    const r = spawnSync('python3', ['-I', py, path.join(dir, f)], { encoding: 'utf8' })
    if (r.status !== 0) {
      bad++
      fail('slop', `detector failed on ${f}: ${r.stderr.slice(0, 120)}`)
      continue
    }
    let hits
    try {
      hits = JSON.parse(r.stdout)
    } catch {
      bad++
      fail('slop', `unreadable detector output for ${f}`)
      continue
    }
    if (hits.length) {
      bad++
      fail('slop', `${f}: ${hits.length} hit(s), first: ${JSON.stringify(hits[0]).slice(0, 140)}`)
    }
  }
  if (!bad) passed.push('slop detector: 0 hits')
}

// 6. Factory posts need sources and a PASS review from a fresh reviewer
{
  const state = JSON.parse(fs.readFileSync(rel('factory/state.json'), 'utf8'))
  let bad = 0
  for (const slug of state.factoryPosts || []) {
    const src = rel(`factory/sources/${slug}.md`)
    const rev = rel(`factory/reviews/${slug}.md`)
    if (!fs.existsSync(src) || !/^Source:/im.test(fs.readFileSync(src, 'utf8'))) {
      bad++
      fail('sources', `${slug}: factory/sources/${slug}.md missing or has no "Source:" line`)
    }
    if (!fs.existsSync(rev) || !/^VERDICT:\s*PASS\s*$/im.test(fs.readFileSync(rev, 'utf8'))) {
      bad++
      fail('review', `${slug}: factory/reviews/${slug}.md missing or not "VERDICT: PASS"`)
    }
    if (!slugs.includes(slug)) {
      bad++
      fail('state', `${slug} is in state.json but not in archive.json`)
    }
  }
  if (!bad) passed.push(`factory posts sourced and reviewed (${(state.factoryPosts || []).length})`)
}

// 7. Build (opt-in flag; CI and the runner always pass it)
if (process.argv.includes('--build')) {
  const r = spawnSync('npm', ['run', 'build'], { cwd: root, encoding: 'utf8' })
  r.status === 0 ? passed.push('next build') : fail('build', (r.stdout + r.stderr).split('\n').slice(-12).join('\n'))
} else {
  fail('build', 'not run: pass --build (a skipped check is a failure)')
}

for (const p of passed) console.log(`PASS  ${p}`)
for (const f of failures) console.log(`FAIL  ${f}`)
console.log(failures.length ? `\nGATE: FAIL (${failures.length})` : '\nGATE: PASS')
process.exit(failures.length ? 1 : 0)
