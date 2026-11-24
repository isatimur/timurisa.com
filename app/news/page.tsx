import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import { NewsDigest, NewsDisclosure } from '@/components/NewsDigest'
import { getDigests } from '@/lib/news'
import { pageMetadata, SITE_URL } from '@/lib/seo'

export const metadata = {
  ...pageMetadata('/news', 'Signal: a weekly engineering news digest', 'Weekly links on AI, web and infrastructure, with short notes and a label on each: release, spec, research, opinion, vendor claim, or talked about.'),
  alternates: { canonical: `${SITE_URL}/news`, types: { 'application/atom+xml': '/news/feed.xml' } },
}

export default function NewsPage() {
  const [latest, ...older] = getDigests()
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main">
        <header className="page-intro">
          <h1>Signal<span>.</span></h1>
          <p>A weekly digest of engineering news. Each item carries a label, so a spec does not look like hype.</p>
          <p><Link className="text-action" href="/news/feed.xml">Atom feed</Link></p>
          {/* Decorative art made with an AI image model; the page text carries all the meaning. */}
          <img className="news-hero" src="/news-hero.webp" alt="" width={1600} height={895} />
        </header>
        {latest ? (
          <section aria-label="Latest issue">
            <h2>{latest.headline}</h2>
            <p className="news-date">Issue of <time dateTime={latest.date}>{latest.date}</time></p>
            <NewsDigest digest={latest} />
            <NewsDisclosure />
          </section>
        ) : (
          <p>The first issue appears after the first weekly run.</p>
        )}
        {older.length > 0 && (
          <section aria-label="Earlier issues">
            <h2>Earlier issues</h2>
            <ul className="news-archive">
              {older.map((d) => (
                <li key={d.date}>
                  <Link href={`/news/${d.date}`}>{d.date}: {d.headline}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
