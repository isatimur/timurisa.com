import React from 'react';
import { getAllPosts, getPostById } from '../../../../../../lib/api';
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
    const { title } = await getPostById(id);
    return {
        title,
    };
}

export default async function PostPage({ params: { id } }: { params: { id: string } }) {
    const { html, title, date, short, image } = await getPostById(id);

    return (
        <article className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <header className="relative text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-lg text-gray-300">{date}</p>
                </div>
            </header>
            <main className="mt-8 prose mx-auto">
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <Image src={image} alt={title} className="w-full h-auto object-cover" />
                </div>
                <p className="text-gray-600 text-lg">{short}</p>
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: html }} />
            </main>
            <footer className="mt-12 bg-white shadow-md p-6 rounded-lg">
                <div className="flex items-center space-x-4">
                    <Image src="/assets/avatar-modified.jpg" alt="Author" className="w-16 h-16 rounded-full" />
                    <div>
                        <h4 className="text-lg font-semibold">Timur Isachenko</h4>
                        <p className="text-gray-500">Software Engineer</p>
                    </div>
                </div>
                <p className="text-gray-600 mt-4">Timur Isachenko is a seasoned software engineer with a passion for Java and Kotlin. He has been developing enterprise-level applications for over a decade and is excited to share his knowledge and insights with the community.</p>
                <div className="flex space-x-4 mt-4">
                    <Link href="https://www.linkedin.com/in/timur-isachenko/"><Image width="6" height="6" src="/assets/iconmonstr-linkedin-3.svg" alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition-transform"/></Link>
                    <Link href="https://github.com/isatimur"><Image width="6" height="6" src="/assets/iconmonstr-github-1.svg" alt="GitHub" className="w-6 h-6 hover:scale-110 transition-transform"/></Link>
                </div>
            </footer>
        </article>
    );
}

export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map(post => ({
        id: post.id,
    }));
}