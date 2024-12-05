import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

type ChangeFreq = 'weekly' | 'daily' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never'

async function getBlogPosts() {
    const query = groq`*[_type == "post"] {
        "slug": slug.current,
        _updatedAt
    }`
    const posts = await client.fetch(query)
    return posts.map((post: { slug: string; _updatedAt: string }) => ({
        url: `https://timurisa.com/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'weekly' as ChangeFreq,
        priority: 0.7,
    }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://timurisa.com'
    const blogPosts = await getBlogPosts()

    const mainPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as ChangeFreq,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as ChangeFreq,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as ChangeFreq,
            priority: 0.6,
        },
        // Add other main pages here
    ]

    const staticPages = [
        'privacy-policy',
        'terms',
        'contact'
    ].map(page => ({
        url: `${baseUrl}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFreq,
        priority: 0.3,
    }))

    return [
        ...mainPages,
        ...blogPosts,
        ...staticPages,
    ]
}
