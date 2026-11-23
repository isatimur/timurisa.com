import fs from 'node:fs'
import path from 'node:path'

export type NewsKind = 'release' | 'spec' | 'research' | 'opinion' | 'vendor-claim' | 'talked-about'
export interface NewsItem { title: string; url: string; source: string; published: string; kind: NewsKind; note: string; points?: number }
export interface Digest { date: string; headline: string; items: NewsItem[] }

export const KIND_LABEL: Record<NewsKind, string> = {
  release: 'Release',
  spec: 'Spec',
  research: 'Research',
  opinion: 'Opinion',
  'vendor-claim': 'Vendor claim',
  'talked-about': 'Talked about',
}

const dir = path.join(process.cwd(), 'content/news')

/** Newest first. Files are checked by scripts/factory/verify.mjs before they merge. */
export function getDigests(): Digest[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Digest)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const getDigest = (date: string) => getDigests().find((d) => d.date === date) ?? null
