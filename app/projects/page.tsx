'use client';

import { useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { NavBar } from '@/components/NavBar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Briefcase, Calendar, ChevronRight, Layers, Rocket, Chrome, Apple, Globe, Smartphone, Sparkles, Github } from 'lucide-react';
import { projects } from '@/src/constants';

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
    const [selected, setSelected] = useState<Project | null>(null);

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
                        Projects & Case Studies
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Real systems shipped over 15+ years — reactive billing platforms, federal grant systems,
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
                            {sideProjects.map((project) => (
                                <div
                                    key={project.name}
                                    className="p-6 rounded-2xl cyber-glass border border-emerald-500/20 cyber-glass-hover flex flex-col"
                                >
                                    <button
                                        onClick={() => setSelected(project)}
                                        className="text-left flex flex-col flex-grow group"
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
                                        <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-mono group-hover:gap-2 transition-all mb-4">
                                            View Details <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </button>

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
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                                activeCategory === cat
                                    ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                                    : 'cyber-glass text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 border border-cyan-500/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredProjects.map((project) => (
                        <button
                            key={project.name}
                            onClick={() => setSelected(project)}
                            className="text-left p-6 rounded-2xl cyber-glass border border-cyan-500/20 cyber-glass-hover flex flex-col group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="relative w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 p-2 flex items-center justify-center shrink-0">
                                    {project.icon ? (
                                        <Image
                                            src={project.icon}
                                            alt={project.company_name}
                                            fill
                                            sizes="48px"
                                            className="object-contain p-2"
                                        />
                                    ) : (
                                        <Rocket className="w-5 h-5 text-cyan-400" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-cyan-300 font-mono text-xs truncate">{project.company_name}</div>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                                        <Calendar className="w-3 h-3" />
                                        {project.date}
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                                {project.name}
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow font-light">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900 border border-slate-800 text-cyan-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <span className="inline-flex items-center gap-1 text-cyan-400 text-xs font-mono group-hover:gap-2 transition-all">
                                View Details <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                        </button>
                    ))}
                </div>
            </main>

            <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent className="cyber-glass border border-cyan-500/20 max-w-xl bg-slate-950/95">
                    {selected && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="relative w-10 h-10 rounded-lg bg-slate-900 border border-cyan-500/30 p-1.5 flex items-center justify-center shrink-0">
                                        {selected.icon ? (
                                            <Image
                                                src={selected.icon}
                                                alt={selected.company_name}
                                                fill
                                                sizes="40px"
                                                className="object-contain p-1.5"
                                            />
                                        ) : (
                                            <Rocket className="w-4 h-4 text-cyan-400" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="text-cyan-300 font-mono text-xs">{selected.company_name}</div>
                                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {selected.date}
                                        </div>
                                    </div>
                                </div>
                                <DialogTitle className="text-2xl font-bold text-white">
                                    {selected.name}
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-slate-300 leading-relaxed font-light">
                                {selected.description}
                            </p>

                            <ul className="space-y-2.5">
                                {selected.points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                                        <Briefcase className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {selected.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-xs font-mono rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {selected.platforms && selected.platforms.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {selected.platforms.map((platform) => {
                                        const Icon = PLATFORM_ICONS[platform.type];
                                        return (
                                            <a
                                                key={platform.url}
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-mono hover:opacity-90 transition-opacity"
                                            >
                                                <Icon className="w-4 h-4" />
                                                {platform.label}
                                            </a>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
