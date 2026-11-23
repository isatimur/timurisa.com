import { KIND_LABEL, type Digest } from '@/lib/news'

export function NewsDigest({ digest }: { digest: Digest }) {
  return (
    <ol className="news-list">
      {digest.items.map((item) => (
        <li key={item.url} className="news-item">
          <div className="news-meta">
            <span className={`news-kind news-kind-${item.kind}`}>{KIND_LABEL[item.kind]}</span>
            <span>{item.source}</span>
            <time dateTime={item.published}>{item.published}</time>
            {item.points !== undefined && <span>{item.points} points on Hacker News</span>}
          </div>
          <h3>
            <a href={item.url} rel="noopener noreferrer">{item.title}</a>
          </h3>
          <p>{item.note}</p>
        </li>
      ))}
    </ol>
  )
}

export function NewsDisclosure() {
  return (
    <p className="news-disclosure">
      How this is made: a script reads public feeds each week. An AI agent with no web access picks the items and writes the short
      notes. Links, titles and point counts come straight from the feeds. Timur merges each issue. Every item links to the original.
    </p>
  )
}
