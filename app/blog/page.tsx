import BlogIndex, { type Post } from "@/components/BlogIndex";
import { client } from "@/sanity/lib/client";
export const revalidate = 60;
export default async function BlogPage() {
  const posts = await client.fetch<Post[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {_id,title,slug,mainImage,excerpt,publishedAt,"estimatedReadingTime":round(length(pt::text(body))/5/200),"categories":categories[]->title}`);
  return <BlogIndex initialPosts={posts} initialTotal={posts.length} />;
}
