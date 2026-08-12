'use client';

import { useRef, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

type TiltCardProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    maxTilt?: number;
};

export function TiltCard({ children, className, style, maxTilt = 6 }: TiltCardProps) {
    const prefersReducedMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), { stiffness: 300, damping: 30 });

    if (prefersReducedMotion) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ ...style, rotateX, rotateY, transformPerspective: 800 }}
        >
            {children}
        </motion.div>
    );
}
