'use client';

import React from 'react';
import { NavBar } from '@/components/NavBar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BookOpen, Star, Brain } from 'lucide-react';
import { book, book2 } from '../../public/assets';
import Link from 'next/link';
import { Linkedin, Globe } from 'lucide-react';


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

const BookPage = () => {
    const books = [
        {
            title: "Generative AI with Local LLM",
            image: book2,
            description: "Explore the world of Generative AI and Large Language Models (LLMs) with this practical guide. Learn how to implement and deploy LLMs locally, understanding the fundamentals of AI model training and optimization.",
            amazonLink: "https://a.co/d/a7kqMqW",
            leanpubLink: "https://leanpub.com/quickstartwithai",
            websiteLink: "https://quickstartgenai.com",
            publishDate: "2024",
            publisher: "Self-published",
            pages: "304",
            rating: 0,
            features: [
                "Introduction to Large Language Models",
                "Local LLM deployment strategies",
                "Practical AI implementation guides",
                "Performance optimization techniques"
            ]
        },
        {
            title: "High Performance in-memory computing with Apache Ignite",
            image: book,
            description: "Master the power of in-memory computing with Apache Ignite. This comprehensive guide walks you through building scalable, high-performance applications using distributed caching, SQL queries, and real-time processing.",
            amazonLink: "https://a.co/d/4rVYpcH",
            publishDate: "2017",
            publisher: "Lulu Publishing",
            pages: "380",
            rating: 3.3,
            features: [
                "In-depth coverage of Apache Ignite architecture",
                "Practical examples of distributed computing",
                "Performance optimization techniques",
                "Real-world use cases and implementations"
            ]
        }

    ];

    const handleBookPurchase = (link: string) => {
        window.open(link, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <NavBar />
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    My Published Books
                </h1>

                <div className="space-y-16 py-4">
                    {books.map((book, index) => (
                        <section key={index} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <Image
                                    src={book.image.src}
                                    width={400}
                                    height={550}
                                    alt={book.title}
                                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                />
                            </div>
                            <div className="md:w-2/3 space-y-6">
                                <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
                                {book.rating > 0 && (
                                    <div className="flex items-center space-x-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i}
                                                className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                        <span className="text-gray-600">({book.rating})</span>
                                    </div>
                                )}

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {book.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <strong>Published:</strong> {book.publishDate}
                                    </div>
                                    <div>
                                        <strong>Publisher:</strong> {book.publisher}
                                    </div>
                                    <div>
                                        <strong>Pages:</strong> {book.pages}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Key Features:</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {book.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {book.leanpubLink && (
                                        <Button
                                            onClick={() => handleBookPurchase(book.leanpubLink)}
                                            variant="outline"
                                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Get on Leanpub
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => handleBookPurchase(book.amazonLink)}
                                        className="bg-orange-500 hover:bg-orange-600"
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Buy on Amazon
                                    </Button>
                                    {book.websiteLink && (
                                        <Button 
                                            onClick={() => handleBookPurchase(book.websiteLink)}
                                            variant="outline"
                                            className="border-green-600 text-green-600 hover:bg-green-50"
                                        >
                                            <Globe className="mr-2 h-4 w-4" />
                                            Visit Website
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BookPage;