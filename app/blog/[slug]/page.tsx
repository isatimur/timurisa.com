import { pageMetadata, person, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { getPost, readingTime as calculateReadingTime, type Post } from "@/lib/posts";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import EnhancedCleanArticle from "@/components/EnhancedCleanArticle";
import createImageUrlBuilder from "@sanity/image-url";
import { NavBar } from "@/components/NavBar";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const generateArticleSchema = (post: Post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${SITE_URL}/blog/${post.slug.current}#article`,
  mainEntityOfPage: `${SITE_URL}/blog/${post.slug.current}`,
  url: `${SITE_URL}/blog/${post.slug.current}`,
  dateModified: post._updatedAt || post.publishedAt,
  headline: post.title,
  isBasedOn: post.source?.url,
  description: post.excerpt,
  image: post.mainImage
    ? createImageUrlBuilder(client).image(post.mainImage).url()
    : null,
  datePublished: post.publishedAt,
  author: {
    "@type": "Person",
    name: post.authorName || "Timur Isachenko",
    ...(post.authorUrl ? { url: post.authorUrl } : {}),
    ...(!post.authorName || post.authorName === "Timur Isachenko" ? { "@id": person["@id"], url: SITE_URL } : {}),
  },
  publisher: person,
});

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = post.title;
  const description = post.excerpt || post.body?.filter(block => block._type === "block").flatMap(block => block.children || []).map(child => child.text || "").join(" ").trim().slice(0, 160) || post.title;
  const imageUrl = post.mainImage
    ? createImageUrlBuilder(client)
        .image(post.mainImage)
        .width(1200)
        .height(630)
        .url()
    : undefined;

  const base = pageMetadata(`/blog/${slug}`, title, description);
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.authorName || "Timur Isachenko"],
      title,
      description,
      type: "article",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630 }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : ["/opengraph-image"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) notFound();
  const readingTime = calculateReadingTime(post.body || []);

  const mainImageUrl = post.mainImage
    ? createImageUrlBuilder(client)
        .image(post.mainImage)
        .width(1200)
        .height(600)
        .format("webp")
        .url()
    : null;

  const authorImageUrl = post.authorImage
    ? createImageUrlBuilder(client)
        .image(post.authorImage)
        .width(80)
        .height(80)
        .format("webp")
        .url()
    : null;

  const articleSchema = generateArticleSchema(post);

  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main reading-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <header className="article-header">
          <Link className="text-action back-link" href="/blog">
            <ArrowLeft size={16} />
            Back to the journal
          </Link>
          <h1>{post.title}</h1>
          {post.excerpt && <p>{post.excerpt}</p>}
          <div className="article-byline">
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={post.authorName || "Author"}
                width={46}
                height={46}
              />
            )}
            <div>
              <strong>{post.authorUrl ? <a href={post.authorUrl} target="_blank" rel="noopener noreferrer">{post.authorName}</a> : post.authorName || "Timur Isachenko"}</strong>
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })
                  : ""}{" "}
                · {readingTime} min read
              </span>
            </div>
          </div>
          {post.source && <aside className="article-provenance" aria-label="Publication history">
            <p>First published <time dateTime={post.source.publishedAt}>{new Date(post.source.publishedAt).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"})}</time>. Source edition: <a href={post.source.url} target="_blank" rel="noopener noreferrer">{post.source.platform}</a>. Edited for this blog on <time dateTime={post._updatedAt}>{new Date(post._updatedAt || post.source.publishedAt).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"})}</time>.</p>
            <p>{post.source.editorialNote}</p>
          </aside>}
          {!!post.categories?.length && (
            <div className="article-categories">
              {post.categories.join(" / ")}
            </div>
          )}
        </header>
        {mainImageUrl && (
          <div className="article-cover">
            <Image
              src={mainImageUrl}
              alt={post.title}
              width={1200}
              height={600}
              priority
            />
          </div>
        )}
        <div className="article-reader">
          <EnhancedCleanArticle title={post.title} body={post.body} />
        </div>
        {(!post.authorName || post.authorName === "Timur Isachenko") && <section className="case-chapter" aria-label="About the author">
          <h2>About the author</h2>
          <p>Timur Isachenko is an AI CTO and Principal Solution Architect working on AI-native products and distributed systems. Explore his <Link href="/projects">engineering projects</Link> and <Link href="/book">technical books</Link>, or read more <Link href="/#about">about his experience</Link>.</p>
        </section>}
        <div className="page-next">
          <p>Keep following your curiosity.</p>
          <Link href="/blog">
            Back to the journal.
            <ArrowLeft />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
