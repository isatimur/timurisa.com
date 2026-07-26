import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { CookieConsent } from "@/components/ui/cookie-consent";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
    display: "swap",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://timurisachenko.com'),
    title: {
        default: "Timur Isachenko - Software Engineer & Technical Writer",
        template: "%s | Timur Isachenko"
    },
    description: "Personal blog and portfolio of Timur Isachenko. Writing about software engineering, AI development, and technical insights from industry experience.",
    keywords: [
        "Timur Isachenko",
        "software engineer",
        "technical writer",
        "web development",
        "AI development",
        "programming blog",
        "software architecture",
        "tech articles",
        "engineering blog",
        "full-stack development",
        "React development",
        "TypeScript",
        "Next.js",
        "machine learning",
        "software engineering blog"
    ],
    alternates: {
        canonical: 'https://timurisa.com'
    },
    authors: [
        { name: "Timur Isachenko", url: "https://timurisa.com" }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://timurisa.com',
        siteName: 'Timur Isachenko',
        title: 'Timur Isachenko - Software Engineer & Technical Writer',
        description: 'Personal blog and portfolio showcasing software engineering projects and technical writing.',
        images: [{
            url: '/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Timur Isachenko - Portfolio and Blog'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Timur Isachenko - Software Engineer & Technical Writer',
        description: 'Software engineering insights and technical writing from industry experience.',
        creator: '@TimurIsachenko', // Replace with actual Twitter handle if available
        images: ['/og-image.jpg']
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        viewportFit: 'cover',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
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
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="scroll-smooth"
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
                suppressHydrationWarning
            >
                <main className="flex-grow">
                    {children}
                </main>
                <CookieConsent />
                <GoogleAnalytics gaId="" />
            </body>
        </html>
    );
}