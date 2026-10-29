"use client";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, ArrowRight } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import type { PostSummary } from "@/lib/posts";
export default function BlogIndex({ initialPosts }: { initialPosts: PostSummary[] }) {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");
  const posts = initialPosts.filter(post => `${post.title} ${post.authorName || "Timur Isachenko"} ${post.excerpt || ""} ${(post.categories || []).join(" ")}`.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  const search = (event: React.FormEvent) => { event.preventDefault(); setTerm(input.trim()); };
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
              build along the way, alongside guest editions from my coauthor Shamim Bhuiyan.
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
                      <span>{post.authorName === "Shamim Bhuiyan" ? "sb." : "ti."}</span>
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
                  <p className="journal-author">By {post.authorName || "Timur Isachenko"}</p>
                  <div className="journal-meta">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-GB",
                            { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
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
          {!posts.length && (
            <div className="empty-state">
              <h2>No articles found.</h2>
              <p>Try a broader search, or browse the full journal.</p>
              <button
                className="primary-action"
                onClick={() => {
                  setInput("");
                  setTerm("");
                }}
              >
                Show all articles <ArrowRight size={16} />
              </button>
            </div>
          )}
          {posts.length > 0 && (
            <div className="journal-pagination">
              <p role="status">
                Showing {posts.length} of {initialPosts.length} articles
              </p>

            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
