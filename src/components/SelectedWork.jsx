'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { ArrowUpRight, Boxes } from "lucide-react";

const BUCKETS = [
    {
        title: "AI-Native Products & Agents",
        accent: "cyan",
        projectNames: ["StandupAI", "Personal Assistant", "Claims Ledger"],
    },
    {
        title: "High-Scale & Distributed Platforms",
        accent: "violet",
        projectNames: [
            "IDS Reactive Billing Platform",
            "Enterprise Education Platform",
            "Sberbank.ru Platform Redevelopment",
        ],
    },
    {
        title: "Zero-to-One Product Engineering",
        accent: "emerald",
        projectNames: ["Zonelyte", "Archigram", "Swiirl: The Game"],
    },
];

const ACCENT_CLASSES = {
    cyan: {
        border: "border-cyan-500/20",
        label: "text-cyan-300",
        tag: "border-cyan-500/20 text-cyan-300",
    },
    violet: {
        border: "border-violet-500/20",
        label: "text-violet-300",
        tag: "border-violet-500/20 text-violet-300",
    },
    emerald: {
        border: "border-emerald-500/20",
        label: "text-emerald-300",
        tag: "border-emerald-500/20 text-emerald-300",
    },
};

const findProject = (name) => projects.find((p) => p.name === name);

const SelectedWork = () => {
    return (
        <div className="relative">
            <motion.div variants={textVariant()} className="text-center mb-16">
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Selected Work</p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    What I&apos;ve <span className="gradient-text-cyber">Built</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm font-light">
                    A sample from 17+ years of shipped systems, grouped by the kind of problem they solve.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {BUCKETS.map((bucket, bucketIndex) => {
                    const accent = ACCENT_CLASSES[bucket.accent];
                    return (
                        <motion.div
                            key={bucket.title}
                            variants={fadeIn("up", "spring", bucketIndex * 0.1, 0.75)}
                            className={`p-6 rounded-3xl cyber-glass border ${accent.border} flex flex-col gap-5`}
                        >
                            <div className="flex items-center gap-2">
                                <Boxes className={`w-4 h-4 ${accent.label}`} />
                                <h3 className={`text-sm font-mono uppercase tracking-wider ${accent.label}`}>
                                    {bucket.title}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                {bucket.projectNames.map((name) => {
                                    const project = findProject(name);
                                    if (!project) return null;
                                    return (
                                        <div key={name} className="pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                                            <div className="text-white font-bold text-sm mb-1">{project.name}</div>
                                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-2 font-light">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-2 py-0.5 text-[10px] font-mono rounded border ${accent.tag}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="text-center mt-12">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl cyber-glass border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-500/50 font-semibold text-sm transition-all duration-300 hover:scale-105"
                >
                    <span>View All Projects &amp; Case Studies</span>
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default SectionWrapper(SelectedWork, "selected-work");
