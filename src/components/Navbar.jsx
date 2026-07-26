'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../styles.js";
import { navLinks } from "../constants";
import { close, logo, menu } from "../../public/assets";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
                scrolled ? "bg-primary shadow-lg border-b border-cyan-500/20" : "bg-transparent"
            }`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={logo.src} alt="logo" className="w-9 h-9 object-contain" />
                    <p className="text-white text-[18px] font-bold cursor-pointer flex font-mono">
                        Timur Isa &nbsp;
                        <span className="sm:block hidden text-cyan-400"> | Solution Architect</span>
                    </p>
                </Link>

                <ul className="list-none hidden sm:flex flex-row gap-10 font-mono">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${
                                active === nav.title ? "text-cyan-400" : `${scrolled ? "text-slate-300" : "text-white"}`
                            } hover:text-cyan-400 text-[16px] font-medium cursor-pointer transition-colors`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`/#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                    <li className="hover:text-cyan-400 text-[16px] font-medium cursor-pointer text-slate-300 transition-colors">
                        <Link href="/blog">Blog</Link>
                    </li>
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <img
                        src={toggle ? close.src : menu.src}
                        alt="menu"
                        className="w-[28px] h-[28px] object-contain cursor-pointer"
                        onClick={() => setToggle(!toggle)}
                    />

                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } p-6 cyber-glass absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl font-mono`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className="font-medium cursor-pointer text-[16px] text-white hover:text-cyan-400"
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a href={`/#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                            <li
                                className="font-medium cursor-pointer text-[16px] text-white hover:text-cyan-400"
                                onClick={() => setToggle(!toggle)}
                            >
                                <Link href="/blog">Blog</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
