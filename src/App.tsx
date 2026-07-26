'use client'

import React, { useState } from "react";
import { FuturisticNavbar } from "./components/FuturisticNavbar";
import { FuturisticHero } from "./components/FuturisticHero";
import { NeuralCanvas } from "./components/NeuralCanvas";
import { TimurAiAgent } from "./components/TimurAiAgent";

import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Badges from "./components/Badges";
import MyBook from "./components/MyBook";
import Contact from "./components/Contact";

const App = () => {
    const [isAiAgentOpen, setIsAiAgentOpen] = useState(false);

    const handleOpenAiAgent = () => {
        setIsAiAgentOpen(true);
    };

    return (
        <div className="relative z-0 bg-[#030712] min-h-screen text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
            {/* Interactive Neural Canvas Background */}
            <NeuralCanvas />

            {/* Navigation Header */}
            <FuturisticNavbar onOpenAiAgent={handleOpenAiAgent} />

            {/* Hero Section */}
            <header className="relative">
                <FuturisticHero onOpenAiAgent={handleOpenAiAgent} />
            </header>

            {/* Main Content Sections */}
            <main className="relative z-10 space-y-24 pb-20">
                <About />
                <Experience />
                <Tech />
                <Badges />
                <MyBook />
            </main>

            {/* Footer / Contact Section */}
            <footer className="relative z-10 border-t border-cyan-500/10 py-16 bg-slate-950/60 backdrop-blur-lg">
                <Contact />
                <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500">
                    <p>© 2026 Timur Isachenko. All rights reserved.</p>
                    <p className="text-cyan-400/80">Architecting High-Performance Futures</p>
                </div>
            </footer>

            {/* Interactive Timur AI Agent Modal & Trigger */}
            <TimurAiAgent />
        </div>
    );
};

export default App;
