'use client';

import { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NavBar } from '@/components/NavBar';
import { Calendar, Layers, Rocket, Chrome, Apple, Globe, Smartphone, Sparkles, Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/src/constants';
import { getCaseStudyByProjectRef, hasCaseStudyContent } from '@/src/constants/caseStudies';
import { getCategoryTheme } from '@/src/constants/categoryThemes';
import { getProjectSlug } from '@/src/constants/projectPages';
import { BlurWords } from '@/src/components/effects/BlurWords';
import { TiltCard } from '@/src/components/effects/TiltCard';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Platform {
    type: 'web' | 'chrome' | 'ios' | 'android' | 'github';
    label: string;
    url: string;
}

interface Project {
    name: string;
    company_name: string;
    date: string;
    category: string;
    icon?: StaticImageData;
    description: string;
    points: string[];
    tags: string[];
    platforms?: Platform[];
}

const PLATFORM_ICONS: Record<Platform['type'], typeof Chrome> = {
    web: Globe,
    chrome: Chrome,
    ios: Apple,
    android: Smartphone,
    github: Github,
};

const typedProjects = projects as unknown as Project[];

const SIDE_PROJECTS_CATEGORY = 'Side Projects & Tools';
const sideProjects = typedProjects.filter((p) => p.category === SIDE_PROJECTS_CATEGORY);
const gridProjects = typedProjects.filter((p) => p.category !== SIDE_PROJECTS_CATEGORY);

const CATEGORIES = ['All Projects', ...Array.from(new Set(gridProjects.map((p) => p.category)))];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('All Projects');

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'All Projects') return gridProjects;
        return gridProjects.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-[#030712] bg-grid-pattern">
            <NavBar />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                        <Layers className="w-3.5 h-3.5" />
                        <span>ENGINEERING PORTFOLIO</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-cyber">
                        <BlurWords text="Projects & Case Studies" />
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Real systems shipped over 17+ years — reactive billing platforms, federal grant systems,
                        brokerage integrations, and Olympic-scale infrastructure.
                    </p>
                </div>

                {sideProjects.length > 0 && (
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="flex items-center gap-2 justify-center mb-6">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-sm font-mono uppercase tracking-widest text-emerald-300">
                                Side Projects & Tools
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {sideProjects.map((project, index) => {
                                const caseStudy = getCaseStudyByProjectRef(project.name);

                                return (
                                    <motion.div
                                        key={project.name}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5, ease: EASE, delay: (index % 4) * 0.07 }}
                                    >
                                    <TiltCard
                                        maxTilt={4}
                                        className="p-6 rounded-2xl cyber-glass border border-emerald-500/20 cyber-glass-hover flex flex-col h-full"
                                    >
                                        <Link
                                            href={`/projects/${getProjectSlug(project)}`}
                                            className="text-left flex flex-col flex-grow group mb-4"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                                    <Rocket className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-emerald-300 font-mono text-xs truncate">{project.company_name}</div>
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                                                        <Calendar className="w-3 h-3" />
                                                        {project.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-emerald-300 transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow font-light">
                                                {project.description}
                                            </p>
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-xs font-mono group-hover:gap-2 transition-all ${
                                                    caseStudy && hasCaseStudyContent(caseStudy) ? '' : 'text-emerald-400'
                                                }`}
                                                style={caseStudy && hasCaseStudyContent(caseStudy) ? { color: caseStudy.accent.primary } : undefined}
                                            >
                                                {caseStudy && hasCaseStudyContent(caseStudy) ? 'Read the Full Story' : 'View Project Page'}
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </span>
                                        </Link>

                                        {project.platforms && project.platforms.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-500/10">
                                                {project.platforms.map((platform) => {
                                                    const Icon = PLATFORM_ICONS[platform.type];
                                                    return (
                                                        <a
                                                            key={platform.url}
                                                            href={platform.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                                                        >
                                                            <Icon className="w-3.5 h-3.5" />
                                                            {platform.label}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </TiltCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        const accent = cat === 'All Projects' ? '#22D3EE' : getCategoryTheme(cat).accent;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                                    isActive
                                        ? 'font-bold text-black shadow-lg'
                                        : 'cyber-glass text-slate-300 border hover:text-white'
                                }`}
                                style={
                                    isActive
                                        ? { backgroundColor: accent, boxShadow: `0 10px 25px -10px ${accent}80` }
                                        : { borderColor: `${accent}33` }
                                }
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredProjects.map((project, index) => {
                        const caseStudy = getCaseStudyByProjectRef(project.name);
                        const theme = getCategoryTheme(project.category);
                        const CategoryIcon = theme.Icon;

                        return (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, ease: EASE, delay: (index % 6) * 0.06 }}
                            >
                            <TiltCard
                                maxTilt={5}
                                className="p-6 rounded-2xl cyber-glass cyber-glass-hover flex flex-col group transition-colors h-full"
                                style={{ borderWidth: 1, borderStyle: 'solid', borderColor: `${theme.accent}33` }}
                            >
                                <Link
                                    href={`/projects/${getProjectSlug(project)}`}
                                    className="text-left flex flex-col flex-grow"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="relative w-12 h-12 rounded-xl bg-slate-900 p-2 flex items-center justify-center shrink-0"
                                            style={{ borderWidth: 1, borderStyle: 'solid', borderColor: `${theme.accent}4d` }}
                                        >
                                            {project.icon ? (
                                                <Image
                                                    src={project.icon}
                                                    alt={project.company_name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-contain p-2"
                                                />
                                            ) : (
                                                <CategoryIcon className="w-5 h-5" style={{ color: theme.accent }} />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-mono text-xs truncate" style={{ color: theme.accent }}>{project.company_name}</div>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                                                <Calendar className="w-3 h-3" />
                                                {project.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 mb-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: theme.accent }}>
                                        <CategoryIcon className="w-3 h-3" />
                                        {project.category}
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 leading-snug transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow font-light">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900"
                                                style={{ borderWidth: 1, borderStyle: 'solid', borderColor: `${theme.accent}33`, color: theme.accent }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span
                                        className="inline-flex items-center gap-1.5 text-xs font-mono group-hover:gap-2 transition-all"
                                        style={{ color: caseStudy && hasCaseStudyContent(caseStudy) ? caseStudy.accent.primary : theme.accent }}
                                    >
                                        {caseStudy && hasCaseStudyContent(caseStudy) ? 'Read the Full Story' : 'View Project Page'}
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </Link>
                            </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

        </div>
    );
}
