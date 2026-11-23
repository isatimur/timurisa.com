import { getDigests } from '@/lib/news'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const digests = getDigests().slice(0, 20)
  const updated = digests[0] ? `${digests[0].date}T00:00:00Z` : '2026-01-01T00:00:00Z'
  const entries = digests
    .map((d) => {
      const body = d.items
        .map((i) => `<p><strong>${esc(i.title)}</strong> (${esc(i.source)}, ${esc(i.kind)}). ${esc(i.note)} <a href="${esc(i.url)}">Read the original</a></p>`)
        .join('')
      return `<entry><id>${SITE_URL}/news/${d.date}</id><title>${esc(d.headline)}</title><updated>${d.date}T00:00:00Z</updated><link href="${SITE_URL}/news/${d.date}"/><content type="html">${esc(body)}</content></entry>`
    })
    .join('')
  const xml = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><id>${SITE_URL}/news</id><title>Signal by Timur Isachenko</title><updated>${updated}</updated><link href="${SITE_URL}/news"/><link rel="self" href="${SITE_URL}/news/feed.xml"/><author><name>Timur Isachenko</name></author>${entries}</feed>`
  return new Response(xml, { headers: { 'content-type': 'application/atom+xml; charset=utf-8' } })
}
