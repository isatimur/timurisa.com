import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { CaseStudySection } from './CaseStudySection';
import { getCategoryTheme } from '@/src/constants/categoryThemes';
import { PLATFORM_ICONS } from '@/src/constants/platformIcons';
import type { ProjectRecord } from '@/src/constants/projectPages';
import { getProjectSlug } from '@/src/constants/projectPages';

export function ProjectBrief({ project }: { project: ProjectRecord }) {
    const slug = getProjectSlug(project);
    const category = getCategoryTheme(project.category);
    const CategoryIcon = category.Icon;

    return (
        <>
            <header className="max-w-[740px] mx-auto px-4 pt-28 pb-10">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors mb-8"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    All Projects
                </Link>

                <div className="case-eyebrow mb-4">PROJECT_LOG // {slug.toUpperCase()}.MD</div>

                <h1 className="case-title text-4xl md:text-5xl font-bold leading-tight mb-4">
                    {project.name}
                </h1>

                <p className="text-sm font-mono text-slate-400 mb-6 flex items-center gap-2 flex-wrap">
                    <span>{project.company_name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="case-eyebrow inline-flex items-center gap-1.5 !mb-0">
                        <CategoryIcon className="w-3 h-3" />
                        {project.category}
                    </span>
                </p>

                <p className="text-lg text-slate-300 font-light leading-relaxed">
                    {project.description}
                </p>
            </header>

            <main className="max-w-[740px] mx-auto px-4 pb-24">
                {project.points.length > 0 && (
                    <CaseStudySection eyebrow="HIGHLIGHTS" heading="What It Does" items={project.points} />
                )}

                <footer className="case-rule pt-10 mt-2 border-t flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
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

                {project.platforms && project.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                        {project.platforms.map((platform) => {
                            const Icon = PLATFORM_ICONS[platform.type];
                            return (
                                <a
                                    key={platform.url}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="case-card inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-mono text-slate-200 hover:text-white transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                    {platform.label}
                                </a>
                            );
                        })}
                    </div>
                )}
            </main>
        </>
    );
}
