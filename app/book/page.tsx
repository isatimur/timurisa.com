import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { book, book2, book3 } from "../../public/assets";
export default function BookPage() {
  const books = [
    {
      title: "From Copilot to Colleague",
      image: book3,
      description:
        "With Daniel Mohanrao. A source-anchored book on AI engineering: how AI systems move from assistants that suggest, to copilots that collaborate in real time, to delegates trusted with full, reviewable tasks. Every claim links to the exact conference-talk video and timestamp it came from.",
      readOnlineLink: "https://fromcopilottocolleague.com",
      publishDate: "2026",
      publisher: "AI Engineer Press",
      pages: "10 chapters",
      rating: 0,
      features: [
        "199 source anchors linking claims to precise conference-talk timestamps",
        "Drawn from 881 AI Engineer conference talks",
        "Three-tier claim support levels (strong, moderate, tentative)",
        "Public, machine-readable claims ledger and chapter drafts",
      ],
    },
    {
      title: "Generative AI with Local LLM",
      image: book2,
      description:
        "Explore the world of Generative AI and Large Language Models (LLMs) with this practical guide. Learn how to implement and deploy LLMs locally, understanding the fundamentals of AI model training and optimization.",
      amazonLink: "https://a.co/d/a7kqMqW",
      leanpubLink: "https://leanpub.com/quickstartwithai",
      websiteLink: "https://quickstartgenai.com",
      publishDate: "2024",
      publisher: "Self-published",
      pages: "304",
      rating: 0,
      features: [
        "Introduction to Large Language Models",
        "Local LLM deployment strategies",
        "Practical AI implementation guides",
        "Performance optimization techniques",
      ],
    },
    {
      title: "High Performance in-memory computing with Apache Ignite",
      image: book,
      description:
        "Master the power of in-memory computing with Apache Ignite. This comprehensive guide walks you through building scalable, high-performance applications using distributed caching, SQL queries, and real-time processing.",
      amazonLink: "https://a.co/d/4rVYpcH",
      publishDate: "2017",
      publisher: "Lulu Publishing",
      pages: "380",
      rating: 3.3,
      features: [
        "In-depth coverage of Apache Ignite architecture",
        "Practical examples of distributed computing",
        "Performance optimization techniques",
        "Real-world use cases and implementations",
      ],
    },
  ];

  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main">
        <header className="page-intro intro-split">
          <div>
            <h1>
              From practice.
              <br />
              <span>Onto the page.</span>
            </h1>
            <p>
              Books on AI engineering and distributed systems. The ideas,
              patterns, and lessons behind the work.
            </p>
          </div>
          <div className="intro-aside">
            <p>
              For the curious.
              <br />
              For the builders.
              <br />
              For the next hard problem.
            </p>
            <Link href="/blog" className="text-action">
              Read my articles <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>
        <div className="publication-list">
          {books.map((b, i) => (
            <section className="publication" key={b.title}>
              <div className={`publication-stage publication-stage-${i}`}>
                <div className="physical-book">
                  <Image
                    src={b.image}
                    alt={`${b.title} cover`}
                    width={330}
                    height={460}
                    priority={i === 0}
                  />
                </div>
                <span>
                  {b.publishDate} / {b.publisher}
                </span>
              </div>
              <div className="publication-copy">
                <h2>{b.title}</h2>
                <p>{b.description}</p>
                <div className="publication-facts">
                  <span>{b.publishDate}</span>
                  <span>{b.publisher}</span>
                  <span>
                    {b.pages}
                    {b.pages.includes("chapters") ? "" : " pages"}
                  </span>
                </div>
                <details>
                  <summary>
                    Inside the book <span>+</span>
                  </summary>
                  <ul>
                    {b.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </details>
                <div className="publication-actions">
                  {b.readOnlineLink && (
                    <a
                      className="primary-action"
                      href={b.readOnlineLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read online <ArrowUpRight size={16} />
                    </a>
                  )}
                  {b.amazonLink && (
                    <a
                      className="primary-action"
                      href={b.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get the book <ArrowUpRight size={16} />
                    </a>
                  )}
                  {b.leanpubLink && (
                    <a
                      className="text-action"
                      href={b.leanpubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Leanpub <ArrowUpRight size={16} />
                    </a>
                  )}
                  {b.websiteLink && (
                    <a
                      className="text-action"
                      href={b.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book website <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className="page-next">
          <p>More ideas, between the books.</p>
          <Link href="/blog">
            Notes from the work.
            <ArrowRight />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
