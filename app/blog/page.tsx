"use client";
import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, ArrowRight } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string } };
  excerpt?: string;
  publishedAt?: string;
  estimatedReadingTime?: number;
  categories?: string[];
}
const PAGE_SIZE = 6;
const query = groq`{
"posts": *[_type == "post" && defined(slug.current) && ($term == "" || title match $match || excerpt match $match)] | order(publishedAt desc) [$start...$end] {_id,title,slug,mainImage,excerpt,publishedAt,"estimatedReadingTime":round(length(pt::text(body))/5/200),"categories":categories[]->title},
"total":count(*[_type == "post" && defined(slug.current) && ($term == "" || title match $match || excerpt match $match)])
}`;
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]),
    [total, setTotal] = useState(0),
    [input, setInput] = useState(""),
    [term, setTerm] = useState(""),
    [page, setPage] = useState(0),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(false),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    client
      .fetch<{ posts: Post[]; total: number }>(query, {
        term,
        match: `*${term}*`,
        start: page * PAGE_SIZE,
        end: (page + 1) * PAGE_SIZE,
      })
      .then((result) => {
        if (cancelled) return;
        setPosts((prev) =>
          page === 0
            ? result.posts
            : [
                ...prev,
                ...result.posts.filter(
                  (p) => !prev.some((old) => old._id === p._id),
                ),
              ],
        );
        setTotal(result.total);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [term, page, retry]);
  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setPosts([]);
    setPage(0);
    setTerm(input.trim());
    setRetry((n) => n + 1);
  };
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main">
        <header className="page-intro intro-split">
          <div>
            <h1>
              Thinking out loud.
              <br />
              <span>Building in the open.</span>
            </h1>
            <p>
              Notes on AI engineering, distributed systems, and the products I
              build along the way.
            </p>
          </div>
          <div className="intro-aside">
            <p>
              Research. Field notes.
              <br />
              Questions worth asking.
            </p>
            <Link className="text-action" href="/book">
              Explore the books <ArrowUpRight size={16} />
            </Link>
          </div>
        </header>
        <section className="journal" aria-label="Articles">
          <div className="journal-toolbar">
            <h2>
              The journal<span>.</span>
            </h2>
            <form onSubmit={search} className="search-field">
              <Search size={18} />
              <input
                aria-label="Search articles"
                placeholder="Find an idea…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" aria-label="Submit article search">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
          {loading && posts.length === 0 && (
            <div className="journal-loading" role="status">
              Opening the journal…
              <div />
              <div />
              <div />
            </div>
          )}
          <div className="journal-grid">
            {posts.map((post, i) => (
              <Link
                className={`journal-item${i === 0 && !term ? " journal-featured" : ""}`}
                href={`/blog/${post.slug.current}`}
                key={post._id}
              >
                <div className="journal-image">
                  {post.mainImage ? (
                    <Image
                      src={createImageUrlBuilder(client)
                        .image(post.mainImage)
                        .width(i === 0 ? 1100 : 650)
                        .height(i === 0 ? 650 : 420)
                        .fit("crop")
                        .url()}
                      alt={post.title}
                      width={i === 0 ? 1100 : 650}
                      height={i === 0 ? 650 : 420}
                    />
                  ) : (
                    <div className="article-placeholder" aria-hidden="true">
                      <span>ti.</span>
                      <i />
                      <i />
                      <i />
                    </div>
                  )}
                  <span className="project-open">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="journal-copy">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="journal-meta">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : "Field notes"}
                    </span>
                    <span>
                      {Math.max(1, post.estimatedReadingTime || 1)} min read
                    </span>
                  </div>
                  {post.categories?.length ? (
                    <div className="article-categories">
                      {post.categories.join(" / ")}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
          {error && (
            <div className="empty-state" role="alert">
              <h2>The journal couldn’t load.</h2>
              <p>Please try again. Your search is still here.</p>
              <button
                className="primary-action"
                onClick={() => setRetry((n) => n + 1)}
              >
                Try again <ArrowRight size={16} />
              </button>
            </div>
          )}
          {!loading && !error && !posts.length && (
            <div className="empty-state">
              <h2>No articles found.</h2>
              <p>Try a broader search, or browse the full journal.</p>
              <button
                className="primary-action"
                onClick={() => {
                  setInput("");
                  setTerm("");
                  setPage(0);
                  setRetry((n) => n + 1);
                }}
              >
                Show all articles <ArrowRight size={16} />
              </button>
            </div>
          )}
          {posts.length > 0 && (
            <div className="journal-pagination">
              <p role="status">
                Showing {posts.length} of {total} articles
              </p>
              {posts.length < total && !error && (
                <button
                  disabled={loading}
                  className="primary-action"
                  onClick={() => setPage((p) => p + 1)}
                >
                  {loading ? "Loading…" : "More to explore"}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
