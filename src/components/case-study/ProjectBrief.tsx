import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import type { ProjectRecord } from "@/src/constants/projectPages";
import { getProjectCenterpiece } from "@/src/constants/projectCenterpieces";
export function ProjectBrief({
  project,
  accent,
}: {
  project: ProjectRecord;
  accent: string;
}) {
  const centerpiece = getProjectCenterpiece(project.name, accent);
  return (
    <main className="site-main">
      <header className="detail-intro">
        <Link href="/projects" className="text-action back-link">
          <ArrowLeft size={16} />
          All projects
        </Link>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className="detail-facts">
          <div>
            <span>Company</span>
            <strong>{project.company_name}</strong>
          </div>
          <div>
            <span>Timeframe</span>
            <strong>{project.date}</strong>
          </div>
          <div>
            <span>Focus</span>
            <strong>{project.category}</strong>
          </div>
        </div>
      </header>
      <div className="detail-art">
        <ProjectArtwork index={project.name.length} />
        <span>{project.category}</span>
      </div>
      <div className="brief-content">
        <section className="case-chapter">
          <h2>Behind the build.</h2>
          <ul>
            {project.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        {centerpiece && (
          <section className="centerpiece-section">
            <h2>{centerpiece.heading}</h2>
            <div
              className={
                project.name === "IDS Reactive Billing Platform"
                  ? "centerpiece-content scroll-centerpiece"
                  : "centerpiece-content"
              }
            >
              {centerpiece.node}
            </div>
          </section>
        )}
        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {project.platforms && (
          <div className="publication-actions">
            {project.platforms.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action"
              >
                {p.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="page-next">
        <p>The next idea is waiting.</p>
        <Link href="/projects">
          Back to the collection.
          <ArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
