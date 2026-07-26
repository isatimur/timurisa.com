'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cpu, Menu, X, Terminal, ShieldCheck, Sparkles, BookOpen } from 'lucide-react'

interface NavbarProps {
    onOpenAiAgent?: () => void
}

export const FuturisticNavbar: React.FC<NavbarProps> = ({ onOpenAiAgent }) => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#work' },
        { label: 'Tech Stack', href: '#tech' },
        { label: 'Badges', href: '#badges' },
        { label: 'My Book', href: '#book' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '/blog' }
    ]

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrolled ? 'py-3 cyber-glass bg-slate-950/80 border-b border-cyan-500/20 shadow-xl' : 'py-5 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                
                {/* Logo & Status Badge */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                        <Cpu className="w-5 h-5 text-cyan-100" />
                    </div>
                    <div>
                        <span className="font-extrabold text-lg text-white tracking-wider font-mono">TIMUR<span className="text-cyan-400">.AI</span></span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>ARCHITECT ONLINE</span>
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {navItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="text-slate-300 hover:text-cyan-400 transition-colors font-mono tracking-wide hover:neon-text-cyan"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* AI Agent Quick Trigger & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onOpenAiAgent}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all hover:border-cyan-400"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>AI Assistant</span>
                    </button>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-300 hover:text-cyan-400 rounded-lg cyber-glass"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden px-6 py-6 border-b border-cyan-500/20 bg-slate-950/95 backdrop-blur-xl animate-fadeIn">
                    <div className="flex flex-col gap-4 font-mono text-sm">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-900"
                            >
                                {item.label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false)
                                if (onOpenAiAgent) onOpenAiAgent()
                            }}
                            className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Launch AI Core Assistant</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default FuturisticNavbar
