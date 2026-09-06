import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
export default function NotFound() {
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main site-not-found">
        <h1>A little off the map.</h1>
        <p>That page isn’t here. Let’s get you back to the work.</p>
        <Link className="primary-action" href="/">
          <ArrowLeft size={16} />
          Back home
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
