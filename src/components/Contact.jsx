'use client';
import React, { useRef, useState, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Send, Mail, CheckCircle2 } from "lucide-react";

const phrases = [
    "Yes!\nReach out\nnow",
    "Perfect\ntime to\nconnect",
    "Great\nidea!",
    "Success\nawaits",
    "Absolutely\nyes!",
    "Let's\ntalk!",
]

const Magic8Ball = () => {
    const [phrase, setPhrase] = useState("8")
    const [isShaking, setIsShaking] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const shakeControls = useAnimation()

    const shake = useCallback(async () => {
        if (isShaking) return

        setIsShaking(true)
        setShowAnswer(false)

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(200);
        }

        const crazyShake = async () => {
            const generateRandomShake = () => ({
                x: Math.random() * 8 - 8,
                y: Math.random() * 8 - 8,
                z: Math.random() * 8 - 8,
                scale: 1.1,
            })

            const shakeSequence = Array.from({ length: 30 }, generateRandomShake)

            await shakeControls.start({
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                transition: { duration: 0.3, ease: "linear" }
            })

            await shakeControls.start({
                x: shakeSequence.map(point => point.x),
                y: shakeSequence.map(point => point.y),
                z: shakeSequence.map(point => point.z),
                scale: shakeSequence.map(point => point.scale),
                transition: {
                    duration: 1.0,
                    times: shakeSequence.map((_, i) => i / (shakeSequence.length - 1)),
                    ease: "linear",
                    repeat: 1,
                    repeatType: "reverse",
                },
            })
            await shakeControls.start({
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                transition: { duration: 0.3, ease: "linear" }
            })
        }

        await crazyShake()
        setIsShaking(false)

        await new Promise(resolve => setTimeout(resolve, 500))

        const newAnswer = phrases[Math.floor(Math.random() * phrases.length)]
        setPhrase(newAnswer)
        setShowAnswer(true)
    }, [isShaking, shakeControls])

    return (
        <div className="flex flex-col items-center justify-center">
            <motion.div
                className="relative cursor-pointer"
                onClick={shake}
                animate={isShaking ? shakeControls : {}}
            >
                <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full bg-gradient-to-br from-slate-900 to-black shadow-2xl shadow-cyan-500/10 border border-cyan-500/20
                    flex items-center justify-center relative overflow-hidden">

                    <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/10 to-transparent
                        rounded-full transform -translate-y-1/2"></div>

                    <div className="w-[130px] h-[130px] md:w-[170px] md:h-[170px] rounded-full bg-slate-950 flex items-center justify-center
                        border-4 border-cyan-500/20 relative">

                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-900/20 to-purple-600/20"></div>

                        <AnimatePresence mode="wait" initial={false}>
                            {!showAnswer ? (
                                <motion.span
                                    key="eight"
                                    className="text-cyan-300 font-bold relative z-10 font-mono"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{
                                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                                        textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                                    }}
                                >
                                    8
                                </motion.span>
                            ) : (
                                <motion.div
                                    key="triangle"
                                    className="relative z-10"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg
                                        width="90"
                                        height="90"
                                        className="md:w-[120px] md:h-[120px]"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ transform: 'rotate(180deg)' }}
                                    >
                                        <polygon
                                            points="50,18 90,95 9,95"
                                            fill="#0f172a"
                                            stroke="rgba(0, 240, 255, 0.6)"
                                            strokeWidth="2"
                                        />
                                        <text
                                            x="50%"
                                            y="17%"
                                            fontSize="9"
                                            fill="#67e8f9"
                                            textAnchor="middle"
                                            fontFamily="JetBrains Mono, monospace"
                                            transform="rotate(180, 50, 50)"
                                        >
                                            {phrase.split("\n").map((line, idx) => (
                                                <tspan
                                                    key={idx}
                                                    x="50%"
                                                    dy={`${idx === 0 ? 0 : 13}`}
                                                >
                                                    {line}
                                                </tspan>
                                            ))}
                                        </text>
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
                formRef.current,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_id"
            );
            setSuccess(true);
            setForm({ name: "", email: "", message: "" });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Failed to send message: ", err);
            setError(true);
        }

        setLoading(false);
    };

    return (
        <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Form Column */}
                <motion.div
                    variants={slideIn("left", "tween", 0.2, 1)}
                    className="p-8 sm:p-10 rounded-3xl cyber-glass border border-cyan-500/20 shadow-2xl"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                        <Mail className="w-3.5 h-3.5" />
                        <span>NEURAL CONTACT CHANNEL</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        Initiate <span className="gradient-text-cyber">Connection</span>
                    </h2>
                    <p className="text-slate-400 text-sm mb-8 font-light leading-relaxed">
                        Have an architecture query, technical advisory role, or scalable system project? Reach out directly.
                    </p>

                    {success && (
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Message transmitted successfully! Timur will get back to you shortly.</span>
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                            <span>Transmission failed. Please reach out via <a href="https://linkedin.com/in/timur-isachenko" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-200">LinkedIn</a> instead.</span>
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-slate-300 text-xs font-mono mb-2 uppercase tracking-wider">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Sarah Connor"
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 transition font-sans"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-xs font-mono mb-2 uppercase tracking-wider">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="e.g. sarah@cyberdyne.com"
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 transition font-sans"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-xs font-mono mb-2 uppercase tracking-wider">Project / Inquiry Message</label>
                            <textarea
                                rows={5}
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                placeholder="Describe your architecture requirements or project scope..."
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 transition font-sans"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>{loading ? "Transmitting..." : "Send Message"}</span>
                        </button>
                    </form>
                </motion.div>

                {/* Interactive Magic 8-Ball Column */}
                <motion.div
                    variants={slideIn("right", "tween", 0.2, 1)}
                    className="h-[450px] lg:h-[550px] rounded-3xl cyber-glass-violet border border-purple-500/20 overflow-hidden relative flex flex-col items-center justify-center gap-8 p-8"
                >
                    <p className="text-slate-300 text-center text-sm font-light max-w-xs">
                        Not sure about reaching out? Give the Magic 8-Ball a shake.
                    </p>
                    <Magic8Ball />
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
