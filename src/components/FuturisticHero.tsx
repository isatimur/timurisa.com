'use client'

import React from 'react'
import { Sparkles, ChevronRight, BookOpen, Layers, FolderGit2 } from 'lucide-react'
import { BlurWords } from './effects/BlurWords'

interface HeroProps {
    onOpenAiAgent?: () => void
}

export const FuturisticHero: React.FC<HeroProps> = ({ onOpenAiAgent }) => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden z-10">
            {/* Background Radial Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
                
                {/* HUD Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cyber-glass border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-lg shadow-cyan-500/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>TIMUR ISACHENKO // AI CTO & SOLUTION ARCHITECT</span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                    <BlurWords text="Architecting" startIndex={0} />{' '}
                    <BlurWords text="Enterprise" startIndex={1} wordClassName="gradient-text-cyber" />{' '}
                    <BlurWords text="Systems & AI Infrastructure" startIndex={2} />
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed font-light">
                    AI CTO at Swiirl, Principal Solution Architect, and Java/Reactive Systems Pioneer. Spearheaded mission-critical billing engines, Sochi 2014 Olympics IT infrastructure, and banking integrations for global enterprises.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <button
                        onClick={onOpenAiAgent}
                        className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/30"
                    >
                        <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
                        <span>Launch Timur AI Agent</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <a
                        href="#work"
                        className="flex items-center gap-2 px-7 py-4 rounded-2xl cyber-glass border border-slate-700/80 text-white hover:text-cyan-300 hover:border-cyan-500/40 font-semibold text-base transition-all duration-300 hover:scale-105"
                    >
                        <Layers className="w-5 h-5 text-cyan-400" />
                        <span>Explore Experience</span>
                    </a>

                    <a
                        href="/projects"
                        className="flex items-center gap-2 px-7 py-4 rounded-2xl cyber-glass border border-amber-500/30 text-amber-200 hover:text-white hover:border-amber-500/50 font-semibold text-base transition-all duration-300 hover:scale-105"
                    >
                        <FolderGit2 className="w-5 h-5 text-amber-400" />
                        <span>Projects</span>
                    </a>

                    <a
                        href="#book"
                        className="flex items-center gap-2 px-6 py-4 rounded-2xl cyber-glass-violet border border-purple-500/30 text-purple-200 hover:text-white font-semibold text-base transition-all duration-300 hover:scale-105"
                    >
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <span>My Book</span>
                    </a>
                </div>

                {/* Key Metrics HUD Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                    <div className="p-5 rounded-2xl cyber-glass border border-cyan-500/20 text-center cyber-glass-hover">
                        <div className="text-3xl font-extrabold text-white mb-1 font-mono tracking-wider gradient-text-cyber">17+ Yrs</div>
                        <div className="text-xs text-slate-400 uppercase font-mono">Architecture & Dev</div>
                    </div>
                    <div className="p-5 rounded-2xl cyber-glass border border-purple-500/20 text-center cyber-glass-hover">
                        <div className="text-3xl font-extrabold text-white mb-1 font-mono tracking-wider neon-text-violet">$100M+</div>
                        <div className="text-xs text-slate-400 uppercase font-mono">Banking Systems Scaled</div>
                    </div>
                    <div className="p-5 rounded-2xl cyber-glass border border-emerald-500/20 text-center cyber-glass-hover">
                        <div className="text-3xl font-extrabold text-white mb-1 font-mono tracking-wider text-emerald-400">8x Verified</div>
                        <div className="text-xs text-slate-400 uppercase font-mono">Oracle & Reactive Badges</div>
                    </div>
                    <div className="p-5 rounded-2xl cyber-glass border border-amber-500/20 text-center cyber-glass-hover">
                        <div className="text-3xl font-extrabold text-white mb-1 font-mono tracking-wider gradient-text-gold">Sochi 2014</div>
                        <div className="text-xs text-slate-400 uppercase font-mono">Olympics IT Awardee</div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FuturisticHero
