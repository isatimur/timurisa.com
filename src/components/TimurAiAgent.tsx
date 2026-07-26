'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Bot, Terminal, Sparkles, X, Send, Cpu, Zap, Volume2, VolumeX, Code, CheckCircle2, ShieldCheck } from 'lucide-react'

interface Message {
    id: string
    sender: 'user' | 'ai'
    text: string
    timestamp: string
    codeSnippet?: string
}

const PRESET_PROMPTS = [
    "🚀 Summarize Timur's Solution Architecture background",
    "⚡ What high-scale systems has Timur built?",
    "🏆 Show Timur's verified certifications & book",
    "🛠️ What is Timur's core technology stack?"
]

const AI_KNOWLEDGE_BASE: Record<string, { reply: string; code?: string }> = {
    "architecture": {
        reply: "Timur Isachenko is a Principal Solution Architect & Team Lead with over 15 years of hands-on experience building mission-critical, microservice-based enterprise platforms. He has spearheaded teams of 20+ engineers, designed cloud-native event-driven architectures with Kafka and Spring Cloud, and managed financial/banking integrations.",
        code: `// Sample Reactive Architecture Blueprint (Spring WebFlux + JOOQ)
@Configuration
public class ReactiveBillingConfig {
    @Bean
    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        return http.csrf(CsrfSpec::disable)
            .authorizeExchange(ex -> ex
                .pathMatchers("/api/v1/billing/**").hasRole("ARCHITECT")
                .anyExchange().authenticated())
            .oauth2ResourceServer(OAuth2ResourceServerSpec::jwt)
            .build();
    }
}`
    },
    "scale": {
        reply: "Key high-scale highlights:\n- **IDS**: Headed billing product architecture with custom Spring Cloud API Gateway, Keycloak SSO, Kafka streaming & R2DBC reactive Postgres.\n- **Sberbank.ru (AT-Consulting)**: Crucial role in migrating Sberbank.ru to the Backbase & React engine, solving complex UC2GET integration.\n- **Sochi 2014 Olympics (Atos)**: CGS Duty Manager & Specialist managing IT infrastructure, earning 2 Silver Accolade Awards.",
        code: `// Event-Driven SQS -> Kafka Bridge Architecture
@KafkaListener(topics = "bank-transactions-topic")
public Mono<Void> processTransaction(TransactionEvent event) {
    return transactionService.processReactive(event)
        .doOnSuccess(v -> log.info("Transaction {} committed", event.getId()))
        .then();
}`
    },
    "certifications": {
        reply: "Timur holds prestigious certifications:\n- **Oracle Certified Professional (OCP)** - Java 8\n- **Oracle Certified Associate (OCA)** - Java 8\n- **Lightbend Reactive Architecture Professional Series** (DDD, CQRS & Event Sourcing, Distributed Messaging, Scalable Systems, Reactive Microservices).\n- Author of technical books & technical articles.",
        code: `// Lightbend CQRS / Event-Sourcing Pattern Matrix
class OrderAggregate : EventSourcedBehavior<Command, Event, State>(...) {
    override fun applyEvent(state: State, event: Event): State = when(event) {
        is OrderCreated -> state.copy(status = Status.ACTIVE)
        is OrderFulfilled -> state.copy(status = Status.COMPLETED)
    }
}`
    },
    "stack": {
        reply: "Timur's core technology stack encompasses:\n- **Languages**: Java (8 through 21+), Kotlin, TypeScript, Groovy.\n- **Frameworks**: Spring Boot, Spring Webflux, Play Framework, React, Next.js, JOOQ, MyBatis.\n- **Infrastructure**: Kubernetes, Docker, AWS (SQS, EC2), Azure Cloud, Kafka, Postgres (R2DBC), MongoDB, Keycloak.",
        code: `// Tech Matrix Summary
const TIMUR_STACK = {
    primaryBackend: ["Java 21", "Kotlin", "Spring WebFlux"],
    architecture: ["Reactive Microservices", "CQRS", "Event Sourcing"],
    dataCloud: ["PostgreSQL", "Kafka", "AWS", "Kubernetes"],
    frontend: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS"]
};`
    }
}

