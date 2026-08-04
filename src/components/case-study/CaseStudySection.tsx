'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface CaseStudySectionProps {
    eyebrow: string;
    heading: string;
    paragraph?: string;
    items?: string[];
}

export function CaseStudySection({ eyebrow, heading, paragraph, items }: CaseStudySectionProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="case-rule border-t pt-8 pb-10"
        >
            <div className="case-eyebrow mb-3">{eyebrow}</div>
            <h2 className="text-2xl font-bold text-white mb-4">{heading}</h2>

            {paragraph && (
                <p className="text-slate-300 leading-relaxed font-light">{paragraph}</p>
            )}

            {items && items.length > 0 && (
                <ul className="space-y-2.5">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-300 font-light">
                            <span className="case-bullet mt-2 w-1.5 h-1.5 rounded-full shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.section>
    );
}
