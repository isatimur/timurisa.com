import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { getAllProjectSlugs } from '@/src/constants/projectPages';
import { SITE_URL } from '@/lib/seo';
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<{slug: string; _updatedAt?: string; publishedAt?: string}[]>(`*[_type == "post" && defined(slug.current)] {"slug":slug.current,_updatedAt,publishedAt}`);
  return [
    ...['', '/blog', '/book', '/projects', '/contact', '/privacy-policy', '/terms'].map(path => ({ url: `${SITE_URL}${path}` })),
    ...getAllProjectSlugs().map(slug => ({ url: `${SITE_URL}/projects/${slug}` })),
    ...posts.map(post => { const modified = post._updatedAt || post.publishedAt; return {
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(modified && !Number.isNaN(Date.parse(modified)) ? { lastModified: new Date(modified) } : {}),
    }; }),
  ];
}
