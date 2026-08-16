import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { CaseFileHeader } from '@/src/components/case-study/CaseFileHeader';
import { CaseStudySection } from '@/src/components/case-study/CaseStudySection';
import { BookTieIn } from '@/src/components/case-study/BookTieIn';
import { ProjectBrief } from '@/src/components/case-study/ProjectBrief';
import { getAllProjectSlugs, getProjectAccent, resolveProjectPage } from '@/src/constants/projectPages';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const resolution = resolveProjectPage(slug);

    if (!resolution) {
        return { title: 'Project Not Found' };
    }

    if (resolution.kind === 'case-study') {
        const { caseStudy } = resolution;
        const title = `${caseStudy.projectRef} — Case Study | Timur Isachenko`;
        return {
            title,
            description: caseStudy.hook,
            openGraph: { title, description: caseStudy.hook },
            twitter: { card: 'summary_large_image', title, description: caseStudy.hook },
        };
    }

    const { project } = resolution;
    const title = `${project.name} — Project | Timur Isachenko`;
    return {
        title,
        description: project.description,
        openGraph: { title, description: project.description },
        twitter: { card: 'summary_large_image', title, description: project.description },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const resolution = resolveProjectPage(slug);

    if (!resolution) {
        notFound();
    }

    if (resolution.kind === 'case-study') {
        const { caseStudy } = resolution;
        const accentStyle = { '--case-accent': caseStudy.accent.primary } as CSSProperties;

        return (
            <div className="case-study min-h-screen bg-[#030712] bg-grid-pattern" style={accentStyle}>
                <NavBar />
                <CaseFileHeader caseStudy={caseStudy} />

                <main className="max-w-[740px] mx-auto px-4 pb-24">
                    <CaseStudySection eyebrow="SITREP" heading="The Situation" paragraph={caseStudy.situation} />
                    <CaseStudySection eyebrow="ROOT_CAUSE" heading="The Problem" paragraph={caseStudy.problem} />
                    <CaseStudySection eyebrow="EXEC_LOG" heading="The Approach" items={caseStudy.approach} />
                    <CaseStudySection eyebrow="INCIDENT" heading="Pitfalls & What Broke" items={caseStudy.pitfalls} />
                    <CaseStudySection eyebrow="RESOLUTION" heading="Outcome" paragraph={caseStudy.outcome} />
                    <CaseStudySection eyebrow="DEBRIEF" heading="Lessons Learned" items={caseStudy.lessons} />

                    {caseStudy.bookTieIn && <BookTieIn tieIn={caseStudy.bookTieIn} />}

                    <footer className="case-rule pt-10 mt-2 border-t flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-slate-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Link
                            href="/projects"
                            className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                        >
                            ← Back to all projects
                        </Link>
                    </footer>
                </main>
            </div>
        );
    }

    const { project } = resolution;
    const accent = getProjectAccent(project);
    const accentStyle = { '--case-accent': accent } as CSSProperties;

    return (
        <div className="case-study min-h-screen bg-[#030712] bg-grid-pattern" style={accentStyle}>
            <NavBar />
            <ProjectBrief project={project} accent={accent} />
        </div>
    );
}
