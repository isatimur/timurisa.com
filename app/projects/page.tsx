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
import { Briefcase, Calendar, ChevronRight, Layers, Rocket, ExternalLink, Chrome, Sparkles } from 'lucide-react';
import { projects } from '@/src/constants';

interface Project {
    name: string;
    company_name: string;
    date: string;
    category: string;
    icon?: StaticImageData;
    description: string;
    points: string[];
    tags: string[];
    link?: string;
}

const typedProjects = projects as unknown as Project[];

const CHROME_EXTENSION_NAME = 'Daily Affirmations';
const chromeExtension = typedProjects.find((p) => p.name === CHROME_EXTENSION_NAME);
const gridProjects = typedProjects.filter((p) => p.name !== CHROME_EXTENSION_NAME);

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

                {chromeExtension && (
                    <div className="max-w-4xl mx-auto mb-12 p-6 sm:p-8 rounded-3xl cyber-glass border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono tracking-widest text-emerald-300 bg-emerald-500/10 border-l border-b border-emerald-500/30 rounded-bl-xl">
                            FEATURED
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                            <Chrome className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono mb-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>LIVE ON THE CHROME WEB STORE</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{chromeExtension.name}</h2>
                            <p className="text-slate-400 text-sm font-light max-w-xl">
                                {chromeExtension.description}
                            </p>
                        </div>
                        <a
                            href={chromeExtension.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            <Chrome className="w-4 h-4" />
                            Add to Chrome
                        </a>
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

                            {selected.link && (
                                <a
                                    href={selected.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-mono pt-2"
                                >
                                    Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
