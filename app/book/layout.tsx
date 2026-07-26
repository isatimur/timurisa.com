import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Books by Timur Isachenko | Tech Lead & Solution Architect',
    description: 'Explore technical books by Timur Isachenko on Apache Ignite, Generative AI, and Local LLMs. Practical guides for developers and architects.',
    keywords: ['Apache Ignite Book', 'Generative AI Book', 'Local LLM Guide', 'Technical Books', 'Software Architecture Books'],
    openGraph: {
        title: 'Technical Books by Timur Isachenko',
        description: 'In-depth technical books on Apache Ignite and Generative AI with Local LLMs',
        images: [
            {
                url: 'https://timurisa.com/assets/book-cover.webp',
                width: 800,
                height: 600,
                alt: 'Generative AI with Local LLM Book Cover'
            }
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technical Books by Timur Isachenko',
        description: 'In-depth technical books on Apache Ignite and Generative AI with Local LLMs',
        images: ['https://timurisa.com/assets/book-cover.webp'],
    },
    alternates: {
        canonical: 'https://timurisa.com/book',
    }
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}