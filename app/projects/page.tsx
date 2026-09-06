"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { projects } from "@/src/constants";
import {
  getProjectSlug,
  type ProjectRecord,
} from "@/src/constants/projectPages";
import {
  getCaseStudyByProjectRef,
  hasCaseStudyContent,
} from "@/src/constants/caseStudies";
const records = projects as unknown as ProjectRecord[];
const categories = [
  "All projects",
  ...Array.from(new Set(records.map((p) => p.category))),
];
export default function ProjectsPage() {
  const [category, setCategory] = useState("All projects");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      records.filter(
        (p) =>
          (category === "All projects" || p.category === category) &&
          `${p.name} ${p.description} ${p.tags.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main">
        <header className="page-intro intro-split">
          <div>
            <h1>
              Ideas into systems.
              <br />
              <span>Systems into impact.</span>
            </h1>
            <p>
              A closer look at the products, platforms, and architecture I’ve
              helped bring into the world.
            </p>
          </div>
          <div className="intro-aside">
            <span>{records.length} projects</span>
            <p>
              AI-native products.
              <br />
              Enterprise platforms.
              <br />
              Experiments worth building.
            </p>
            <a href="#project-index" className="text-action">
              Explore the collection <ArrowUpRight size={16} />
            </a>
          </div>
        </header>
        <section
          id="project-index"
          className="project-index"
          aria-label="Project collection"
        >
          <div className="collection-toolbar">
            <div className="filter-list" aria-label="Filter projects">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} />
              <input
                aria-label="Search projects"
                placeholder="Find a project…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  aria-label="Clear project search"
                  onClick={() => setQuery("")}
                >
                  <X size={15} />
                </button>
              )}
            </label>
          </div>
          <p className="result-count" role="status">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {category !== "All projects" ? ` in ${category}` : ""}
          </p>
          <div className="collection-grid">
            {filtered.map((p) => {
              const study = getCaseStudyByProjectRef(p.name);
              return (
                <article className="collection-project" key={p.name}>
                  <Link
                    className="project-destination"
                    href={`/projects/${getProjectSlug(p)}`}
                  >
                    <div className="collection-art">
                      <ProjectArtwork index={records.indexOf(p)} />
                      <span className="project-open">
                        <ArrowUpRight size={21} />
                      </span>
                    </div>
                    <div className="project-meta">
                      <span>{p.category}</span>
                      <span>{p.date}</span>
                    </div>
                    <h2>{p.name}</h2>
                    <p>{p.description}</p>
                    <span className="read-link">
                      {study && hasCaseStudyContent(study)
                        ? "Read case study"
                        : "Explore project"}{" "}
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                  <div className="project-tags">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {p.platforms && (
                    <div className="platform-links">
                      {p.platforms.map((platform) => (
                        <a
                          key={platform.url}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {platform.label}
                          <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          {!filtered.length && (
            <div className="empty-state">
              <h2>No projects match yet.</h2>
              <p>Try a technology, a company, or a different category.</p>
              <button
                className="primary-action"
                onClick={() => {
                  setQuery("");
                  setCategory("All projects");
                }}
              >
                Reset filters <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </section>
        <div className="page-next">
          <p>Have something ambitious in mind?</p>
          <Link href="/contact">
            Let’s build it together.
            <ArrowUpRight />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
