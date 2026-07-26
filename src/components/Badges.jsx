'use client';
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { badges } from "../constants";
import Tilt from "react-parallax-tilt";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { ShieldCheck, ExternalLink } from "lucide-react";

const BadgeCard = ({ title, icon, link, name, index }) => {
    const tiltRef = useRef(null);

    return (
        <Tilt ref={tiltRef} options={{ max: 20 }} className="w-full sm:w-[280px]">
            <motion.div
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                className="relative h-full p-6 rounded-2xl cyber-glass border border-cyan-500/20 cyber-glass-hover flex flex-col justify-between items-center text-center group"
            >
                <div className="absolute top-3 right-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                </div>

                <a href={link} target="_blank" rel="noopener noreferrer" className="block my-4 transform group-hover:scale-110 transition-transform">
                    <img 
                        src={icon.src} 
                        alt={name} 
                        className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    />
                </a>

                <div className="w-full">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VERIFIED CREDLY</span>
                    </div>
                    <h3 className="text-white text-base font-bold leading-snug group-hover:text-cyan-300 transition-colors">
                        {name || title}
                    </h3>
                </div>
            </motion.div>
        </Tilt>
    );
};

const Badges = () => {
    return (
        <div className="relative">
            <motion.div variants={textVariant()} className="text-center">
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">Professional Certifications</p>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Verified <span className="gradient-text-cyber">Neural Credentials</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto mt-3 text-sm font-light">
                    Official Oracle Java Certifications & Lightbend Reactive Architecture Master Series credentials.
                </p>
            </motion.div>

            <div className="flex flex-wrap mt-14 gap-6 justify-center max-w-6xl mx-auto">
                {badges.map((badge, index) => (
                    <BadgeCard key={index} index={index} {...badge} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Badges, "badges");
