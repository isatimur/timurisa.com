import {
    atconsult,
    atos,
    be,
    cqrs,
    ddd,
    distr,
    docker,
    ebt,
    git,
    ids,
    introreactive,
    java8,
    javascript,
    kotlin,
    kubanen,
    kubernetes,
    megafon,
    mongodb,
    nodejs,
    oca,
    ocp, postgres,
    rab,
    reactive,
    reactjs,
    spring,
    tailwind,
    threejs,
    typescript
} from "../../public/assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "badges",
        title: "Badges"
    },
    {
        id: "book",
        title: "My book"
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Java Expert",
        icon: spring,
        description: "Seasoned in Java development, building high-performance, concurrent applications."
    },
    {
        title: "Frontend Specialist",
        icon: reactjs,
        description: "Crafting intuitive user interfaces with React, enriching web interactions."
    },
    {
        title: "Database Architect",
        icon: mongodb,
        description: "Designing and managing scalable database solutions with both SQL and NoSQL technologies."
    },
    {

        title: "Cloud Solutions Architect",
        icon: kubernetes,
        description: "Implementing cloud-native architectures, focusing on AWS, GCP, and Azure platforms."
    },
];
const badges = [
    {
        title: "Oracle - Certification Professional Java 8",
        icon: ocp,
        name: "Oracle - Certification Professional Java 8",
        link: "https://www.credly.com/badges/c0c5a3e2-f0f9-42a8-8ac0-cb9674b70013/public_url"
    },
    {
        title: "Oracle - Certification Associate Java 8",
        icon: oca,
        name: "Oracle - Certification Associate Java 8",
        link: "https://www.credly.com/badges/aaeb7ddf-99d5-4585-b6f4-b3d6e482f5ae/public_url"

    },
    {
        title: "Lightbend - Reactive Architecture",
        icon: introreactive,
        name: "Introduction to Reactive",
        link: "https://www.credly.com/badges/ceb4828c-6b2f-4aa4-917d-3b933413f1f7/public_url"

    },
    {

        title: "Lightbend - Reactive Architecture",
        icon: reactive,
        name: "Reactive Microservices",
        link: "https://www.credly.com/badges/ebcd2cbe-4c92-4f22-b1ee-aa58e5653535/public_url"

    }, {

        title: "Lightbend - Reactive Architecture",
        icon: ddd,
        name: "Domain Driven Design",
        link: "https://www.credly.com/badges/c3fb2973-186f-4347-a101-7c6900b52a5c/public_url"

    },
    {
        title: "Lightbend - Reactive Architecture",
        icon: distr,
        name: "Distributed Messaging",
        link: "https://www.credly.com/badges/52c502ac-04b5-4201-937a-b659578ee065/public_url"

    },
    {
        title: "Lightbend - Reactive Architecture",
        icon: rab,
        name: "Building Scalable Systems",
        link: "https://www.credly.com/badges/6aed39d9-779a-49da-8a5c-6bddc2b6ff52/public_url"

    },
    {

        title: "Lightbend - Reactive Architecture",
        icon: cqrs,
        name: "CQRS and Event Sourcing",
        link: "https://www.credly.com/badges/d4a27579-3cc7-4366-850f-526b1bdda3d1/public_url"
    },

];

