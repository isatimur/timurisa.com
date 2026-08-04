'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { Calendar, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const ExperienceCard = ({ experience, index }) => {
    const [expanded, setExpanded] = useState(false);
    const [firstPoint, ...restPoints] = experience.points;
    const hasMore = restPoints.length > 0;

    return (
        <motion.div
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="relative p-6 sm:p-8 rounded-3xl cyber-glass border border-cyan-500/20 cyber-glass-hover mb-8 flex flex-col lg:flex-row gap-6 items-start"
        >
            {/* Left Column: Company Icon & Timeline Meta */}
            <div className="flex items-center gap-4 shrink-0 lg:w-64">
                <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/30 p-2.5 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    {experience.icon ? (
                        <Image
                            src={experience.icon}
                            alt={experience.company_name}
                            fill
                            sizes="56px"
                            className="object-contain"
                        />
                    ) : (
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                    )}
                </div>
                <div>
                    <h4 className="text-cyan-300 font-bold text-base font-mono">{experience.company_name}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 mt-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {experience.date}
                    </span>
                </div>
            </div>

            {/* Right Column: Title & Key Achievements */}
            <div className="flex-1">
                <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight leading-snug">
                    {experience.title}
                </h3>

                <ul className="space-y-2.5 text-slate-300 text-sm font-light">
                    <li className="flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{firstPoint}</span>
                    </li>
                    {expanded && restPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                        </li>
                    ))}
                </ul>

                {hasMore && (
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                        {expanded ? 'Show less' : `Show ${restPoints.length} more`}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <div className="relative">
            <motion.div variants={textVariant()} className="text-center mb-16">
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Track Record & Milestones</p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Quantum <span className="gradient-text-cyber">Career Timeline</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm font-light">
                    From senior software engineer to principal solution architect & team lead across Olympic infrastructure, banking engines, and cloud solutions.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
                {experiences.map((experience, index) => (
                    <ExperienceCard key={index} index={index} experience={experience} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Experience, "work");
