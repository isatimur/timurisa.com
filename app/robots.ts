import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio/', '/api/'],
            }
        ],
        sitemap: 'https://timurisa.com/sitemap.xml',
        host: 'https://timurisa.com'
    }
} 