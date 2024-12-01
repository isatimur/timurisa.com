'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Image from 'next/image';
import { TableOfContents } from './TableOfContents';
import BlogContent, { ContentBlock } from './BlogContent';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { BookOpen, Clock, ArrowUp, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const builder = imageUrlBuilder(client);

interface ArticleProps {
    title: string;
    authorName: string;
    authorImage: string;
    mainImage: any;
    publishedAt: string;
    readingTime: string;
    body: ContentBlock[];
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function EnhancedCleanArticle({
    title,
    mainImage,
    authorName,
    authorImage,
    publishedAt,
    readingTime,
    body,
}: ArticleProps) {
    const [progress, setProgress] = useState(0);
    const articleRef = useRef<HTMLDivElement>(null);
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);

    const updateProgress = useCallback(() => {
        if (articleRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const windowHeight = scrollHeight - clientHeight;
            const currentProgress = (scrollTop / windowHeight) * 100;
            setProgress(currentProgress);
            setShowFloatingMenu(scrollTop > 300);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(updateProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [updateProgress]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const shareArticle = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href,
            }).catch(console.error);
        } else {
            console.log('Web Share not supported');
        }
    };

    const mainImageUrl = mainImage && mainImage.asset?._ref
        ? builder.image(mainImage).url()
        : '';

    const formattedDate = formatDate(publishedAt);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 relative" ref={articleRef}>
            <Progress value={progress} className="fixed top-0 left-0 right-0 z-50" />

            <Button asChild className="mb-4">
                <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
            </Button>

            {mainImageUrl && (
                <div className="relative h-[40vh] mb-8 rounded-xl overflow-hidden">
                    <Image
                        src={mainImageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
                    <h1 className="absolute bottom-6 left-6 right-6 text-4xl sm:text-5xl font-bold text-white leading-tight">
                        {title}
                    </h1>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                        {authorImage ? (
                            <AvatarImage src={authorImage} alt={authorName} />
                        ) : (
                            <AvatarFallback>{authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <p className="text-lg font-medium">{authorName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span>{readingTime} min read</span>
                </div>
            </div>

            <div className="lg:flex lg:gap-12">
                <aside className="hidden lg:block lg:w-1/4">
                    <div className="sticky top-4">
                        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
                        <TableOfContents content={body} />
                    </div>
                </aside>

                <main className="lg:w-3/4">
                    <article className="prose prose-lg mb-12">
                        <BlogContent content={body} />
                    </article>
                </main>
            </div>

            {showFloatingMenu && (
                <div className="fixed bottom-8 right-8 flex flex-col space-y-2">
                    <Button onClick={shareArticle} className="rounded-full p-2">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button asChild className="rounded-full p-2">
                        <Link href="/blog">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button onClick={scrollToTop} className="rounded-full p-2">
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
