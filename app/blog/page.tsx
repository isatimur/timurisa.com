'use client'

import { useState, useEffect, useCallback } from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import createImageUrlBuilder from '@sanity/image-url';
import { NavBar } from '@/components/NavBar';
import { Brain, ShoppingCart, Linkedin } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: { asset: { _ref: string } };
    excerpt: string;
    authorName: string;
    authorImage: { asset: { _ref: string } };
    publishedAt: string;
    estimatedReadingTime: number;
    categories: string[] | null;
}

const POSTS_PER_PAGE = 6;

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    handleSearch
}: {
    searchTerm: string,
    setSearchTerm: (term: string) => void,
    handleSearch: () => void
}) => {
    return (
        <div className="relative max-w-xl mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 pl-12 rounded-lg border 
                    border-gray-200 focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-200 
                    bg-white/80 backdrop-blur-sm shadow-sm
                    placeholder:text-gray-400 text-gray-700"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center 
                    pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
            <div className="absolute inset-0 -z-10 blur-xl 
                bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 
                opacity-50 rounded-lg">
            </div>
        </div>
    );
};

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
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
                        <Button
                            variant="ghost"
                            className="text-blue-200 hover:text-white hover:bg-white/10"
                            onClick={() => window.open("https://leanpub.com/quickstartwithai", "_blank")}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Get the Book
                        </Button>
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

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPosts, setTotalPosts] = useState(0);

    const fetchPosts = useCallback(async (reset = false) => {
        const newPage = reset ? 1 : page;
        const query = groq`{
            "posts": *[_type == "post" && title match $searchTerm + "*"] | order(publishedAt desc) [${(newPage - 1) * POSTS_PER_PAGE}...${newPage * POSTS_PER_PAGE}] {
                _id,
                title,
                slug,
                mainImage,
                excerpt,
                "authorName": author->name,
                "authorImage": author->image,
                publishedAt,
                "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200),
                "categories": categories[]->title
            },
            "total": count(*[_type == "post" && title match $searchTerm + "*"])
        }`;
        const results = await client.fetch<{ posts: Post[], total: number }>(query, { searchTerm: searchTerm });

        if (reset) {
            setPosts(results.posts);
        } else {
            setPosts(prevPosts => [...prevPosts, ...results.posts]);
        }
        setTotalPosts(results.total);
        setHasMore(results.posts.length === POSTS_PER_PAGE && (newPage * POSTS_PER_PAGE) < results.total);
        setPage(newPage + 1);
    }, [page, searchTerm]);

    useEffect(() => {
        fetchPosts(true);
    }, [fetchPosts]);

    const handleSearch = () => {
        fetchPosts(true);
    };

    const handleLoadMore = () => {
        fetchPosts();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post._id} className="overflow-hidden">
                            <Image
                                alt={post.title}
                                className="object-cover w-full h-48"
                                height={200}
                                src={createImageUrlBuilder(client).image(post.mainImage).height(200).width(400).url()}
                                width={400}
                            />
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{post.excerpt}</p>
                                <div className="flex items-center mt-4 space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-1" />
                                        <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ClockIcon className="w-4 h-4 mr-1" />
                                        <span>{post.estimatedReadingTime} min read</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-2">
                                    {post.categories?.map((category) => (
                                        <span
                                            key={category}
                                            className="inline-flex items-center px-2 py-1 mr-2 mt-2 text-xs font-medium text-blue-800 bg-blue-100 rounded"
                                        >
                                            <TagIcon className="w-3 h-3 mr-1" />
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild>
                                    <Link href={`/blog/${post.slug.current}`}>Read More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {hasMore && (
                    <div className="mt-12 text-center">
                        <Button variant="outline" onClick={handleLoadMore} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                            Load More Articles
                        </Button>
                    </div>
                )}
                {posts.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No articles found.</p>
                )}
                <p className="text-center text-gray-500 mt-4">
                    Showing {posts.length} of {totalPosts} articles
                </p>
            </main>
            <Footer />
        </div>
    );
}
