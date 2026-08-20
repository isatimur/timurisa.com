'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TopologyDiagram } from './TopologyDiagram';

type Chapter = {
    eyebrow: string;
    title: string;
    body: string;
    camera: { position: [number, number, number]; target: [number, number, number] };
};

const CHAPTERS: Chapter[] = [
    {
        eyebrow: 'Chapter 01',
        title: 'Client Apps',
        body: 'Requests enter the platform from web and partner clients.',
        camera: { position: [0, 10, 85], target: [0, 0, 40] },
    },
    {
        eyebrow: 'Chapter 02',
        title: 'API Gateway',
        body: 'A custom Spring Cloud Gateway secured by Keycloak SSO fronts every service.',
        camera: { position: [0, 8, 55], target: [0, 0, 20] },
    },
    {
        eyebrow: 'Chapter 03',
        title: 'Billing Service',
        body: 'The Kotlin / Spring WebFlux core, built from an empty repository.',
        camera: { position: [0, 10, 28], target: [0, 0, 0] },
    },
    {
        eyebrow: 'Chapter 04',
        title: 'Kafka',
        body: 'Billing events stream out over Kafka for downstream consumers.',
        camera: { position: [32, 14, -4], target: [18, 6, -18] },
    },
    {
        eyebrow: 'Chapter 05',
        title: 'PostgreSQL via R2DBC',
        body: 'Reactive, non-blocking data access all the way to the database.',
        camera: { position: [-32, 14, -4], target: [-18, 6, -18] },
    },
    {
        eyebrow: 'Chapter 06',
        title: 'Payment Providers',
        body: 'Multiple payment providers integrated behind the same gateway.',
        camera: { position: [0, 42, 48], target: [0, -4, -10] },
    },
];

const NODES = {
    client: new THREE.Vector3(0, 0, 40),
    gateway: new THREE.Vector3(0, 0, 20),
    billing: new THREE.Vector3(0, 0, 0),
    kafka: new THREE.Vector3(18, 6, -18),
    postgres: new THREE.Vector3(-18, 6, -18),
    payments: new THREE.Vector3(0, -14, -6),
};

const CONNECTIONS: [keyof typeof NODES, keyof typeof NODES][] = [
    ['client', 'gateway'],
    ['gateway', 'billing'],
    ['billing', 'kafka'],
    ['billing', 'postgres'],
    ['gateway', 'payments'],
];

function damp(a: number, b: number, lambda: number, dt: number): number {
    return a + (b - a) * (1 - Math.exp(-lambda * dt));
}

function isWebGLAvailable(): boolean {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
        return false;
    }
}

