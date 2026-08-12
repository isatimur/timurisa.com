'use client';

import { motion, useReducedMotion } from 'framer-motion';

type BlurWordsProps = {
    text: string;
    startIndex?: number;
    className?: string;
    wordClassName?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function BlurWords({ text, startIndex = 0, className, wordClassName }: BlurWordsProps) {
    const prefersReducedMotion = useReducedMotion();
    const words = text.split(' ');

    if (prefersReducedMotion) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${startIndex + i}`}
                    className={`inline-block will-change-[filter,transform,opacity] ${wordClassName ?? ''}`}
                    initial={{ opacity: 0, filter: 'blur(12px)', y: '0.22em' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)', y: '0em' }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                        duration: 0.72,
                        ease: EASE,
                        delay: (startIndex + i) * 0.052,
                    }}
                >
                    {word}
                    {i < words.length - 1 ? ' ' : ''}
                </motion.span>
            ))}
        </span>
    );
}
