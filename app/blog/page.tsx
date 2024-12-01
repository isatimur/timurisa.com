'use client'

import { useState, useEffect, useCallback } from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import createImageUrlBuilder from '@sanity/image-url';
import { NavBar } from '@/components/NavBar';

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
        <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBar />
        <main className="container mx-auto px-4 py-8 flex-grow">
            <div className="mb-8 flex">
                <Input
                    className="max-w-md mr-2"
                    placeholder="Search articles..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
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
                    <Button variant="outline" onClick={handleLoadMore}>Load More Articles</Button>
                </div>
            )}
            {posts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No articles found.</p>
            )}
            <p className="text-center text-gray-500 mt-4">
                Showing {posts.length} of {totalPosts} articles
            </p>
        </main>
        <footer className="bg-white shadow mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                <p>&copy; 2024 Timur Isachenko. All rights reserved.</p>
            </div>
        </footer>
    </div>
    );
}