const technologies = [
    {
        name: "Java",
        icon: java8,
    },
    {
        name: "Kotlin",
        icon: kotlin,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Spring",
        icon: spring,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "postgres",
        icon: postgres,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Senior Developer | Software engineer | Specialist",
        company_name: "JSC Kuban Energo",
        icon: kubanen,
        iconBg: "#1c2f35",
        date: "March 2009 - June 2012",
        points: [
            "Began as a Junior Java Developer, advancing to Senior Specialist.",
            "Developed and maintained Java applications, starting with Java version 1.6.",
            "Worked extensively with XSLT, XML, Oracle databases, and XSQL.",
            "Involved in migrating Struts framework to Google Web Toolkit (GWT) for internal projects.",
            "Participated in the Golden 100 HR reserve program, aimed at preparing top talent for leadership roles."
        ],
    },
    {
        title: "CGS Duty manager | CGS Specialist",
        company_name: "Atos",
        icon: atos,
        iconBg: "#f9bb5a",
        date: "June 2012 - May 2014",
        points: [
            "Worked on critical IT infrastructure for the Sochi 2014 Olympics and Paralympics.",
            "Played a key role in third-level support, change management, configuration management, incident management, and problem management.",
            "Received two silver Accolade Awards for developing an integration script to improve package deployment and an automated Identity Management system."
        ],
    },
    {
        title: "Oracle Hyperion Reporting Engineer",
        company_name: "Megafon",
        icon: megafon,
        iconBg: "#1c2f35",
        date: "May 2014 - Sept 2014",
        points: [
            "Worked with Oracle Hyperion for advanced data reporting and OLAP cubes.",
            "Focused on Groovy language for scripting and automation within Oracle Hyperion environment.",
            "Sought internal transfer to Java Development team but was retained for expertise in current role."
        ],
    },
    {
        title: "Expert | Consultant | Software Engineer",
        company_name: "AT-Consulting",
        icon: atconsult,
        iconBg: "#f9bb5a",
        date: "Sept 2014 - Sept 2017",
        points: [
            "Contributed to the redevelopment of Sberbank.ru on the BackBase platform.",
            "Successfully led the integration of React widgets with Java backend, demonstrating full-stack development expertise.",
            "Played a pivotal role in solving a complex issue with the UC2GET component which was crucial for migrating the current Sberbank.ru to the new engine."
        ],
    },
    {
        title: "Head Architect | Tech Lead | Team Lead | Senior Java Developer",
        company_name: "Business Environment",
        icon: be,
        iconBg: "#1c2f35",
        date: "Sept 2017 - June 2022",
        points: [
            "Led the development of an educational platform using microservices architecture, leveraging Play Framework and MyBatis with Postgres.",
            "Spearheaded a team of 20, implementing numerous system integrations, including payment solutions and webhooks.",
            "Promoted to Team Leader, then Technical Leader, overseeing multiple project directions."
        ],
    },
    {
        title: "Tech Lead/Solution Architect/Contractor",
        company_name: "EastBanc Technologies",
        icon: ebt,
        iconBg: "#1c2f35",
        date: "June 2022 - Present",
        points: [
            "Project for Glorify Bank: Played the role of Solution Architect focusing on brokerage integration with DriveWealth, and integrating AWS SQS events to Kafka. Also developed a notification service using Azure Cloud.",
            "Project for Red Cross: Contributed as a Java Developer, leading the payment migration from CyberSource to Braintree Paypal.",
            "Discovery Grant Management System for IRS: Functioned as a Technical Lead, overseeing the Grant Management System project development.",
            "Development of MVP for Grant Management System for IRS: Worked as a Technical Lead, utilizing technologies such as Kotlin, Java 17, JOOQ, PlantUML, and Springboot Webflux.",
            "StandupAI Project: Currently working on an AI-driven platform matching companies with government contracts, leveraging advanced machine learning and natural language processing technologies."
        ],
    },
    {
        title: "Team Lead / Solution Architect",
        company_name: "IDS, Remotely",
        icon: ids,
        iconBg: "#f9bb5a",
        date: "Nov 2022 - Sept 2024",
        points: [
            "Led a team of developers in the creation and implementation of a microservice-based Billing product, built entirely from the ground up.",
            "Spearheaded the integration of various payment systems, implementing a Single Sign-On (SSO) solution, and crafting a bespoke API Gateway utilizing the Spring Cloud Gateway framework.",
            "Technical Stack: Proficiency in Kotlin, Java 11 and above, JOOQ, SpringBoot, Webflux, Postgres, R2DBC, Spring Cloud Gateway, Keycloak, Kafka, and related technologies."
        ],
    },
    {
        title: "CTO",
        company_name: "Proffer.ae",
        date: "June 2025 - December 2025",
        points: [
            "Led technology for an AI-powered real estate platform that removes traditional agent commissions from Dubai's property market — buyers get cashback or pay a flat 1% fee, sellers list and sell commission-free.",
            "Built the platform as a full transaction system rather than a listing portal, handling paperwork and compliance with Dubai Land Department regulations.",
        ],
    },
    {
        title: "AI CTO",
        company_name: "Swiirl",
        date: "2026 - Present",
        points: [
            "Leads AI engineering for a platform that facilitates consent-first, permissioned conversations between enterprise brands and communities, replacing surveys and ads with authentic, compensated consumer insights.",
            "Co-authored From Copilot to Colleague with Swiirl CEO Daniel Mohanrao, a source-anchored book on AI engineering practice.",
        ],
    },
];