export function IdsWorld({ accent }: { accent: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [webglSupported, setWebglSupported] = useState(true);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setWebglSupported(isWebGLAvailable());
    }, []);

    useEffect(() => {
        if (!webglSupported || !containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        const accentColor = new THREE.Color(accent);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#030712');
        scene.fog = new THREE.FogExp2(0x030712, 0.012);

        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 300);
        camera.position.set(...CHAPTERS[0].camera.position);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

        scene.add(new THREE.AmbientLight(0xffffff, 0.35));
        const key = new THREE.DirectionalLight(0xffffff, 0.6);
        key.position.set(20, 40, 30);
        scene.add(key);

        const nodeGeometry = new THREE.IcosahedronGeometry(3.2, 1);
        const nodeMeshes: THREE.Mesh[] = [];
        Object.values(NODES).forEach((pos) => {
            const material = new THREE.MeshStandardMaterial({
                color: accentColor,
                emissive: accentColor,
                emissiveIntensity: 0.55,
                roughness: 0.35,
                metalness: 0.1,
                wireframe: false,
            });
            const mesh = new THREE.Mesh(nodeGeometry, material);
            mesh.position.copy(pos);
            scene.add(mesh);
            nodeMeshes.push(mesh);

            const wireMesh = new THREE.Mesh(
                new THREE.IcosahedronGeometry(3.6, 1),
                new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.25 }),
            );
            wireMesh.position.copy(pos);
            scene.add(wireMesh);
        });

        const connectionLines: THREE.Line[] = [];
        CONNECTIONS.forEach(([fromKey, toKey]) => {
            const from = NODES[fromKey];
            const to = NODES[toKey];
            const mid = from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 6, 0));
            const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
            const points = curve.getPoints(40);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.35 });
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            connectionLines.push(line);
        });

        const particleGeometry = new THREE.SphereGeometry(0.45, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: accentColor });
        const particles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; offset: number; speed: number }[] = [];
        CONNECTIONS.forEach(([fromKey, toKey]) => {
            const from = NODES[fromKey];
            const to = NODES[toKey];
            const mid = from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 6, 0));
            const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
            for (let i = 0; i < 5; i++) {
                const mesh = new THREE.Mesh(particleGeometry, particleMaterial);
                scene.add(mesh);
                particles.push({ mesh, curve, offset: i / 5, speed: 0.18 });
            }
        });

        const resize = () => {
            const { clientWidth } = container;
            const height = window.innerHeight;
            renderer.setSize(clientWidth, height);
            camera.aspect = clientWidth / height;
            camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener('resize', resize);

        let rafId = 0;
        let lastTime = performance.now();
        let smooth = 0;
        let visible = !document.hidden;
        const onVisibility = () => {
            visible = !document.hidden;
        };
        document.addEventListener('visibilitychange', onVisibility);

        const computeProgress = () => {
            const rect = container.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            if (total <= 0) return 0;
            return Math.min(1, Math.max(0, -rect.top / total));
        };

        const tmpPos = new THREE.Vector3();
        const tmpTarget = new THREE.Vector3();

        const animate = (time: number) => {
            rafId = requestAnimationFrame(animate);
            if (!visible) {
                lastTime = time;
                return;
            }
            const dt = Math.min((time - lastTime) / 1000, 1 / 30);
            lastTime = time;

            const target = computeProgress();
            smooth = prefersReducedMotion ? target : damp(smooth, target, 6, dt);

            const chapterFloat = smooth * (CHAPTERS.length - 1);
            const idx0 = Math.floor(chapterFloat);
            const idx1 = Math.min(idx0 + 1, CHAPTERS.length - 1);
            const localT = chapterFloat - idx0;

            const a = CHAPTERS[idx0].camera;
            const b = CHAPTERS[idx1].camera;
            tmpPos.set(...a.position).lerp(new THREE.Vector3(...b.position), localT);
            tmpTarget.set(...a.target).lerp(new THREE.Vector3(...b.target), localT);
            camera.position.copy(tmpPos);
            camera.lookAt(tmpTarget);

            if (!prefersReducedMotion) {
                const elapsed = time / 1000;
                particles.forEach((p) => {
                    const t = (elapsed * p.speed + p.offset) % 1;
                    p.curve.getPoint(t, tmpPos);
                    p.mesh.position.copy(tmpPos);
                });
            }

            renderer.render(scene, camera);

            const roundedIdx = Math.round(chapterFloat);
            setCurrentIndex((prev) => (prev !== roundedIdx ? roundedIdx : prev));
        };
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibility);
            nodeGeometry.dispose();
            particleGeometry.dispose();
            particleMaterial.dispose();
            nodeMeshes.forEach((m) => (m.material as THREE.Material).dispose());
            connectionLines.forEach((l) => {
                l.geometry.dispose();
                (l.material as THREE.Material).dispose();
            });
            renderer.dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [webglSupported, accent, prefersReducedMotion]);

    if (!webglSupported) {
        return <TopologyDiagram accent={accent} />;
    }

    const chapter = CHAPTERS[currentIndex];

    return (
        <div ref={containerRef} style={{ height: `${CHAPTERS.length * 90}vh` }} className="relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden rounded-2xl border border-white/10">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 pointer-events-none bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-md"
                        >
                            <div className="case-eyebrow mb-2">{chapter.eyebrow}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{chapter.title}</h3>
                            <p className="text-slate-300 font-light">{chapter.body}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute top-4 right-4 flex gap-1.5">
                    {CHAPTERS.map((c, i) => (
                        <div
                            key={c.title}
                            className="w-1.5 h-1.5 rounded-full transition-colors"
                            style={{ backgroundColor: i === currentIndex ? accent : 'rgba(255,255,255,0.2)' }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
