import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import { NewsDigest, NewsDisclosure } from '@/components/NewsDigest'
import { getDigest, getDigests } from '@/lib/news'
import { pageMetadata } from '@/lib/seo'

export const dynamicParams = false
export const generateStaticParams = () => getDigests().map((d) => ({ date: d.date }))

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const digest = getDigest(date)
  return digest ? pageMetadata(`/news/${date}`, digest.headline, `Signal, issue of ${date}: ${digest.items.length} links with short notes.`) : {}
}

export default async function DigestPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params
  const digest = getDigest(date)
  if (!digest) notFound()
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main">
        <header className="page-intro">
          <p><Link className="text-action" href="/news">Signal</Link></p>
          <h1>{digest.headline}</h1>
          <p>Issue of <time dateTime={digest.date}>{digest.date}</time></p>
        </header>
        <NewsDigest digest={digest} />
        <NewsDisclosure />
      </main>
      <SiteFooter />
    </div>
  )
}