export const TimurAiAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            sender: 'ai',
            text: "Hello! I am **TIMUR AI CORE v3.0**, an autonomous AI assistant powered by Timur Isachenko's engineering knowledge base. Ask me anything about Timur's system architecture, technical leadership, or high-scale projects!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [soundEnabled, setSoundEnabled] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const playBeep = () => {
        if (!soundEnabled || typeof window === 'undefined') return
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext
            if (!AudioContext) return
            const ctx = new AudioContext()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.frequency.setValueAtTime(800, ctx.currentTime)
            gain.gain.setValueAtTime(0.03, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.08)
        } catch (e) {
            // Audio ignore
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = (textToSend?: string) => {
        const text = (textToSend || input).trim()
        if (!text) return

        playBeep()

        const userMsg: Message = {
            id: 'user-' + Date.now(),
            sender: 'user',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMsg])
        if (!textToSend) setInput('')
        setIsTyping(true)

        setTimeout(() => {
            playBeep()
            let responseObj = AI_KNOWLEDGE_BASE["architecture"]
            const lower = text.toLowerCase()

            if (lower.includes("scale") || lower.includes("project") || lower.includes("built") || lower.includes("work")) {
                responseObj = AI_KNOWLEDGE_BASE["scale"]
            } else if (lower.includes("cert") || lower.includes("book") || lower.includes("badge") || lower.includes("oracle")) {
                responseObj = AI_KNOWLEDGE_BASE["certifications"]
            } else if (lower.includes("stack") || lower.includes("tech") || lower.includes("language") || lower.includes("skill")) {
                responseObj = AI_KNOWLEDGE_BASE["stack"]
            }

            const aiMsg: Message = {
                id: 'ai-' + Date.now(),
                sender: 'ai',
                text: responseObj.reply,
                codeSnippet: responseObj.code,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }

            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 700)
    }

    return (
        <>
            {/* Floating Trigger Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => {
                        setIsOpen(!isOpen)
                        playBeep()
                    }}
                    className="relative group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-medium shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/30"
                >
                    <div className="relative">
                        <Cpu className="w-6 h-6 animate-pulse text-cyan-200" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <span className="tracking-wide text-sm font-semibold">AI Assistant</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-black/40 rounded-full border border-cyan-400/30 text-cyan-300">v3.0</span>
                </button>
            </div>

            {/* Modal Terminal Interface */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
                    <div className="relative w-full max-w-2xl h-[620px] flex flex-col rounded-3xl cyber-glass border border-cyan-500/30 shadow-2xl overflow-hidden">
                        
                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-cyan-500/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-base tracking-wide">TIMUR AI CORE</h3>
                                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                            <ShieldCheck className="w-3 h-3" /> ONLINE
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">Autonomous Architecture Knowledge Agent</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    title={soundEnabled ? "Mute audio synthesis" : "Enable audio synthesis"}
                                    className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 rounded-xl transition"
                                >
                                    {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Preset Prompt Chips */}
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
                            {PRESET_PROMPTS.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(prompt)}
                                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 transition-all font-mono"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        {/* Chat Messages Body */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-sm">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'ai' && (
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                    )}

                                    <div className={`max-w-[82%] rounded-2xl p-4 ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-lg'
                                            : 'bg-slate-900/90 border border-cyan-500/20 text-slate-200 rounded-bl-none shadow-md'
                                    }`}>
                                        <div className="whitespace-pre-line leading-relaxed">
                                            {msg.text}
                                        </div>

                                        {msg.codeSnippet && (
                                            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-300 overflow-x-auto">
                                                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800 text-[10px] text-slate-500">
                                                    <span className="flex items-center gap-1"><Code className="w-3 h-3"/> ARCHITECTURE DIAGRAM / CODE</span>
                                                    <span>JAVA / KOTLIN</span>
                                                </div>
                                                <pre>{msg.codeSnippet}</pre>
                                            </div>
                                        )}

                                        <div className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-cyan-100/70' : 'text-slate-500'}`}>
                                            {msg.timestamp}
                                        </div>
                                    </div>

                                    {msg.sender === 'user' && (
                                        <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md font-bold text-xs">
                                            YOU
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-3 text-cyan-400 text-xs font-mono">
                                    <div className="w-8 h-8 rounded-xl bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center">
                                        <Zap className="w-4 h-4 animate-spin text-cyan-300" />
                                    </div>
                                    <span className="animate-pulse">Processing neural knowledge base...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Box */}
                        <div className="p-4 bg-slate-950/90 border-t border-cyan-500/20 flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask TIMUR AI about system architecture, Java 21, Kafka..."
                                className="flex-1 bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition font-sans"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:opacity-90 disabled:opacity-40 transition shadow-md"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TimurAiAgent
