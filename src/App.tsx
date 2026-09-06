"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { projects, experiences, technologies, badges } from "./constants";
import { getProjectSlug, type ProjectRecord } from "./constants/projectPages";

const ArchitectureScene = dynamic(
  () => import("./components/portfolio/ArchitectureScene"),
  {
    ssr: false,
    loading: () => (
      <div
        className="architecture-loading"
        aria-label="Loading interactive sculpture"
      />
    ),
  },
);
const TimurAiAgent = dynamic(
  () => import("./components/TimurAiAgent").then((m) => m.TimurAiAgent),
  { ssr: false },
);
const featured = ["IDS Reactive Billing Platform", "StandupAI", "Archigram"]
  .map((name) => projects.find((p) => p.name === name))
  .filter(Boolean) as ProjectRecord[];
const books = [
  {
    title: "From Copilot to Colleague",
    subject: "AI ENGINEERING",
    image: "/assets/from-copilot-to-colleague.png",
    href: "https://fromcopilottocolleague.com",
    text: "Turning models into dependable systems. Co-authored with Daniel Mohanrao.",
  },
  {
    title: "Generative AI with Local LLM",
    subject: "LOCAL INTELLIGENCE",
    image: "/assets/book-cover.webp",
    href: "https://a.co/d/a7kqMqW",
    text: "A practical guide to running and deploying local language models.",
  },
  {
    title: "High Performance In-Memory Computing with Apache Ignite",
    subject: "DISTRIBUTED SYSTEMS",
    image: "/assets/book.jpeg",
    href: "https://a.co/d/4rVYpcH",
    text: "Patterns for data grids, compute grids, and low-latency architectures.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#selected-work">
        Skip to selected work
      </a>
      <header className="portfolio-nav">
        <Link href="/" className="wordmark" aria-label="Timur Isachenko home">
          ti<span>.</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
        >
          {[
            ["Work", "#selected-work"],
            ["About", "#about"],
            ["Writing", "/blog"],
            ["Books", "#book"],
          ].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="nav-contact" href="/contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-line">Complex systems.</span>
            <span className="hero-line">Clear thinking.</span>
            <span className="hero-line hero-accent">Real impact.</span>
          </h1>
          <p>
            I’m Timur Isachenko. AI CTO &amp; Principal Solution Architect. I
            turn ambitious ideas into systems that work in the real world.
          </p>
          <div className="hero-actions">
            <a href="#selected-work" className="primary-action">
              Explore my work <ArrowDown size={17} />
            </a>
            <button className="text-action" onClick={() => setAgentOpen(true)}>
              Ask my AI assistant <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        <ArchitectureScene />
        <div className="hero-foot">
          <span>17+ years of building what’s next</span>
          <span>
            AI-native products <i /> Distributed systems
          </span>
          <a href="#selected-work" aria-label="Scroll to selected work">
            <ArrowDown size={18} />
          </a>
        </div>
      </section>
      <div className="experience-strip">
        <span>Experience across</span>
        <div>
          <b>Swiirl</b>
          <b>EastBanc Technologies</b>
          <b>Atos</b>
          <b>IDS</b>
          <b>Business Environment</b>
        </div>
      </div>
      <section id="selected-work" className="portfolio-section work-section">
        <div className="section-heading">
          <h2>
            Selected work<span>.</span>
          </h2>
          <Link href="/projects" className="text-action">
            All projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="project-grid">
          {featured.map((project, index) => (
            <Link
              href={`/projects/${getProjectSlug(project)}`}
              key={project.name}
              className={`project-item project-${index}`}
            >
              <div className="project-art" aria-hidden="true">
                {index === 0 ? (
                  <div className="billing-art">
                    {Array.from({ length: 7 }, (_, i) => (
                      <i key={i} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                  </div>
                ) : index === 1 ? (
                  <div className="signal-art">
                    {Array.from({ length: 19 }, (_, i) => (
                      <i
                        key={i}
                        style={{
                          height: `${25 + Math.sin(i * 0.7) * 20 + Math.sin(i * 0.3) * 55}%`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="arch-art">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                <span className="project-open">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="project-meta">
                <span>{project.category}</span>
                <span>{project.date}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="about" className="portfolio-section about-section">
        <div className="portrait">
          <Image
            src="/assets/avatar-modified.jpg"
            alt="Timur Isachenko"
            width={500}
            height={550}
          />
          <span>Timur Isachenko</span>
        </div>
        <div className="about-copy">
          <h2>
            Built on experience.
            <br />
            <span>Driven by curiosity.</span>
          </h2>
          <p>
            From the Sochi 2014 Olympics to banking platforms and AI-native
            products, I’ve spent 17+ years working where the complexity is real
            and the details matter.
          </p>
          <p>
            Today, I lead AI engineering at Swiirl and work across solution
            architecture, reactive systems, and product development. I care
            about the whole journey: the first question, the architecture, and
            what happens after launch.
          </p>
          <a href="#work" className="text-action">
            Explore my experience <ArrowDown size={17} />
          </a>
        </div>
      </section>
      <section id="work" className="portfolio-section career-section">
        <div className="section-heading">
          <h2>
            A few chapters
            <br />
            along the way<span>.</span>
          </h2>
          <p>
            Engineering, architecture, and leadership.
            <br />
            From 2009 to what’s next.
          </p>
        </div>
        <div className="career-list">
          {[...experiences].reverse().map((experience) => (
            <details key={experience.company_name}>
              <summary>
                <span className="career-date">{experience.date}</span>
                <span className="career-company">
                  {experience.company_name}
                </span>
                <span className="career-title">{experience.title}</span>
                <Plus size={18} />
              </summary>
              <ul>
                {experience.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <section id="tech" className="portfolio-section toolkit-section">
        <h2>The tools behind the work.</h2>
        <div className="toolkit">
          {technologies.map((tech) => (
            <span key={tech.name}>{tech.name}</span>
          ))}
        </div>
        <details id="badges" className="credentials">
          <summary>
            Oracle &amp; reactive architecture certifications <Plus size={18} />
          </summary>
          <div>
            {badges.map((badge) => (
              <a
                key={badge.link}
                href={badge.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {badge.name}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </details>
      </section>
      <section id="book" className="portfolio-section books-section">
        <div className="section-heading">
          <h2>
            Ideas worth sharing<span>.</span>
          </h2>
          <Link href="/blog" className="text-action">
            Writing &amp; research <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="book-grid">
          {books.map((book) => (
            <a
              href={book.href}
              key={book.title}
              target="_blank"
              rel="noopener noreferrer"
              className="book-item"
            >
              <div className="book-stage">
                <Image
                  src={book.image}
                  alt={`${book.title} cover`}
                  width={220}
                  height={300}
                />
              </div>
              <h3>
                {book.title} <ArrowUpRight size={18} />
              </h3>
              <span className="book-subject">{book.subject}</span>
              <p>{book.text}</p>
            </a>
          ))}
        </div>
        <Link className="text-action books-more" href="/book">
          Explore all books <ArrowRight size={17} />
        </Link>
      </section>
      <section id="contact" className="portfolio-section contact-section">
        <p>Have a complex problem or an ambitious idea?</p>
        <Link href="/contact">
          Let’s build
          <br />
          something real.
          <ArrowUpRight />
        </Link>
        <div className="contact-bottom">
          <span>Good work starts with a conversation.</span>
          <button className="text-action" onClick={() => setAgentOpen(true)}>
            Meet my AI assistant <ArrowUpRight size={17} />
          </button>
        </div>
      </section>
      <footer className="portfolio-footer">
        <span>© {new Date().getFullYear()} Timur Isachenko</span>
        <div>
          <a
            href="https://github.com/isatimur"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/timur-isachenko"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
      {agentOpen && (
        <TimurAiAgent
          isOpen={agentOpen}
          onOpen={() => setAgentOpen(true)}
          onClose={() => setAgentOpen(false)}
        />
      )}
    </div>
  );
}
