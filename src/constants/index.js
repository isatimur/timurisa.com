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
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Tim proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Tim does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Timur developed website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
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
        name: "Zonelyte",
        company_name: "Independent",
        date: "2026",
        category: "Side Projects & Tools",
        description:
            "A visual timezone overlap tool and scheduler for distributed teams — a world clock showing day/night cycles and working hours across every team location at once, with an AI-powered meeting time finder.",
        points: [
            "Built an AI-assisted meeting time finder that surfaces optimal scheduling windows across time zones.",
            "Integrates with Google Calendar, Outlook, and Slack for exporting and sharing proposed meeting times.",
        ],
        tags: ["Scheduling", "AI", "Distributed Teams"],
        link: "https://zonelyte.com",
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
        link: "https://daily-affirmation.today",
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
        link: "https://archigram.me",
    },
];

export {services, badges, technologies, experiences, testimonials, projects};
