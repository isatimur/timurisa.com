"use client";
import { useState, useEffect, useRef } from "react";
import { TableOfContents } from "./TableOfContents";
import BlogContent, { ContentBlock } from "./BlogContent";
import { ArrowUp, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
interface ArticleProps {
  title: string;
  authorName: string;
  authorImage: string;
  mainImage: any;
  publishedAt: string;
  readingTime: string;
  body: ContentBlock[];
}
export default function EnhancedCleanArticle({ title, body }: ArticleProps) {
  const [progress, setProgress] = useState(0),
    [message, setMessage] = useState("");
  const article = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = article.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const length = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.max(0, Math.min(100, (-rect.top / length) * 100)));
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: location.href });
      else {
        await navigator.clipboard.writeText(location.href);
        setMessage("Link copied.");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        setMessage("Copy the page address to share this article.");
    }
  }
  return (
    <div ref={article}>
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="reading-layout">
        <aside className="reading-toc">
          <h2>In this article</h2>
          <TableOfContents content={body} />
        </aside>
        <div className="reading-body">
          <article className="prose">
            <BlogContent content={body} />
          </article>
        </div>
      </div>
      {progress > 0 && (
        <div className="reading-actions">
          <button onClick={share} aria-label="Share article">
            <Share2 size={17} />
          </button>
          <Link href="/blog" aria-label="Back to journal">
            <ArrowLeft size={17} />
          </Link>
          <button
            aria-label="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowUp size={17} />
          </button>
        </div>
      )}
      {message && (
        <div className="share-feedback" role="status">
          {message}
        </div>
      )}
    </div>
  );
}
