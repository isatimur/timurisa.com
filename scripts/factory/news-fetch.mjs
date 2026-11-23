#!/usr/bin/env node
// Fetch the allowlisted feeds and write factory/news/candidates.json.
// No agent touches this step: links, titles, dates and point counts come straight from the feeds.
// Usage: node scripts/factory/news-fetch.mjs [--days 8]
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const days = Number(process.argv[process.argv.indexOf('--days') + 1]) || 8
const sources = JSON.parse(fs.readFileSync(path.join(root, 'factory/news-sources.json'), 'utf8'))
const since = Date.now() - days * 86400000
const MAX_BYTES = 3_000_000
const PER_SOURCE = 8

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&')
const strip = (s) => decode(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'))
  return m ? m[1] : ''
}

function parse(xml) {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) || []
  return blocks.map((b) => {
    let link = strip(tag(b, 'link'))
    if (!link) {
      const m = b.match(/<link[^>]*?href="([^"]+)"[^>]*?(?:rel="alternate"[^>]*)?\/?>/i)
      link = m ? decode(m[1]) : ''
    }
    const date = Date.parse(strip(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date')))
    const desc = strip(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content'))
    const points = desc.match(/Points:\s*(\d+)/i)
    const comments = desc.match(/#\s*Comments:\s*(\d+)/i)
    return {
      title: strip(tag(b, 'title')),
      url: link,
      date,
      summary: desc.replace(/Article URL:.*$/i, '').replace(/Comments URL:.*$/i, '').slice(0, 320),
      points: points ? Number(points[1]) : undefined,
      comments: comments ? Number(comments[1]) : undefined,
    }
  })
}

const out = []
const report = []
for (const src of sources) {
  try {
    if (!src.url.startsWith('https://')) throw new Error('not https')
    const res = await fetch(src.url, {
      headers: { 'user-agent': 'Mozilla/5.0 (timurisa.com news digest)', accept: 'application/atom+xml, application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = await res.arrayBuffer()
    if (buf.byteLength > MAX_BYTES) throw new Error('feed too large')
    const items = parse(new TextDecoder().decode(buf))
      .filter((i) => i.title && /^https:\/\//.test(i.url) && Number.isFinite(i.date) && i.date >= since && i.date <= Date.now() + 86400000)
      .sort((a, b) => (b.points || 0) - (a.points || 0) || b.date - a.date)
      .slice(0, PER_SOURCE)
    for (const i of items)
      out.push({
        id: crypto.createHash('sha1').update(i.url).digest('hex').slice(0, 8),
        source: src.name,
        signal: !!src.signal,
        title: i.title.slice(0, 200),
        url: i.url,
        date: new Date(i.date).toISOString().slice(0, 10),
        summary: i.summary,
        ...(i.points !== undefined ? { points: i.points } : {}),
        ...(i.comments !== undefined ? { comments: i.comments } : {}),
      })
    report.push(`ok    ${src.id}: ${items.length}`)
  } catch (e) {
    report.push(`FAIL  ${src.id}: ${e.message}`)
  }
}
// Drop duplicate links, keep the first seen.
const seen = new Set()
const unique = out.filter((i) => (seen.has(i.url) ? false : seen.add(i.url)))
fs.mkdirSync(path.join(root, 'factory/news'), { recursive: true })
fs.writeFileSync(path.join(root, 'factory/news/candidates.json'), JSON.stringify(unique, null, 2))
console.log(report.join('\n'))
console.log(`candidates: ${unique.length} from ${new Set(unique.map((i) => i.source)).size} sources`)
process.exit(unique.length >= 15 ? 0 : 1)
