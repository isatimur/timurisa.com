import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata('/blog', 'Writing & Research', 'Notes on AI engineering, distributed systems, and products by Timur Isachenko.');
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
