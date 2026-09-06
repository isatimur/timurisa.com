"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "/"],
    ["Projects", "/projects"],
    ["Writing", "/blog"],
    ["Books", "/book"],
  ];
  return (
    <header className="portfolio-nav site-nav">
      <Link href="/" className="wordmark" aria-label="Timur Isachenko home">
        ti<span>.</span>
      </Link>
      <nav
        id="site-navigation"
        aria-label="Main navigation"
        className={`nav-links${open ? " is-open" : ""}`}
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={
              pathname === href ||
              (href !== "/" && pathname.startsWith(`${href}/`))
                ? "page"
                : undefined
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link className="nav-contact" href="/contact">
        Let’s talk <ArrowUpRight size={17} />
      </Link>
      <button
        className="menu-toggle"
        aria-controls="site-navigation"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
