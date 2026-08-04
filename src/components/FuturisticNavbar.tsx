'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cpu, Menu, X, Sparkles, ArrowUp } from 'lucide-react'

interface NavbarProps {
    onOpenAiAgent?: () => void
}

export const FuturisticNavbar: React.FC<NavbarProps> = ({ onOpenAiAgent }) => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [activeSection, setActiveSection] = useState('')

    const navItems = [
        { label: 'About', href: '#about', id: 'about' },
        { label: 'Experience', href: '#work', id: 'work' },
        { label: 'Tech Stack', href: '#tech', id: 'tech' },
        { label: 'Selected Work', href: '#selected-work', id: 'selected-work' },
        { label: 'Badges', href: '#badges', id: 'badges' },
        { label: 'My Book', href: '#book', id: 'book' },
        { label: 'Contact', href: '#contact', id: 'contact' },
        { label: 'Projects', href: '/projects' },
        { label: 'Writing & Research', href: '/blog' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const sectionIds = navItems.filter((item) => item.id).map((item) => item.id as string)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        )
        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            scrolled ? 'py-3 cyber-glass bg-slate-950/80 border-b border-cyan-500/20 shadow-xl' : 'py-5 bg-transparent'
        }`}>
            {/* Scroll Progress Indicator */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />

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
                    {navItems.map((item, idx) => {
                        const isActive = !!item.id && item.id === activeSection
                        return (
                            <a
                                key={idx}
                                href={item.href}
                                className={`relative py-1 transition-colors font-mono tracking-wide ${
                                    isActive ? 'text-cyan-400 neon-text-cyan' : 'text-slate-300 hover:text-cyan-400 hover:neon-text-cyan'
                                }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                                )}
                            </a>
                        )
                    })}
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

        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={`fixed bottom-6 left-6 z-40 p-3 rounded-2xl cyber-glass border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300 ${
                scrollProgress > 15 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
        </>
    )
}

export default FuturisticNavbar
