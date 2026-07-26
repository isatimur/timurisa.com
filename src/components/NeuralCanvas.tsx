'use client'

import React, { useEffect, useRef } from 'react'

export const NeuralCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const handleResize = () => {
            if (!canvas) return
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }
        window.addEventListener('resize', handleResize)

        const mouse = {
            x: width / 2,
            y: height / 2,
            radius: 180,
            active: false
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.active = false
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        // Particles initialization
        const particleCount = Math.min(Math.floor((width * height) / 11000), 90)
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string
            alpha: number
            baseVx: number
            baseVy: number
        }> = []

        const colors = ['#00f0ff', '#8a2be2', '#00ff9d', '#3b82f6', '#ec4899']

        for (let i = 0; i < particleCount; i++) {
            const vx = (Math.random() - 0.5) * 0.8
            const vy = (Math.random() - 0.5) * 0.8
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx,
                vy,
                baseVx: vx,
                baseVy: vy,
                size: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.6 + 0.3
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw subtle ambient glow near mouse
            if (mouse.active) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, mouse.radius * 1.5
                )
                gradient.addColorStop(0, 'rgba(0, 240, 255, 0.07)')
                gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)')
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2)
                ctx.fill()
            }

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Mouse interaction physics
                if (mouse.active) {
                    const dx = mouse.x - p.x
                    const dy = mouse.y - p.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius
                        p.vx -= (dx / dist) * force * 0.6
                        p.vy -= (dy / dist) * force * 0.6
                    }
                }

                // Damping back to base speed
                p.vx += (p.baseVx - p.vx) * 0.02
                p.vy += (p.baseVy - p.vy) * 0.02

                p.x += p.vx
                p.y += p.vy

                // Boundary warp
                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                // Render particle dot
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.alpha
                ctx.shadowBlur = 8
                ctx.shadowColor = p.color
                ctx.fill()
                ctx.shadowBlur = 0

                // Connect nearby particles with neural constellation lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    const maxDist = 130

                    if (dist < maxDist) {
                        const lineAlpha = (1 - dist / maxDist) * 0.25
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = p.color
                        ctx.globalAlpha = lineAlpha
                        ctx.lineWidth = 0.8
                        ctx.stroke()
                    }
                }
            }

            ctx.globalAlpha = 1
            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-80"
        />
    )
}

export default NeuralCanvas
