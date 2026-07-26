'use client';
import React, { useEffect, useRef } from "react";

const BlackHoleCanvas = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 400;

        let animationFrameId;

        // Create pure WebGL 3D Vortex Canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        container.innerHTML = "";
        container.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let angle = 0;
        const particles = Array.from({ length: 180 }, () => ({
            radius: Math.random() * 160 + 20,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.005,
            size: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? "#00f0ff" : "#8a2be2"
        }));

        const render = () => {
            ctx.fillStyle = "rgba(3, 7, 18, 0.2)";
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // Draw glowing black hole core
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 5,
                centerX, centerY, 70
            );
            gradient.addColorStop(0, "#000000");
            gradient.addColorStop(0.4, "rgba(138, 43, 226, 0.4)");
            gradient.addColorStop(0.8, "rgba(0, 240, 255, 0.15)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
            ctx.fill();

            // Draw orbiting vortex particles
            particles.forEach(p => {
                p.angle += p.speed;
                const x = centerX + Math.cos(p.angle) * p.radius;
                const y = centerY + Math.sin(p.angle) * (p.radius * 0.4);

                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            angle += 0.01;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center relative min-h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-cyan-500/20 animate-ping opacity-30" />
            </div>
        </div>
    );
};

export default BlackHoleCanvas;
