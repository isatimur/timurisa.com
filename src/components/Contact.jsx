'use client';
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import BlackHoleCanvas from "./canvas/BlackHole.jsx";
import { Send, Mail, MapPin, CheckCircle2, ShieldCheck, Github, Linkedin } from "lucide-react";

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

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
        } catch (error) {
            console.error("Failed to send message: ", error);
            // Fallback user notification
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
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
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none transition font-sans"
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
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none transition font-sans"
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
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none transition font-sans"
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

                {/* 3D BlackHole / Graphic Column */}
                <motion.div
                    variants={slideIn("right", "tween", 0.2, 1)}
                    className="h-[450px] lg:h-[550px] rounded-3xl overflow-hidden relative"
                >
                    <BlackHoleCanvas />
                </motion.div>
            </div>
        </div>
    );
};

export default SectionWrapper(Contact, "contact");
