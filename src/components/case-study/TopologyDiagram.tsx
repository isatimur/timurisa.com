'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Node = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    title: string;
    subtitle?: string;
};

type Edge = {
    from: string;
    to: string;
    path: string;
    label?: string;
};

const NODES: Node[] = [
    { id: 'client', x: 20, y: 170, w: 150, h: 64, title: 'Client Apps' },
    {
        id: 'gateway',
        x: 220,
        y: 170,
        w: 210,
        h: 64,
        title: 'API Gateway',
        subtitle: 'Spring Cloud · Keycloak SSO',
    },
    {
        id: 'billing',
        x: 480,
        y: 80,
        w: 210,
        h: 64,
        title: 'Billing Service',
        subtitle: 'Kotlin · Spring WebFlux',
    },
    { id: 'payments', x: 480, y: 260, w: 210, h: 64, title: 'Payment Providers' },
    { id: 'kafka', x: 740, y: 20, w: 150, h: 56, title: 'Kafka', subtitle: 'Event Streaming' },
    { id: 'postgres', x: 740, y: 140, w: 150, h: 56, title: 'PostgreSQL', subtitle: 'via R2DBC' },
];

const EDGES: Edge[] = [
    { from: 'client', to: 'gateway', path: 'M 170 202 L 220 202' },
    { from: 'gateway', to: 'billing', path: 'M 430 190 C 460 190, 450 112, 480 112' },
    { from: 'gateway', to: 'payments', path: 'M 430 214 C 460 214, 450 292, 480 292' },
    { from: 'billing', to: 'kafka', path: 'M 690 105 C 715 105, 715 48, 740 48' },
    { from: 'billing', to: 'postgres', path: 'M 690 130 C 715 130, 715 168, 740 168' },
];

export function TopologyDiagram({ accent = '#F59E0B' }: { accent?: string }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <svg
            viewBox="0 0 920 340"
            className="w-full h-auto"
            role="img"
            aria-label="Architecture: Client Apps flow through an API Gateway secured by Keycloak SSO to a Kotlin/Spring WebFlux Billing Service, which fans out to Payment Providers, Kafka event streaming, and PostgreSQL via R2DBC."
        >
            {EDGES.map((edge, i) => (
                <motion.path
                    key={`${edge.from}-${edge.to}`}
                    d={edge.path}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1.5}
                    strokeOpacity={0.6}
                    initial={prefersReducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={prefersReducedMotion ? undefined : { pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                />
            ))}

            {NODES.map((node, i) => (
                <motion.g
                    key={node.id}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                    <rect
                        x={node.x}
                        y={node.y}
                        width={node.w}
                        height={node.h}
                        rx={10}
                        fill="rgba(255,255,255,0.03)"
                        stroke={accent}
                        strokeOpacity={0.4}
                        strokeWidth={1}
                    />
                    <text
                        x={node.x + node.w / 2}
                        y={node.subtitle ? node.y + node.h / 2 - 6 : node.y + node.h / 2 + 5}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight={600}
                        fill="#e2e8f0"
                        fontFamily="var(--font-mono, monospace)"
                    >
                        {node.title}
                    </text>
                    {node.subtitle && (
                        <text
                            x={node.x + node.w / 2}
                            y={node.y + node.h / 2 + 14}
                            textAnchor="middle"
                            fontSize={10.5}
                            fill={accent}
                            fontFamily="var(--font-mono, monospace)"
                        >
                            {node.subtitle}
                        </text>
                    )}
                </motion.g>
            ))}
        </svg>
    );
}
