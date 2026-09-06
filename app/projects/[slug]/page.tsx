import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { BookTieIn } from "@/src/components/case-study/BookTieIn";
import { ProjectBrief } from "@/src/components/case-study/ProjectBrief";
import {
  getAllProjectSlugs,
  resolveProjectPage,
} from "@/src/constants/projectPages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolution = resolveProjectPage(slug);

  if (!resolution) {
    return { title: "Project Not Found" };
  }

  if (resolution.kind === "case-study") {
    const { caseStudy } = resolution;
    const title = `${caseStudy.projectRef} — Case Study | Timur Isachenko`;
    return {
      title,
      description: caseStudy.hook,
      openGraph: { title, description: caseStudy.hook },
      twitter: {
        card: "summary_large_image",
        title,
        description: caseStudy.hook,
      },
    };
  }

  const { project } = resolution;
  const title = `${project.name} — Project | Timur Isachenko`;
  return {
    title,
    description: project.description,
    openGraph: { title, description: project.description },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const resolution = resolveProjectPage(slug);
  if (!resolution) notFound();
  if (resolution.kind === "brief")
    return (
      <div className="portfolio site-shell case-study">
        <NavBar />
        <ProjectBrief project={resolution.project} accent="#ff7b42" />
        <SiteFooter />
      </div>
    );
  const { caseStudy: c } = resolution;
  const sections = [
    { id: "situation", heading: "The situation", paragraph: c.situation },
    { id: "problem", heading: "The problem", paragraph: c.problem },
    { id: "approach", heading: "The approach", items: c.approach },
    { id: "pitfalls", heading: "What broke. What changed.", items: c.pitfalls },
    { id: "outcome", heading: "The outcome", paragraph: c.outcome },
    { id: "lessons", heading: "What I learned", items: c.lessons },
  ];
  return (
    <div className="portfolio site-shell case-study">
      <NavBar />
      <main className="site-main">
        <header className="detail-intro">
          <Link className="text-action back-link" href="/projects">
            <ArrowLeft size={16} />
            All projects
          </Link>
          <h1>{c.projectRef}</h1>
          <p>{c.hook}</p>
          <div className="detail-facts">
            <div>
              <span>Role</span>
              <strong>{c.role}</strong>
            </div>
            <div>
              <span>Company</span>
              <strong>{c.company}</strong>
            </div>
            <div>
              <span>Timeframe</span>
              <strong>{c.timeframe}</strong>
            </div>
            {c.awards && (
              <div>
                <span>Recognition</span>
                <strong>{c.awards}</strong>
              </div>
            )}
          </div>
        </header>
        <div className="detail-art">
          <ProjectArtwork index={slug.length} />
          <span>Architecture in practice</span>
        </div>
        <div className="case-layout">
          <aside className="case-navigation">
            <p>Inside the project</p>
            <nav aria-label="Case study sections">
              {sections.map((s) => (
                <a href={`#${s.id}`} key={s.id}>
                  {s.heading}
                </a>
              ))}
            </nav>
          </aside>
          <div className="case-content">
            {sections.map((s) => (
              <section id={s.id} className="case-chapter" key={s.id}>
                <h2>{s.heading}</h2>
                {s.paragraph && <p>{s.paragraph}</p>}
                {s.items && (
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {c.bookTieIn && <BookTieIn tieIn={c.bookTieIn} />}
            <div className="project-tags">
              {c.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="page-next">
          <p>There’s more behind the work.</p>
          <Link href="/projects">
            Explore another project.
            <ArrowUpRight />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
