import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <Link href="/" className="footer-name">
        Timur Isachenko <span>© {new Date().getFullYear()}</span>
      </Link>
      <div>
        <a
          href="https://github.com/isatimur"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={13} />
        </a>
        <a
          href="https://linkedin.com/in/timur-isachenko"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ArrowUpRight size={13} />
        </a>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
}
