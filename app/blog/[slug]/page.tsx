import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import EnhancedCleanArticle from '@/components/EnhancedCleanArticle';
import createImageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { NavBar } from '@/components/NavBar';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, ArrowLeft, Cpu, ShoppingCart, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'Book', href: '/book' },
    ];

    const socialLinks = [
        {
            name: 'GitHub',
            href: 'https://github.com/isatimur',
            icon: (props: any) => (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            )
        },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/timur-isachenko', icon: Linkedin },
    ];

    return (
        <footer className="relative bg-slate-950 border-t border-cyan-500/10 text-white shadow-lg mt-auto">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                                <Cpu className="h-5 w-5 text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white font-mono py-1">
                                TIMUR<span className="text-cyan-400">.AI</span>
                            </h3>
                        </div>
                        <p className="text-sm text-slate-400">
                            Exploring technology and sharing knowledge through detailed articles and tutorials.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-slate-400 hover:text-cyan-400 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://leanpub.com/quickstartwithai"
                            target="_blank"
                            className="text-slate-400 hover:text-cyan-400"
                        >
                            <span className="flex items-center"><ShoppingCart className="mr-2 h-4 w-4" />Get the Book</span>
                        </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center md:justify-end items-center space-x-4">
                        {socialLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 text-slate-300
                                         hover:text-cyan-300 transition-all duration-300
                                         group relative"
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2
                                               bg-slate-900 border border-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded
                                               opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Timur Isachenko. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const generateArticleSchema = (post: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? createImageUrlBuilder(client).image(post.mainImage).url() : null,
    datePublished: post.publishedAt,
    author: {
        '@type': 'Person',
        name: post.authorName,
        url: 'https://timurisa.com'
    },
    publisher: {
        '@type': 'Organization',
        name: 'Timur Isachenko',
        url: 'https://timurisa.com',
        logo: {
            '@type': 'ImageObject',
            url: 'https://timurisa.com/apple-icon.png'
        }
    }
});

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    const query = groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        mainImage,
        body,
        "authorName": author->name,
        "authorImage": author->image,
        publishedAt,
        "categories": categories[]->title,
        excerpt
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) {
        return (
            <div className="min-h-screen bg-[#030712]">
                <NavBar />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-2xl font-bold text-white">Post not found</h1>
                    <Link
                        href="/blog"
                        className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const wordsPerMinute = 200;
    const wordCount = post.body.reduce((count: number, block: any) => {
        if (block._type === 'block' && block.children) {
            return count + block.children.reduce((childCount: number, child: any) => {
                return childCount + child.text.split(' ').length;
            }, 0);
        }
        return count;
    }, 0);
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    const mainImageUrl = post.mainImage
        ? createImageUrlBuilder(client)
            .image(post.mainImage)
            .width(1200)
            .height(600)
            .format('webp')
            .url()
        : null;

    const authorImageUrl = post.authorImage
        ? createImageUrlBuilder(client)
            .image(post.authorImage)
            .width(80)
            .height(80)
            .format('webp')
            .url()
        : null;

    const articleSchema = generateArticleSchema(post);

    return (
        <div className="min-h-screen bg-[#030712] bg-grid-pattern">
            <Head>
                <title>{post.title} | Timur Isachenko Blog</title>
                <meta name="description" content={post.excerpt || `${post.title} by ${post.authorName}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:type" content="article" />
                {mainImageUrl && <meta property="og:image" content={mainImageUrl} />}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
            </Head>

            <NavBar />

            <main className="container mx-auto px-4 py-12">
                {/* Back to blog link */}
                <div className="animate-fade-in max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-12
                                group transition-all duration-300 text-lg"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" />
                        Back to Articles
                    </Link>
                </div>

                {/* Article Header */}
                <header className="max-w-4xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex flex-wrap gap-3 mb-8">
                        {post.categories?.map((category: string) => (
                            <span
                                key={category}
                                className="px-4 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-full
                                         text-sm font-medium border border-cyan-500/20
                                         hover:bg-cyan-500/20 transition-colors duration-300"
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex items-center justify-between p-6 cyber-glass rounded-2xl
                                 border border-cyan-500/20">
                        <div className="flex items-center space-x-6">
                            {authorImageUrl && (
                                <div className="relative">
                                    <Image
                                        src={authorImageUrl}
                                        width={80}
                                        height={80}
                                        alt={post.authorName}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30
                                                 shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400
                                                  rounded-full border-2 border-slate-950"></div>
                                </div>
                            )}
                            <div>
                                <div className="font-medium text-white mb-1 text-lg">
                                    {post.authorName || 'Unknown Author'}
                                </div>
                                <div className="flex items-center space-x-6 text-sm text-slate-400">
                                    <span className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center">
                                        <ClockIcon className="w-4 h-4 mr-2 text-slate-500" />
                                        {readingTime} min read
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Image */}
                {mainImageUrl && (
                    <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-cyan-500/10
                                  animate-fade-in-up [animation-delay:200ms]">
                        <Image
                            src={mainImageUrl}
                            width={1200}
                            height={600}
                            alt={post.title}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-lg md:prose-xl max-w-4xl mx-auto
                                  prose-headings:text-white prose-p:text-slate-300
                                  prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                                  prose-img:rounded-xl prose-img:shadow-xl
                                  prose-headings:font-bold prose-p:leading-relaxed
                                  prose-pre:bg-slate-900 prose-pre:shadow-lg
                                  prose-code:text-cyan-300 prose-strong:text-white
                                  prose-blockquote:border-cyan-500/40
                                  prose-blockquote:bg-cyan-500/5 prose-blockquote:py-2
                                  prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                                  animate-fade-in-up [animation-delay:400ms]">
                    <EnhancedCleanArticle {...post} />
                </article>
            </main>

            <Footer />
        </div>
    );
}
