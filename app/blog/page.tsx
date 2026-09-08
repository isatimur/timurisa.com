import BlogIndex from "@/components/BlogIndex";
import { getPostSummaries } from "@/lib/posts";
export const revalidate = 60;
export default async function BlogPage() {
  return <BlogIndex initialPosts={await getPostSummaries()} />;
}
