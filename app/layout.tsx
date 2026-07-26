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
    metadataBase: new URL('https://timurisa.com'),
    title: {
        default: "Timur Isachenko | Principal Solution Architect & AI System Engineer",
        template: "%s | Timur Isachenko"
    },
    description: "Principal Solution Architect and AI System Engineer specializing in reactive systems, microservices, and generative AI. 15+ years scaling systems for the Sochi 2014 Olympics, Sberbank, and enterprise platforms.",
    keywords: [
        "Timur Isachenko",
        "Solution Architect",
        "Tech Lead",
        "AI System Engineer",
        "software engineer",
        "technical writer",
        "web development",
        "AI development",
        "Apache Ignite",
        "Generative AI",
        "reactive systems",
        "microservices",
        "software architecture",
        "full-stack development",
        "React development",
        "TypeScript",
        "Next.js",
        "machine learning"
    ],
    alternates: {
        canonical: 'https://timurisa.com'
    },
    authors: [
        { name: "Timur Isachenko", url: "https://timurisa.com" }
    ],
    creator: 'Timur Isachenko',
    publisher: 'Timur Isachenko',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://timurisa.com',
        siteName: 'Timur Isachenko',
        title: 'Timur Isachenko | Principal Solution Architect & AI System Engineer',
        description: 'Portfolio and engineering showcase: reactive systems, microservices, and AI-powered products built over 15+ years.',
        images: [{
            url: '/apple-icon.png',
            width: 180,
            height: 180,
            alt: 'Timur Isachenko - Portfolio and Blog'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Timur Isachenko | Principal Solution Architect & AI System Engineer',
        description: 'Portfolio and engineering showcase: reactive systems, microservices, and AI-powered products built over 15+ years.',
        images: ['/apple-icon.png']
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        viewportFit: 'cover',
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#030712' },
        { media: '(prefers-color-scheme: dark)', color: '#030712' },
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
                <GoogleAnalytics gaId="G-EJLVH2G7G2" />
            </body>
        </html>
    );
}
