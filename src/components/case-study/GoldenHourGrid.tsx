'use client';

import { motion, useReducedMotion } from 'framer-motion';

type TeamRow = {
    label: string;
    utcOffset: number;
};

const TEAM: TeamRow[] = [
    { label: 'San Francisco', utcOffset: -8 },
    { label: 'London', utcOffset: 0 },
    { label: 'Bengaluru', utcOffset: 5 },
    { label: 'Tokyo', utcOffset: 9 },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function isDaytime(utcHour: number, offset: number): boolean {
    const local = ((utcHour + offset) % 24 + 24) % 24;
    return local >= 8 && local < 22;
}

function bestOverlapHour(): { hour: number; awakeCount: number } {
    let best = { hour: 0, awakeCount: -1 };
    for (const hour of HOURS) {
        const awakeCount = TEAM.filter((t) => isDaytime(hour, t.utcOffset)).length;
        if (awakeCount > best.awakeCount) {
            best = { hour, awakeCount };
        }
    }
    return best;
}

export function GoldenHourGrid({ accent }: { accent: string }) {
    const prefersReducedMotion = useReducedMotion();
    const best = bestOverlapHour();

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex flex-col gap-3">
                {TEAM.map((team, rowIndex) => (
                    <motion.div
                        key={team.label}
                        className="flex items-center gap-3"
                        initial={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.4, delay: rowIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="w-28 shrink-0 text-xs font-mono text-slate-400 text-right">
                            {team.label}
                        </div>
                        <div className="flex-1 flex gap-[2px]">
                            {HOURS.map((hour) => {
                                const day = isDaytime(hour, team.utcOffset);
                                const isBest = hour === best.hour;
                                return (
                                    <div
                                        key={hour}
                                        className="flex-1 h-5 rounded-[2px]"
                                        style={{
                                            backgroundColor: day
                                                ? `color-mix(in srgb, ${accent} ${isBest ? 85 : 55}%, transparent)`
                                                : 'rgba(255,255,255,0.06)',
                                            outline: isBest ? `1.5px solid ${accent}` : undefined,
                                            outlineOffset: isBest ? '1px' : undefined,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p
                className="text-center text-xs font-mono text-slate-400 mt-6"
                initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Best overlap: <span style={{ color: accent }}>{best.hour}:00 UTC</span> — {best.awakeCount} of{' '}
                {TEAM.length} cities awake
            </motion.p>
        </div>
    );
}
