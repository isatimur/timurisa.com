import { MetadataRoute } from 'next';
import { getPostSummaries } from '@/lib/posts';
import { getAllProjectSlugs } from '@/src/constants/projectPages';
import { SITE_URL } from '@/lib/seo';
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSummaries();
  return [
    ...['', '/blog', '/book', '/projects', '/contact', '/privacy-policy', '/terms'].map(path => ({ url: `${SITE_URL}${path}` })),
    ...getAllProjectSlugs().map(slug => ({ url: `${SITE_URL}/projects/${slug}` })),
    ...posts.map(post => { const modified = post._updatedAt || post.publishedAt; return {
      url: `${SITE_URL}/blog/${post.slug.current}`,
      ...(modified && !Number.isNaN(Date.parse(modified)) ? { lastModified: new Date(modified) } : {}),
    }; }),
  ];
}
