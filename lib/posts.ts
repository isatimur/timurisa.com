import { cache } from 'react';
import { client } from '@/sanity/lib/client';
import archive from '@/content/posts/archive.json';

export interface PostSummary {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { _ref: string } };
  excerpt?: string;
  publishedAt?: string;
  _updatedAt?: string;
  estimatedReadingTime?: number;
  categories?: string[];
  source?: { title: string; url: string; platform: string; publishedAt: string; editorialNote: string };
}
export interface Post extends PostSummary {
  authorName?: string;
  authorImage?: { asset: { _ref: string } };
  body: Array<{ _type: string; _key: string; [key: string]: any }>;
}
const localPosts = archive as Post[];
export function readingTime(body: Post['body']): number {
  const text = body.map(block => block._type === 'code' ? block.code || '' : (block.children || []).map((child: {text?: string}) => child.text || '').join(' ')).join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}
/** Local, reviewed editions take precedence if a CMS post later uses the same slug. */
export const getPostSummaries = cache(async (): Promise<PostSummary[]> => {
  const cms = await client.fetch<PostSummary[]>(`*[_type == "post" && defined(slug.current)] {_id,title,slug,mainImage,excerpt,publishedAt,_updatedAt,"estimatedReadingTime":round(length(pt::text(body))/5/200),"categories":categories[]->title}`);
  const merged = new Map(cms.map(post => [post.slug.current, post]));
  for (const {body, ...post} of localPosts) merged.set(post.slug.current, {...post, estimatedReadingTime: readingTime(body)});
  return [...merged.values()].sort((a,b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
});
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const local = localPosts.find(post => post.slug.current === slug);
  if (local) return local;
  return client.fetch<Post | null>(`*[_type == "post" && slug.current == $slug][0]{_id,title,slug,mainImage,body,"authorName":author->name,"authorImage":author->image,publishedAt,_updatedAt,"categories":categories[]->title,excerpt}`, {slug});
});
