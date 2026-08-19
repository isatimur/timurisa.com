'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Panel = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    chips: string[];
};

type BeforeAfterProps = {
    before: Panel;
    after: Panel;
    preserved?: { label: string; chips: string[] };
    accent: string;
};

export function BeforeAfter({ before, after, preserved, accent }: BeforeAfterProps) {
    const prefersReducedMotion = useReducedMotion();
    const initial = prefersReducedMotion ? undefined : { opacity: 0, y: 16 };
    const whileInView = prefersReducedMotion ? undefined : { opacity: 1, y: 0 };

    const renderPanel = (panel: Panel, muted: boolean) => (
        <div
            className="flex-1 rounded-xl border p-6"
            style={{
                borderColor: muted
                    ? 'rgba(255,255,255,0.12)'
                    : `color-mix(in srgb, ${accent} 40%, transparent)`,
                backgroundColor: muted
                    ? 'rgba(255,255,255,0.02)'
                    : `color-mix(in srgb, ${accent} 8%, #030712)`,
            }}
        >
            <div
                className="text-xs font-mono uppercase tracking-widest mb-2"
                style={{ color: muted ? '#64748b' : accent }}
            >
                {panel.eyebrow}
            </div>
            <div className="text-lg font-bold text-white mb-1">{panel.title}</div>
            {panel.subtitle && <div className="text-xs font-mono text-slate-500 mb-4">{panel.subtitle}</div>}
            <div className="flex flex-wrap gap-1.5 mt-4">
                {panel.chips.map((chip) => (
                    <span
                        key={chip}
                        className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900 border border-white/10 text-slate-300"
                    >
                        {chip}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-stretch gap-4 md:gap-6">
                <motion.div
                    className="flex-1"
                    initial={initial}
                    whileInView={whileInView}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {renderPanel(before, true)}
                </motion.div>

                <motion.div
                    className="flex items-center justify-center shrink-0"
                    initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ArrowRight className="w-6 h-6" style={{ color: accent }} />
                </motion.div>

                <motion.div
                    className="flex-1"
                    initial={initial}
                    whileInView={whileInView}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    {renderPanel(after, false)}
                </motion.div>
            </div>

            {preserved && (
                <motion.div
                    className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-4 text-center"
                    initial={initial}
                    whileInView={whileInView}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                        {preserved.label}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {preserved.chips.map((chip) => (
                            <span
                                key={chip}
                                className="px-2 py-1 text-[10px] font-mono rounded bg-slate-900 border border-white/10 text-slate-400"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
