export type CaseStudyAccent = {
    primary: string;
    secondary?: string;
};

export type CaseStudyBookTieIn = {
    chapterTitle: string;
    url: string;
};

export type CaseStudy = {
    slug: string;
    projectRef: string;
    company: string;
    role: string;
    timeframe: string;
    awards?: string;
    accent: CaseStudyAccent;
    hook: string;
    tags: string[];
    situation: string;
    problem: string;
    approach: string[];
    pitfalls: string[];
    outcome: string;
    lessons: string[];
    bookTieIn?: CaseStudyBookTieIn;
};

export const caseStudies: CaseStudy[] = [
    {
        slug: 'sochi-2014-olympics',
        projectRef: 'Sochi 2014 Olympics IT Infrastructure',
        company: 'Atos',
        role: 'CGS Duty Manager',
        timeframe: '2012 – 2014',
        awards: '★ Silver Accolade ×2',
        accent: { primary: '#38BDF8', secondary: '#94A3B8' },
        hook: 'Supported mission-critical IT infrastructure for the Sochi 2014 Olympic and Paralympic Games, building automation for package deployment and Identity Management — earning two Silver Accolade Awards.',
        tags: ['Identity Management', 'Automation', 'Incident Management'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'sberbank-uc2get-migration',
        projectRef: 'Sberbank.ru Platform Redevelopment',
        company: 'AT-Consulting',
        role: 'Expert / Consultant / Software Engineer',
        timeframe: '2014 – 2017',
        accent: { primary: '#16A34A' },
        hook: "Led integration of React widgets with the Java backend during Sberbank.ru's migration to the BackBase platform, resolving a critical UC2GET blocker that unblocked the full rollout.",
        tags: ['React', 'Java', 'BackBase'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'ids-reactive-billing-platform',
        projectRef: 'IDS Reactive Billing Platform',
        company: 'IDS',
        role: 'Team Lead / Solution Architect',
        timeframe: '2022 – 2024',
        accent: { primary: '#F59E0B' },
        hook: 'Team Lead and Solution Architect building a microservice-based billing product from the ground up — a custom Spring Cloud API Gateway, Keycloak SSO, Kafka event streaming, and reactive R2DBC data access.',
        tags: ['Kotlin', 'Spring WebFlux', 'R2DBC', 'Kafka', 'Keycloak'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'business-environment-education-platform',
        projectRef: 'Enterprise Education Platform',
        company: 'Business Environment',
        role: 'Head Architect',
        timeframe: '2017 – 2022',
        accent: { primary: '#8B5CF6' },
        hook: 'Head Architect leading a 20-engineer team building a microservices-based education platform, including payment processing and webhook integrations for third-party partners.',
        tags: ['Play Framework', 'MyBatis', 'PostgreSQL', 'Microservices'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'irs-grant-management-system',
        projectRef: 'IRS Grant Management System',
        company: 'EastBanc Technologies',
        role: 'Technical Lead',
        timeframe: '2023 – 2024',
        accent: { primary: '#1E40AF' },
        hook: 'Technical Lead across the Discovery and MVP phases of a federal Grant Management System for the IRS, translating complex compliance requirements into a reactive service architecture.',
        tags: ['Kotlin', 'Java 17', 'JOOQ', 'Spring WebFlux'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
    {
        slug: 'from-copilot-to-colleague',
        projectRef: 'From Copilot to Colleague',
        company: 'AI Engineer Press',
        role: 'Co-Author',
        timeframe: '2026 – Present',
        accent: { primary: '#22D3EE' },
        hook: 'With Daniel Mohanrao. A source-anchored, evolving online book on AI engineering, where every claim links to the exact conference-talk video and timestamp it came from.',
        tags: ['AI Engineering', 'Source-Anchored Research', 'Open Access'],
        situation: '',
        problem: '',
        approach: [],
        pitfalls: [],
        outcome: '',
        lessons: [],
    },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyByProjectRef(projectRef: string): CaseStudy | undefined {
    return caseStudies.find((caseStudy) => caseStudy.projectRef === projectRef);
}

export function hasCaseStudyContent(caseStudy: CaseStudy): boolean {
    return caseStudy.situation.trim().length > 0 && caseStudy.problem.trim().length > 0;
}
