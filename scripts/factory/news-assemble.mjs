#!/usr/bin/env node
// Build content/news/<date>.json from the fetched candidates and the agent's commentary.
// Links, titles, sources and point counts are copied from the candidates. The agent supplies only ids, kinds and notes.
// Usage: node scripts/factory/news-assemble.mjs [YYYY-MM-DD]
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const date = process.argv[2] || new Date().toISOString().slice(0, 10)
const KINDS = ['release', 'spec', 'research', 'opinion', 'vendor-claim', 'talked-about']
const die = (m) => { console.error(`ASSEMBLE FAIL: ${m}`); process.exit(1) }

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) die('bad date')
const cands = JSON.parse(fs.readFileSync(path.join(root, 'factory/news/candidates.json'), 'utf8'))
const byId = new Map(cands.map((c) => [c.id, c]))
let com
try { com = JSON.parse(fs.readFileSync(path.join(root, 'factory/news/commentary.json'), 'utf8')) } catch { die('commentary.json missing or not JSON') }

if (typeof com.headline !== 'string' || com.headline.length < 10 || com.headline.length > 90) die('headline must be 10 to 90 characters')
if (!Array.isArray(com.items) || com.items.length < 6 || com.items.length > 8) die('need 6 to 8 items')

const seen = new Set()
const items = com.items.map((i, n) => {
  const c = byId.get(i.id)
  if (!c) die(`item ${n}: unknown id ${String(i.id).slice(0, 12)}`)
  if (seen.has(i.id)) die(`item ${n}: duplicate id`)
  seen.add(i.id)
  if (!KINDS.includes(i.kind)) die(`item ${n}: bad kind`)
  if (i.kind === 'talked-about' && !(c.points >= 300)) die(`item ${n}: talked-about needs 300+ points`)
  if (typeof i.note !== 'string' || i.note.length < 20 || i.note.length > 280) die(`item ${n}: note must be 20 to 280 characters`)
  return { title: c.title, url: c.url, source: c.source, published: c.date, kind: i.kind, note: i.note.trim(), ...(c.points !== undefined ? { points: c.points } : {}) }
})
if (new Set(items.map((i) => i.source)).size < 4) die('need at least 4 different sources')

const file = path.join(root, `content/news/${date}.json`)
fs.mkdirSync(path.dirname(file), { recursive: true })
fs.writeFileSync(file, JSON.stringify({ date, headline: com.headline.trim(), items }, null, 2) + '\n')
console.log(`wrote content/news/${date}.json (${items.length} items)`)
