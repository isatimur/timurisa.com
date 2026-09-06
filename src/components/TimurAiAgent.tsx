"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Volume2, VolumeX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

const PRESET_PROMPTS = [
  "Summarize Timur's Solution Architecture background",
  "What high-scale systems has Timur built?",
  "Show Timur's verified certifications & book",
  "What is Timur's core technology stack?",
];

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const AI_KNOWLEDGE_BASE: Record<string, { reply: string; code?: string }> = {
  architecture: {
    reply:
      "Timur Isachenko is currently **AI CTO at Swiirl**, and a Principal Solution Architect & Team Lead with over 15 years of hands-on experience building mission-critical, microservice-based enterprise platforms. He has spearheaded teams of 20+ engineers, designed cloud-native event-driven architectures with Kafka and Spring Cloud, and managed financial/banking integrations.",
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
}`,
  },
  scale: {
    reply:
      "Key high-scale highlights:\n- **IDS**: Headed billing product architecture with custom Spring Cloud API Gateway, Keycloak SSO, Kafka streaming & R2DBC reactive Postgres.\n- **Sberbank.ru (AT-Consulting)**: Crucial role in migrating Sberbank.ru to the Backbase & React engine, solving complex UC2GET integration.\n- **Sochi 2014 Olympics (Atos)**: CGS Duty Manager & Specialist managing IT infrastructure, earning 2 Silver Accolade Awards.",
    code: `// Event-Driven SQS -> Kafka Bridge Architecture
@KafkaListener(topics = "bank-transactions-topic")
public Mono<Void> processTransaction(TransactionEvent event) {
    return transactionService.processReactive(event)
        .doOnSuccess(v -> log.info("Transaction {} committed", event.getId()))
        .then();
}`,
  },
  certifications: {
    reply:
      "Timur holds prestigious certifications:\n- **Oracle Certified Professional (OCP)** - Java 8\n- **Oracle Certified Associate (OCA)** - Java 8\n- **Lightbend Reactive Architecture Professional Series** (DDD, CQRS & Event Sourcing, Distributed Messaging, Scalable Systems, Reactive Microservices).\n- Author of technical books & technical articles.",
    code: `// Lightbend CQRS / Event-Sourcing Pattern Matrix
class OrderAggregate : EventSourcedBehavior<Command, Event, State>(...) {
    override fun applyEvent(state: State, event: Event): State = when(event) {
        is OrderCreated -> state.copy(status = Status.ACTIVE)
        is OrderFulfilled -> state.copy(status = Status.COMPLETED)
    }
}`,
  },
  stack: {
    reply:
      "Timur's core technology stack encompasses:\n- **Languages**: Java (8 through 21+), Kotlin, TypeScript, Groovy.\n- **Frameworks**: Spring Boot, Spring Webflux, Play Framework, React, Next.js, JOOQ, MyBatis.\n- **Infrastructure**: Kubernetes, Docker, AWS (SQS, EC2), Azure Cloud, Kafka, Postgres (R2DBC), MongoDB, Keycloak.",
    code: `// Tech Matrix Summary
const TIMUR_STACK = {
    primaryBackend: ["Java 21", "Kotlin", "Spring WebFlux"],
    architecture: ["Reactive Microservices", "CQRS", "Event Sourcing"],
    dataCloud: ["PostgreSQL", "Kafka", "AWS", "Kubernetes"],
    frontend: ["React.js", "Next.js 15", "TypeScript", "Tailwind CSS"]
};`,
  },
  current: {
    reply:
      "Timur is currently **AI CTO at Swiirl**, a platform that facilitates consent-first, permissioned conversations between enterprise brands and communities — replacing surveys and ads with authentic, compensated consumer insights. He leads AI engineering there and co-authored **From Copilot to Colleague** with Swiirl's CEO, Daniel Mohanrao.",
    code: `// Swiirl: consent-first brand-community insights
interface SwiirlConversation {
    community: CommunityGroup
    brand: EnterpriseBrand
    consent: "permissioned"
    compensation: "paid, not extracted"
}`,
  },
};

interface TimurAiAgentProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const TimurAiAgent: React.FC<TimurAiAgentProps> = ({
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const openAgent = onOpen ?? (() => setInternalIsOpen(true));
  const closeAgent = onClose ?? (() => setInternalIsOpen(false));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: "Hello! I’m Timur’s portfolio assistant. I answer from a curated knowledge base about his architecture work, technical leadership, and projects.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const playBeep = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio ignore
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    playBeep();

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      playBeep();
      let responseObj = AI_KNOWLEDGE_BASE["architecture"];
      const lower = text.toLowerCase();

      if (
        lower.includes("swiirl") ||
        lower.includes("current") ||
        lower.includes("cto") ||
        lower.includes("now") ||
        lower.includes("today")
      ) {
        responseObj = AI_KNOWLEDGE_BASE["current"];
      } else if (
        lower.includes("scale") ||
        lower.includes("project") ||
        lower.includes("built") ||
        lower.includes("work")
      ) {
        responseObj = AI_KNOWLEDGE_BASE["scale"];
      } else if (
        lower.includes("cert") ||
        lower.includes("book") ||
        lower.includes("badge") ||
        lower.includes("oracle")
      ) {
        responseObj = AI_KNOWLEDGE_BASE["certifications"];
      } else if (
        lower.includes("stack") ||
        lower.includes("tech") ||
        lower.includes("language") ||
        lower.includes("skill")
      ) {
        responseObj = AI_KNOWLEDGE_BASE["stack"];
      }

      const aiMsg: Message = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: responseObj.reply,
        codeSnippet: responseObj.code,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => (value ? openAgent() : closeAgent())}
    >
      <DialogContent className="assistant-dialog">
        <div className="assistant-header">
          <DialogTitle>
            Meet the work.
            <br />
            <span>Ask a question.</span>
          </DialogTitle>
          <DialogDescription>
            Timur’s portfolio assistant · curated knowledge base
          </DialogDescription>
          <button
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            className="assistant-sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
        </div>
        <div className="assistant-prompts">
          {PRESET_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              disabled={isTyping}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="assistant-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`assistant-message assistant-${msg.sender}`}
            >
              <span>{msg.sender === "ai" ? "Portfolio assistant" : "You"}</span>
              <div>{renderFormattedText(msg.text)}</div>
              {msg.codeSnippet && <pre>{msg.codeSnippet}</pre>}
            </div>
          ))}
          {isTyping && (
            <p className="assistant-typing">
              Finding that in the knowledge base…
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="assistant-input"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            aria-label="Your question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Timur’s work…"
          />
          <button
            aria-label="Send question"
            type="submit"
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TimurAiAgent;
