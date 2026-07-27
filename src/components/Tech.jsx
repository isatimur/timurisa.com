'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";
import Image from "next/image";

const CATEGORIES = [
    { id: 'all', label: 'All Stack' },
    { id: 'backend', label: 'Java & Microservices' },
    { id: 'cloud', label: 'Cloud & Infrastructure' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'database', label: 'Databases & Storage' }
];

/* eslint-disable react/display-name */
const Tech = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const getCategory = (techName) => {
        const name = techName.toLowerCase();
        if (name.includes('java') || name.includes('kotlin') || name.includes('spring') || name.includes('node')) return 'backend';
        if (name.includes('docker') || name.includes('kubernetes') || name.includes('git') || name.includes('aws')) return 'cloud';
        if (name.includes('react') || name.includes('tailwind') || name.includes('three') || name.includes('javascript') || name.includes('typescript')) return 'frontend';
        if (name.includes('postgres') || name.includes('mongo')) return 'database';
        return 'backend';
    };

    const filteredTech = technologies.filter(t => activeFilter === 'all' || getCategory(t.name) === activeFilter);

    return (
        <div className="relative">
            <motion.div variants={textVariant()} className="text-center">
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Technical Mastery</p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Quantum <span className="gradient-text-cyber">Tech Ecosystem</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm font-light">
                    Enterprise languages, cloud infrastructure, reactive frameworks, and databases — in production for 17+ years.
                </p>
            </motion.div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-10 mb-12">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                            activeFilter === cat.id
                                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                                : 'cyber-glass text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Tech Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {filteredTech.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        variants={fadeIn("up", "spring", index * 0.05, 0.5)}
                        className="p-5 rounded-2xl cyber-glass border border-cyan-500/15 cyber-glass-hover flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                        <div className="relative w-14 h-14 mb-3 flex items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-slate-800 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all">
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                fill
                                sizes="56px"
                                className="object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.2)]"
                            />
                        </div>
                        <span className="text-white text-xs font-mono font-bold tracking-wider group-hover:text-cyan-300 transition-colors">
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Tech, "tech");
