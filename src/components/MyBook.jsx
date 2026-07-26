'use client';
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import Tilt from "react-parallax-tilt";
import Link from "next/link";
import { book, book2 } from "../../public/assets";
import { BookOpen, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

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
                    Deep dives into high-performance computing, in-memory data grids, and generative AI implementation.
                </p>
            </motion.div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
                {/* Book Card 1 */}
                <motion.a
                    href="https://a.co/d/4rVYpcH"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeIn("right", "spring", 0.2, 0.75)}
                    className="p-8 rounded-3xl cyber-glass border border-cyan-500/20 cyber-glass-hover flex flex-col md:flex-row items-center gap-6 group"
                >
                    <Tilt ref={tiltRef1} options={{ max: 25 }} className="w-48 shrink-0">
                        <Image
                            src={book}
                            alt="High Performance In-Memory Computing with Apache Ignite"
                            className="w-full h-auto rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 object-cover"
                        />
                    </Tilt>

                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono mb-3">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span>PUBLISHED GUIDE</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                            High Performance In-Memory Computing with Apache Ignite
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Practical patterns for distributed in-memory data grids, compute grids, and low-latency architectures built on Apache Ignite.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-cyan-300 mb-2">
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Apache Ignite</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Distributed Systems</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Java</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-cyan-300 text-xs font-mono group-hover:gap-2.5 transition-all">
                            View on Amazon <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </motion.a>

                {/* Book Card 2 */}
                <motion.a
                    href="https://a.co/d/a7kqMqW"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeIn("left", "spring", 0.4, 0.75)}
                    className="p-8 rounded-3xl cyber-glass-violet border border-purple-500/20 cyber-glass-hover flex flex-col md:flex-row items-center gap-6 group"
                >
                    <Tilt ref={tiltRef2} options={{ max: 25 }} className="w-48 shrink-0">
                        <Image
                            src={book2}
                            alt="Generative AI with Local LLM"
                            className="w-full h-auto rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 object-cover"
                        />
                    </Tilt>

                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            <span>GENERATIVE AI</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                            Generative AI with Local LLM
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Running and deploying local large language models for privacy-preserving, cost-efficient generative AI applications.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-purple-300 mb-2">
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Local LLM</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Generative AI</span>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">Privacy</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-purple-300 text-xs font-mono group-hover:gap-2.5 transition-all">
                            View on Amazon <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </motion.a>
            </div>

            <div className="text-center mt-10">
                <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-mono text-sm transition-colors"
                >
                    Learn more about my books
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default SectionWrapper(MyBook, "book");
