'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

export type FunnelStage = {
    value: number;
    label: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function CountUp({ value, duration = 1.2 }: { value: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const prefersReducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

    useEffect(() => {
        if (!inView || prefersReducedMotion) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, duration, prefersReducedMotion]);

    return <span ref={ref}>{display.toLocaleString()}</span>;
}

export function StatFunnel({ stages, accent }: { stages: FunnelStage[]; accent: string }) {
    const max = stages[0]?.value || 1;

    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
            {stages.map((stage, i) => {
                const widthPct = 40 + (stage.value / max) * 60;
                return (
                    <motion.div
                        key={stage.label}
                        initial={{ opacity: 0, scaleX: 0.85 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
                        style={{
                            width: `${widthPct}%`,
                            borderColor: `color-mix(in srgb, ${accent} ${40 - i * 8}%, transparent)`,
                            backgroundColor: `color-mix(in srgb, ${accent} ${12 - i * 3}%, #030712)`,
                        }}
                        className="rounded-xl border py-5 text-center"
                    >
                        <div className="text-3xl font-bold font-mono" style={{ color: accent }}>
                            <CountUp value={stage.value} />
                        </div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                            {stage.label}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
