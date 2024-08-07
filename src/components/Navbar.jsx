import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {styles} from "../styles.js";
import {navLinks} from "../constants";
import {close, logo, menu} from "../../public/assets";
import Image from "next/image";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 100)
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`${
                styles.paddingX
            } w-full flex items-center py-5 fixed top-0 z-20 ${
                scrolled ? "bg-primary" : "bg-transparent"
            }`}
        >
            <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                <Link
                    to='/'
                    className='flex items-center gap-2'
                    onClick={() => {
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    <Image src={logo.src} width="9" height="9" alt='logo' className='w-9 h-9 object-contain'/>
                    <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                        Timur Isa &nbsp;
                        <span className='sm:block hidden'> | Passion to code</span>
                    </p>
                </Link>

                <ul className='list-none hidden sm:flex flex-row gap-10'>
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`${
                                active === nav.title ? "text-white" : `${scrolled ? "text-secondary" : "text-white"}`
                            } hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>

                <div className='sm:hidden flex flex-1 justify-end items-center'>
                    <Image
                        src={toggle ? close.src : menu.src}
                        alt='menu'
                        width="28"
                        height="28"
                        className='w-[28px] h-[28px] object-contain'
                        onClick={() => setToggle(!toggle)}
                    />

                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } p-6 violet-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                    >
                        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-white" : `${scrolled ? "text-white" : "text-white"}`
                                    }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.title);
                                    }}
                                >
                                    <a href={`#${nav.id}`}>{nav.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
