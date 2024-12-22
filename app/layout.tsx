import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    metadataBase: new URL('https://timurisa.com'),
    title: {
        default: 'Timur Isachenko | Tech Lead | Solution Architect',
        template: '%s | Timur Isachenko'
    },
    description: 'Tech Lead and Solution Architect specializing in high-performance computing with Apache Ignite, Generative AI, and distributed systems. Author of technical books and expert in AI implementation.',
    keywords: [
        'Tech Lead', 
        'Solution Architect', 
        'Apache Ignite', 
        'Generative AI', 
        'Local LLM', 
        'High Performance Computing',
        'Software Development',
        'Web Development',
        'Technology'
    ],
    authors: [{ name: 'Timur Isachenko', url: 'https://timurisa.com' }],
    creator: 'Timur Isachenko',
    publisher: 'Timur Isachenko',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://timurisa.com',
        siteName: 'Timur Isachenko',
        title: 'Timur Isachenko | Tech Lead & Solution Architect',
        description: 'Portfolio and full information about my work, passion, contributions, achievements, awards and hobbies',
        images: [
            {
                url: 'https://timurisa.com/apple-icon.png',
                width: 180,
                height: 180,
                alt: 'Timur Isachenko Profile'
            }
        ]
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    }
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="Timur Isachenko | Tech Lead | Solution Architect" />
                <meta property="og:description" content="Portfolio and full information about my work, passion, contributions, achievements, awards and hobbies" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://timurisa.com" />
                <meta property="og:image" content="https://timurisa.com/apple-icon.png" />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
            <GoogleAnalytics gaId="G-EJLVH2G7G2" />
        </html>
    )
}