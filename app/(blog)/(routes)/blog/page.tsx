'use client'

import { useState, useEffect, useCallback } from 'react'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { CalendarIcon, ClockIcon, CodeIcon, BookIcon } from 'lucide-react'
import { format } from 'date-fns'
import { urlForImage } from '@/sanity/lib/image'
import Navbar from '@/src/components/Navbar'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    mainImage: any
    excerpt: string
    author: {
        name: string
        image: any
    }
    publishedAt: string
    readingTime: number
    technologies: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    category: string
}

const POSTS_PER_PAGE = 9

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [difficulty, setDifficulty] = useState('all')
    const [category, setCategory] = useState('all')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalPosts, setTotalPosts] = useState(0)

    const fetchPosts = useCallback(async (reset = false) => {
        setLoading(true)
        const newPage = reset ? 1 : page

        const query = groq`{
      "posts": *[_type == "post" && 
        ($searchTerm == "" || title match $searchTerm + "*") &&
        ($difficulty == "all" || difficulty == $difficulty) &&
        ($category == "all" || category == $category)
      ] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        "author": author->{name, image},
        publishedAt,
        "readingTime": round(length(pt::text(body)) / 5 / 180),
        "technologies": technologies[]->name,
        difficulty,
        category
      },
      "total": count(*[_type == "post"])
    }`

        const start = (newPage - 1) * POSTS_PER_PAGE
        const end = start + POSTS_PER_PAGE

        try {
            const { posts: newPosts, total } = await client.fetch(query, {
                searchTerm,
                difficulty,
                category,
                start,
                end
            })

            if (reset) {
                setPosts(newPosts)
            } else {
                setPosts(prev => [...prev, ...newPosts])
            }
            setTotalPosts(total)
            setPage(newPage + 1)
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        } finally {
            setLoading(false)
        }
    }, [searchTerm, difficulty, category, page])

    useEffect(() => {
        fetchPosts(true)
    }, [searchTerm, difficulty, category])

    const difficultyColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800'
            case 'intermediate': return 'bg-yellow-100 text-yellow-800'
            case 'advanced': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <Input
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:w-1/3"
                    />

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="form-select rounded-md border-gray-300"
                    >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select rounded-md border-gray-300"
                    >
                        <option value="all">All Categories</option>
                        <option value="tutorial">Tutorials</option>
                        <option value="guide">Guides</option>
                        <option value="opinion">Opinion</option>
                    </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post._id} className="flex flex-col hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <Image
                                    src={urlForImage(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            </div>

                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${difficultyColor(post.difficulty)}`}>
                                        {post.difficulty}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.category}</span>
                                </div>
                                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.technologies.map((tech) => (
                                        <span key={tech} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        {post.readingTime} min read
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/blog/${post.slug.current}`}>Read More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {loading && <div className="text-center mt-8">Loading...</div>}

                {posts.length < totalPosts && !loading && (
                    <Button
                        variant="outline"
                        onClick={() => fetchPosts()}
                        className="mx-auto mt-8 block"
                    >
                        Load More
                    </Button>
                )}

                <p className="text-center text-gray-500 mt-8">
                    Showing {posts.length} of {totalPosts} articles
                </p>
            </main>
        </div>
    )
}
