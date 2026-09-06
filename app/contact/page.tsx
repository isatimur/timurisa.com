"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SiteFooter } from "@/components/SiteFooter";
export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false),
    [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus("idle");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_id",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_id",
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_id",
      );
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="portfolio site-shell">
      <NavBar />
      <main className="site-main contact-main">
        <header className="page-intro">
          <h1>
            Good things start
            <br />
            <span>with a conversation.</span>
          </h1>
          <p>
            A complex system. An early idea. A question you haven’t quite
            figured out. I’d like to hear it.
          </p>
        </header>
        <div className="contact-layout">
          <aside className="contact-note">
            <div className="contact-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
              <span />
            </div>
            <h2>
              Let’s make
              <br />
              something work.
            </h2>
            <p>
              AI-native products, solution architecture, and the engineering
              that connects them.
            </p>
            <a
              className="text-action"
              href="https://linkedin.com/in/timur-isachenko"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight size={16} />
            </a>
          </aside>
          <form ref={formRef} onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="How should I call you?"
                  required
                  maxLength={150}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                />
              </label>
            </div>
            <label>
              What are you thinking about?
              <textarea
                name="message"
                placeholder="Tell me about your idea, your project, or the challenge you’re facing…"
                rows={7}
                required
                maxLength={10000}
              />
            </label>
            <div className="form-submit">
              <p>
                By sending, you agree to the{" "}
                <Link href="/privacy-policy">privacy policy</Link>.
              </p>
              <button
                className="primary-action"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send message"}
                <ArrowRight size={17} />
              </button>
            </div>
            {status === "success" && (
              <p className="form-status" role="status">
                <Check size={18} />
                Thanks for reaching out. Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="form-status form-error" role="alert">
                Your message couldn’t be sent. Please try again or{" "}
                <a
                  href="https://linkedin.com/in/timur-isachenko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact me on LinkedIn
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