const testimonials = [
];

const projects = [
    {
        name: "StandupAI",
        company_name: "EastBanc Technologies",
        date: "2024 - Present",
        category: "AI & Machine Learning",
        icon: ebt,
        description:
            "An AI-driven platform matching companies with government contracts, leveraging machine learning and natural language processing to surface high-fit opportunities from thousands of federal solicitations.",
        points: [
            "Applies NLP to parse and rank federal solicitation text against a company's capabilities profile.",
            "Built on Kotlin and Java 17 services deployed alongside the firm's existing microservice platform.",
        ],
        tags: ["AI/ML", "NLP", "Kotlin", "Java 17"],
    },
    {
        name: "IRS Grant Management System",
        company_name: "EastBanc Technologies",
        date: "2023 - 2024",
        category: "Government",
        icon: ebt,
        description:
            "Technical Lead across the Discovery and MVP phases of a federal Grant Management System for the IRS, translating complex compliance requirements into a reactive service architecture.",
        points: [
            "Led discovery and MVP delivery as Technical Lead on a federally regulated program.",
            "Built on Kotlin, Java 17, JOOQ, and Spring WebFlux, with PlantUML for architecture documentation.",
        ],
        tags: ["Kotlin", "Java 17", "JOOQ", "Spring WebFlux"],
    },
    {
        name: "Glorify Bank Brokerage Integration",
        company_name: "EastBanc Technologies",
        date: "2022 - 2023",
        category: "FinTech",
        icon: ebt,
        description:
            "Solution Architect for brokerage integration with DriveWealth, bridging AWS SQS events into Kafka and building a notification service on Azure Cloud for real-time trade updates.",
        points: [
            "Designed the event bridge from AWS SQS to Kafka for brokerage transaction events.",
            "Built a standalone notification service on Azure Cloud for real-time account activity.",
        ],
        tags: ["AWS SQS", "Kafka", "Azure", "DriveWealth API"],
    },
    {
        name: "Red Cross Payment Migration",
        company_name: "EastBanc Technologies",
        date: "2022",
        category: "FinTech",
        icon: ebt,
        description:
            "Led the migration of donation payment processing from CyberSource to Braintree/PayPal, ensuring a clean cutover for a high-volume nonprofit payment platform.",
        points: [
            "Owned the end-to-end payment processor migration as lead Java developer.",
            "Coordinated cutover to minimize disruption to live donation processing.",
        ],
        tags: ["Java", "CyberSource", "Braintree", "PayPal"],
    },
    {
        name: "IDS Reactive Billing Platform",
        company_name: "IDS",
        date: "2022 - 2024",
        category: "FinTech",
        icon: ids,
        description:
            "Team Lead and Solution Architect building a microservice-based billing product from the ground up — a custom Spring Cloud API Gateway, Keycloak SSO, Kafka event streaming, and reactive R2DBC data access.",
        points: [
            "Led a team building the billing platform's architecture from an empty repository.",
            "Integrated multiple payment providers behind a bespoke Spring Cloud Gateway with Keycloak SSO.",
        ],
        tags: ["Kotlin", "Spring WebFlux", "R2DBC", "Kafka", "Keycloak"],
    },
    {
        name: "Enterprise Education Platform",
        company_name: "Business Environment",
        date: "2017 - 2022",
        category: "EdTech",
        icon: be,
        description:
            "Head Architect leading a 20-engineer team building a microservices-based education platform, including payment processing and webhook integrations for third-party partners.",
        points: [
            "Scaled from Senior Developer to Head Architect over a five-year engagement.",
            "Directed a 20-person engineering team across multiple concurrent project tracks.",
        ],
        tags: ["Play Framework", "MyBatis", "PostgreSQL", "Microservices"],
    },
    {
        name: "Sberbank.ru Platform Redevelopment",
        company_name: "AT-Consulting",
        date: "2014 - 2017",
        category: "Enterprise Modernization",
        icon: atconsult,
        description:
            "Led integration of React widgets with the Java backend during Sberbank.ru's migration to the BackBase platform, resolving a critical UC2GET blocker that unblocked the full rollout.",
        points: [
            "Bridged React front-end widgets with the existing Java backend for one of Russia's largest banking sites.",
            "Diagnosed and resolved a UC2GET integration issue that was blocking the migration.",
        ],
        tags: ["React", "Java", "BackBase"],
    },
    {
        name: "Sochi 2014 Olympics IT Infrastructure",
        company_name: "Atos",
        date: "2012 - 2014",
        category: "Olympics & Infrastructure",
        icon: atos,
        description:
            "Supported mission-critical IT infrastructure for the Sochi 2014 Olympic and Paralympic Games, building automation for package deployment and Identity Management — earning two Silver Accolade Awards.",
        points: [
            "Provided third-level support and incident/problem management for Games-time IT infrastructure.",
            "Built an automated Identity Management system and a package deployment integration script, each recognized with a Silver Accolade Award.",
        ],
        tags: ["Identity Management", "Automation", "Incident Management"],
    },
    {
        name: "Legacy Java Modernization",
        company_name: "JSC Kuban Energo",
        date: "2009 - 2012",
        category: "Enterprise Modernization",
        icon: kubanen,
        description:
            "Migrated internal enterprise reporting tools from the Struts framework to Google Web Toolkit (GWT), modernizing a Java 1.6-era codebase while maintaining Oracle/XSQL data integrations.",
        points: [
            "Advanced from Junior Java Developer to Senior Specialist over the engagement.",
            "Migrated internal Struts applications to GWT while preserving XSLT/XML/Oracle data flows.",
        ],
        tags: ["Java", "XSLT", "Oracle", "GWT"],
    },
    {
        name: "Swiirl: The Game",
        company_name: "Built with a team",
        date: "2026",
        category: "Side Projects & Tools",
        description:
            "A narrative side-scrolling platformer built for fun with a team — guide Swiirl through Community Park collecting real community insights while dodging corporate obstacles, delivered as a satirical take on business decision-making.",
        points: [
            "Five levels, each with a different corporate-archetype boss (Hot-Take Hank, Middle Manager Mike, VP of Vibes, The Algorithm, The CEO).",
            "Polished platformer feel: variable jump height, coyote time, jump buffering, and double-jump, with hand-rendered animation from official character sheets.",
        ],
        tags: ["Game Dev", "Team Project", "For Fun"],
        platforms: [
            { type: "web", label: "Play the Game", url: "https://swiirly-game.vercel.app" },
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/swiirly-game" },
        ],
    },
    {
        name: "Zonelyte",
        company_name: "Independent",
        date: "2026",
        category: "Side Projects & Tools",
        description:
            "The visual operating system for distributed teams — a timezone grid showing every teammate's day/night and work cycles at a glance, with a Golden Hour Finder that scores fairness across everyone's schedule to suggest meeting times nobody has to take at 3 AM.",
        points: [
            "Golden Hour Finder analyzes work hours, sleep schedules, and fairness across all participants to surface the best meeting times.",
            "Native iOS app built entirely in SwiftUI, works fully offline with no account, no cloud sync, and no tracking.",
            "Web app integrates with Google Calendar, Outlook, and Slack for exporting and sharing proposed meeting times.",
        ],
        tags: ["Scheduling", "SwiftUI", "iOS", "Chrome Extension", "Distributed Teams"],
        platforms: [
            { type: "web", label: "Web App", url: "https://zonelyte.com" },
            { type: "ios", label: "App Store", url: "https://apps.apple.com/us/app/zonelyte/id6759605788" },
            { type: "chrome", label: "Chrome Extension", url: "https://chromewebstore.google.com/detail/zonelyte-%E2%80%94-best-meeting-t/ofedhcncoglkknickaohkfkllhgihelm" },
        ],
    },
    {
        name: "Daily Affirmations",
        company_name: "Chrome Extension",
        date: "2025 - Present",
        category: "Side Projects & Tools",
        description:
            "A Chrome extension that transforms every new tab into a source of daily inspiration, surfacing a fresh affirmation each time you open a tab.",
        points: [
            "Built and shipped as a Chrome new-tab extension from an empty repository.",
            "Part of a self-directed 25-microSaaS build challenge to ship small, focused products quickly.",
        ],
        tags: ["Chrome Extension", "JavaScript"],
        platforms: [
            { type: "chrome", label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/daily-affirmations/nhhicimcipdgjckacooendaikhjhenle" },
        ],
    },
    {
        name: "Archigram",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Side Projects & Tools",
        description:
            "An AI architecture diagram generator for engineers — turns a plain-language system description into a clean, shareable architecture diagram.",
        points: [
            "Built an AI pipeline that converts natural-language system descriptions into structured diagrams.",
            "Targeted at engineers who need to communicate system design quickly without hand-drawing diagrams.",
        ],
        tags: ["AI", "Diagramming", "Developer Tools"],
        platforms: [
            { type: "web", label: "Web App", url: "https://archigram.me" },
        ],
    },
    {
        name: "From Copilot to Colleague",
        company_name: "AI Engineer Press",
        date: "2026 - Present",
        category: "Side Projects & Tools",
        description:
            "With Daniel Mohanrao. A source-anchored, evolving online book on AI engineering, where every claim links to the exact conference-talk video and timestamp it came from.",
        points: [
            "Drawn from 881 AI Engineer conference talks, with 199 source anchors backing 54 claims.",
            "Public, machine-readable claims ledger and chapter drafts, with chapters graded by a panel of rival open models.",
        ],
        tags: ["AI Engineering", "Source-Anchored Research", "Open Access"],
        platforms: [
            { type: "web", label: "Read Online", url: "https://fromcopilottocolleague.com" },
        ],
    },
    {
        name: "Claims Ledger",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "Source-anchored claims verification for docs, code, and AI agent decisions — CI fails the build when a cited source goes stale, so no claim ships without evidence.",
        points: [
            "Published as npm packages (@claims-ledger/edt, @claims-ledger/ledger-core) with a working demo and CI badges.",
            "The verification engine behind the claims ledger used to fact-check From Copilot to Colleague.",
        ],
        tags: ["CI/CD", "Verification", "npm", "Developer Tools"],
        platforms: [
            { type: "web", label: "Demo", url: "https://isatimur.github.io/claims-ledger" },
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/claims-ledger" },
        ],
    },
    {
        name: "Personal Assistant",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A self-hosted, modular AI assistant running as a Telegram bot — multi-provider LLM support, a plugin architecture, and a nightly self-learning reflection loop.",
        points: [
            "Built with Kotlin coroutines in a ports-and-adapters architecture, with plugin JARs for Shell, Web, GitHub, Jira, and Linear.",
            "Uses SQLite with FTS5 for memory and runs a nightly reflection loop to improve its own responses over time.",
        ],
        tags: ["Kotlin", "LLM", "Telegram Bot", "Self-Hosted"],
        platforms: [
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/personal-assistant" },
        ],
    },
    {
        name: "Book Mash",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A multi-judge measurement engine for book manuscripts — six independent judges score prose on craft and epistemic dimensions, producing a JSON ledger and report.",
        points: [
            "First consumer of the tool is From Copilot to Colleague, whose chapters are graded by a panel of rival open models.",
            "Outputs a structured, machine-readable scoring ledger rather than a single opaque rating.",
        ],
        tags: ["AI Evaluation", "Publishing Tools"],
        platforms: [
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/book-mash" },
        ],
    },
    {
        name: "De-Slop",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A Claude Code skill that detects AI-sounding prose, rewrites it into writing with a real point of view, self-scores against a rubric, and iterates to a bar.",
        points: [
            "Flags hollow spans instead of fabricating claims, preserving meaning while removing filler.",
            "Packaged as a portable Claude Code skill usable across any project.",
        ],
        tags: ["Claude Code", "AI Agents", "Writing Tools"],
        platforms: [
            { type: "web", label: "Web App", url: "https://de-slop-ai.vercel.app" },
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/de-slop" },
        ],
    },
    {
        name: "Excalidraw Skill Pack",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A universal skill pack that lets AI coding agents — Claude Code, Cursor, Codex, Gemini CLI, and any MCP-compatible agent — generate Excalidraw diagrams.",
        points: [
            "Works across multiple agent platforms via a shared, portable skill definition.",
            "Lets an agent argue visually by producing real, editable Excalidraw files instead of static images.",
        ],
        tags: ["Excalidraw", "AI Agents", "Diagramming", "MCP"],
        platforms: [
            { type: "web", label: "Web App", url: "https://excalidraw-skill-pack.vercel.app" },
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/excalidraw-skill-pack" },
        ],
    },
    {
        name: "Presentation MD",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "Turns rough notes into schema-validated slide decks, exporting to PPTX, Keynote, or Google Slides — packaged as both an agent skill and an MCP server.",
        points: [
            "Validates deck structure against a schema before export, catching malformed slides early.",
            "Ships as an MCP server so any MCP-compatible AI agent can generate presentations directly.",
        ],
        tags: ["MCP", "AI Agents", "Presentations"],
        platforms: [
            { type: "web", label: "Web App", url: "https://presentation-skill-pack.vercel.app" },
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/presentation-md" },
        ],
    },
    {
        name: "Slide Deck Benchmark",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A bake-off of 7 slide-deck generation skills run against the same real-world brief — scored on brand fidelity, design, completeness, and cost, with downloadable decks and a side-by-side comparator.",
        points: [
            "Evaluates 7 competing slide-generation approaches on identical inputs rather than relying on a single tool's self-reported quality.",
            "Ships the actual generated decks alongside the scores, so the comparison is directly checkable, not just a number.",
        ],
        tags: ["AI Evaluation", "Benchmarking", "Presentations"],
        platforms: [
            { type: "web", label: "Web App", url: "https://swiirl-deck-benchmark.vercel.app" },
        ],
    },
    {
        name: "Remotion Skill Pack",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "Lets AI coding agents author Remotion video compositions as structured specs that render to real .mp4 files.",
        points: [
            "Defines a scene-by-scene composition spec that Remotion's renderer turns into production-ready video.",
            "Extends the same 'agent authors structured spec, tool renders real output' pattern used across the skill-pack series.",
        ],
        tags: ["Remotion", "AI Agents", "Video"],
        platforms: [
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/remotion-skill-pack" },
        ],
    },
    {
        name: "Improve Claude by 1M",
        company_name: "Independent",
        date: "2026 - Present",
        category: "Developer Tools & AI Agents",
        description:
            "A marketplace of high-leverage Claude Code plugins — generator and verifier bundles with deterministic engines, gated by a CI quality check.",
        points: [
            "Pairs each generator plugin with an independent verifier so output quality is checked, not assumed.",
            "CI quality gate blocks plugins that don't meet the bar before they ship into the marketplace.",
        ],
        tags: ["Claude Code", "AI Agents", "CI/CD"],
        platforms: [
            { type: "github", label: "GitHub", url: "https://github.com/isatimur/improve-claude-by-1M" },
        ],
    },
];

export {services, badges, technologies, experiences, testimonials, projects};
