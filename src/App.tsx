'use client'

import React, { useState } from "react";
import { FuturisticNavbar } from "./components/FuturisticNavbar";
import { FuturisticHero } from "./components/FuturisticHero";
import { NeuralCanvas } from "./components/NeuralCanvas";
import { TimurAiAgent } from "./components/TimurAiAgent";

import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import SelectedWork from "./components/SelectedWork";
import Badges from "./components/Badges";
import MyBook from "./components/MyBook";
import Contact from "./components/Contact";
import FloatingButton from "./components/FloatingButton";

const App = () => {
    const [isAiAgentOpen, setIsAiAgentOpen] = useState(false);

    const handleOpenAiAgent = () => {
        setIsAiAgentOpen(true);
    };

    const handleCloseAiAgent = () => {
        setIsAiAgentOpen(false);
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
                <SelectedWork />
                <Badges />
                <MyBook />
            </main>

            {/* Footer / Contact Section */}
            <footer className="relative z-10 border-t border-cyan-500/10 py-16 bg-slate-950/60 backdrop-blur-lg">
                <Contact />
                <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-center text-xs font-mono text-slate-500">
                    <p>© 2026 Timur Isachenko. All rights reserved.</p>
                </div>
            </footer>

            <FloatingButton />

            {/* Interactive Timur AI Agent Modal & Trigger */}
            <TimurAiAgent
                isOpen={isAiAgentOpen}
                onOpen={handleOpenAiAgent}
                onClose={handleCloseAiAgent}
            />
        </div>
    );
};

export default App;
