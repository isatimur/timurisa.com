'use client'

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

import { Brain, ShoppingCart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const allNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' }

]
export function NavBar() {
    const pathname = usePathname()
    const [navLinks] = useState(allNavLinks)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="bg-white/80 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="flex items-center space-x-2 transition-transform hover:scale-[1.02]"
                >
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600">
                        Timur Isachenko <span className="inline-block text-blue-600">| Passion to Code</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-gray-600 hover:text-blue-600 transition-all relative py-2",
                                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600",
                                "after:scale-x-0 hover:after:scale-x-100 after:transition-transform",
                                pathname === link.href && "text-blue-600 after:scale-x-100"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        variant="outline"
                        className="flex items-center border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => window.open("https://leanpub.com/quickstartwithai", "_blank", "noopener,noreferrer")}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Book
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                            <span className="sr-only bg-secondary"><Menu className="h-6 w-6 text-blue-600" aria-hidden="true" /></span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-gray-100">
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
                                        "text-lg py-2 transition-colors hover:text-blue-600 hover:bg-blue-50 px-4 rounded-md",
                                        pathname === link.href ? "text-blue-600 bg-blue-50" : "text-gray-600"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button
                                className="w-full mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
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
