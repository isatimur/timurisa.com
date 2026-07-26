'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Progress } from "@/components/ui/progress";
import { TableOfContents } from './TableOfContents';
import BlogContent, { ContentBlock } from './BlogContent';
import { ArrowUp, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ArticleProps {
    title: string;
    authorName: string;
    authorImage: string;
    mainImage: any;
    publishedAt: string;
    readingTime: string;
    body: ContentBlock[];
}

export default function EnhancedCleanArticle({
    title,
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
        }
    };

    return (
        <div className="relative" ref={articleRef}>
            <Progress value={progress} className="fixed top-0 left-0 right-0 z-50" />

            <div className="lg:flex lg:gap-12">
                <aside className="hidden lg:block lg:w-1/4">
                    <div className="sticky top-4">
                        <h2 className="text-lg font-semibold mb-4 text-white">Table of Contents</h2>
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
