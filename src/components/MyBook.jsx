'use client';
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import { styles } from "../styles.js";
import { book, book2 } from "../../public/assets"
import { BookOpen, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

const MyBook = () => {
    const tiltRef1 = useRef(null);
    const tiltRef2 = useRef(null);

    return (
        <div className="relative">
            <motion.div variants={textVariant()} className="text-center">
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Technical Publications & Books</p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Published <span className="gradient-text-cyber">Engineering Works</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm font-light">
                    Deep dives into modern software engineering, Java architecture, reactive microservices, and system scalability.
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
                {/* Book Card 1 */}
                <motion.div 
                    variants={fadeIn("right", "spring", 0.2, 0.75)}
                    className="p-8 rounded-3xl cyber-glass border border-cyan-500/20 cyber-glass-hover flex flex-col md:flex-row items-center gap-6"
                >
                    <Tilt ref={tiltRef1} options={{ max: 25 }} className="w-48 shrink-0">
                        <img 
                            src={book.src} 
                            alt="Engineering Book 1" 
                            className="w-full rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 object-cover" 
                        />
                    </Tilt>

                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono mb-3">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span>PUBLISHED GUIDE</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                            Java 8 to 21 & Modern Architecture
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Comprehensive practical insights into modern Java evolution, concurrent programming, memory management, and reactive patterns.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-cyan-300 mb-6">
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Java 21</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Reactive</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Spring Boot</span>
                        </div>
                    </div>
                </motion.div>

                {/* Book Card 2 */}
                <motion.div 
                    variants={fadeIn("left", "spring", 0.4, 0.75)}
                    className="p-8 rounded-3xl cyber-glass-violet border border-purple-500/20 cyber-glass-hover flex flex-col md:flex-row items-center gap-6"
                >
                    <Tilt ref={tiltRef2} options={{ max: 25 }} className="w-48 shrink-0">
                        <img 
                            src={book2.src} 
                            alt="Engineering Book 2" 
                            className="w-full rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 object-cover" 
                        />
                    </Tilt>

                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            <span>ADVANCED PATTERNS</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                            Domain-Driven & Distributed Systems
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Mastering microservices decomposition, Event Sourcing, CQRS architectures, and high-performance Kafka messaging streams.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-purple-300 mb-6">
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">CQRS</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">DDD</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Kafka</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(MyBook, "book");
