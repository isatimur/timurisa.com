import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import EnhancedCleanArticle from '@/components/EnhancedCleanArticle';
import createImageUrlBuilder from '@sanity/image-url';
import Head from 'next/head';
import { NavBar } from '@/components/NavBar';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, ArrowLeft, Brain, ShoppingCart, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

interface BlogPostPageProps {
    params: {
        slug: string;
    };
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
        <footer className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg mt-auto">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"></div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Brain className="h-5 w-5 text-blue-300" />
                            </div>
                            <h3 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent py-1">
                                Timur Isachenko
                            </h3>
                        </div>
                        <p className="text-sm text-blue-100">
                            Exploring technology and sharing knowledge through detailed articles and tutorials.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-blue-200 hover:text-white transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://leanpub.com/quickstartwithai"
                            target="_blank"
                            className="text-blue-200 hover:text-white hover:bg-white/10"
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
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-blue-200 
                                         hover:text-white transition-all duration-300 backdrop-blur-sm
                                         group relative"
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                                               bg-white text-blue-900 text-xs px-2 py-1 rounded 
                                               opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-blue-200/80 text-sm">
                        &copy; {new Date().getFullYear()} Timur Isachenko. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;

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
            <div className="min-h-screen bg-gray-50">
                <NavBar />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
                    <Link
                        href="/blog"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
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

    const mainImageUrl = createImageUrlBuilder(client)
        .image(post.mainImage)
        .width(1200)
        .height(600)
        .format('webp')
        .url();

    const authorImageUrl = post.authorImage
        ? createImageUrlBuilder(client)
            .image(post.authorImage)
            .width(80)
            .height(80)
            .format('webp')
            .url()
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <Head>
                <title>{post.title} | Timur Isachenko Blog</title>
                <meta name="description" content={post.excerpt || `${post.title} by ${post.authorName}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={mainImageUrl} />
            </Head>

            <NavBar />

            <main className="container mx-auto px-4 py-12">
                {/* Back to blog link */}
                <div className="animate-fade-in">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 
                                group transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                </div>

                {/* Article Header */}
                <header className="max-w-4xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.categories?.map((category: string) => (
                            <span
                                key={category}
                                className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full 
                                         text-sm font-medium border border-blue-100
                                         hover:bg-blue-100 transition-colors duration-300"
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                                 bg-clip-text text-transparent mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            {authorImageUrl && (
                                <div className="relative">
                                    <Image
                                        src={authorImageUrl}
                                        width={80}
                                        height={80}
                                        alt={post.authorName}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-white 
                                                 shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 
                                                  rounded-full border-2 border-white"></div>
                                </div>
                            )}
                            <div>
                                <div className="font-medium text-gray-900 mb-1">
                                    {post.authorName || 'Unknown Author'}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                    <span className="flex items-center">
                                        <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                                        {readingTime} min read
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* 
                        <div className="flex items-center space-x-3">
                            <ShareButton url={`/blog/${params.slug}`} title={post.title} />
                            <BookmarkButton slug={params.slug} />
                        </div> */}
                    </div>
                </header>

                {/* Main Image */}
                {mainImageUrl && (
                    <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl 
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
                                  prose-headings:text-gray-900 prose-p:text-gray-600
                                  prose-a:text-blue-600 hover:prose-a:text-blue-800
                                  prose-img:rounded-xl prose-img:shadow-xl
                                  prose-headings:font-bold prose-p:leading-relaxed
                                  prose-pre:bg-gray-900 prose-pre:shadow-lg
                                  prose-code:text-blue-600
                                  animate-fade-in-up [animation-delay:400ms]">
                    <EnhancedCleanArticle {...post} />
                </article>
            </main>

            <Footer />
        </div>
    );
}
