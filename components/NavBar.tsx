'use client'

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

import { Cpu, ShoppingCart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const allNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Writing & Research', href: '/blog' },
    { name: 'Books', href: '/book' }

]
export function NavBar() {
    const pathname = usePathname()
    const [navLinks] = useState(allNavLinks)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-slate-950/80 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-cyan-500/20">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="flex items-center space-x-2 transition-transform hover:scale-[1.02]"
                >
                    <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
                        <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-100" />
                    </div>
                    <h1 className="text-lg sm:text-2xl font-bold text-white font-mono">
                        TIMUR<span className="text-cyan-400">.AI</span> <span className="hidden sm:inline-block text-slate-400 font-sans font-normal text-base">| Passion to Code</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-slate-300 hover:text-cyan-400 transition-all relative py-2 font-mono text-sm",
                                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-400",
                                "after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                                pathname === link.href && "text-cyan-400 after:scale-x-100"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        variant="outline"
                        className="flex items-center border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200"
                        onClick={() => window.open("https://leanpub.com/quickstartwithai", "_blank", "noopener,noreferrer")}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Book
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="hover:bg-cyan-500/10">
                            <Menu className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-950 border-l border-cyan-500/20">
                        <nav className="flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-4">
                                &nbsp;
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg py-2 transition-colors hover:text-cyan-400 hover:bg-cyan-500/10 px-4 rounded-md font-mono",
                                        pathname === link.href ? "text-cyan-400 bg-cyan-500/10" : "text-slate-300"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button
                                className="w-full mt-4 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white"
                                onClick={() => {
                                    window.open("https://leanpub.com/quickstartwithai", "_blank", "noopener,noreferrer")
                                    setIsOpen(false)
                                }}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy Book
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
