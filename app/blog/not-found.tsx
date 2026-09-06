import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
export default function BlogPostNotFound() {
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main site-not-found">
        <h1>
          This page is
          <br />
          still unwritten.
        </h1>
        <p>
          This article doesn’t exist, or its link has changed. There’s plenty
          more to explore in the journal.
        </p>
        <Link className="primary-action" href="/blog">
          <ArrowLeft size={16} />
          Back to the journal
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
