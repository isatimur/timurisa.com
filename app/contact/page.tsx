'use client';

import React, { useRef, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import emailjs from '@emailjs/browser';
import { Send, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_id',
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id',
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'user_id'
            );
            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Failed to send message: ', err);
            setError(true);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#030712] bg-grid-pattern">
            <NavBar />
            <main className="container mx-auto px-4 py-12 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
                    <Mail className="w-3.5 h-3.5" />
                    <span>NEURAL CONTACT CHANNEL</span>
                </div>
                <h1 className="text-4xl font-bold mb-8 text-white">Contact Me</h1>
                <div className="cyber-glass border border-cyan-500/20 rounded-2xl p-8 shadow-2xl">
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
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
