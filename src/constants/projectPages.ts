import { projects } from './index';
import { getCaseStudyByProjectRef, hasCaseStudyContent, type CaseStudy } from './caseStudies';
import { getCategoryTheme } from './categoryThemes';
import type { PlatformType } from './platformIcons';

export type ProjectPlatform = {
    type: PlatformType;
    label: string;
    url: string;
};

export type ProjectRecord = {
    name: string;
    company_name: string;
    date: string;
    category: string;
    icon?: unknown;
    description: string;
    points: string[];
    tags: string[];
    platforms?: ProjectPlatform[];
};

const typedProjects = projects as unknown as ProjectRecord[];

function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function getProjectSlug(project: ProjectRecord): string {
    const caseStudy = getCaseStudyByProjectRef(project.name);
    return caseStudy ? caseStudy.slug : slugify(project.name);
}

export function getAllProjectSlugs(): string[] {
    return typedProjects.map((project) => getProjectSlug(project));
}

export type ProjectPageResolution =
    | { kind: 'case-study'; caseStudy: CaseStudy }
    | { kind: 'brief'; project: ProjectRecord };

export function resolveProjectPage(slug: string): ProjectPageResolution | null {
    const project = typedProjects.find((p) => getProjectSlug(p) === slug);
    if (!project) return null;

    const caseStudy = getCaseStudyByProjectRef(project.name);
    if (caseStudy && hasCaseStudyContent(caseStudy)) {
        return { kind: 'case-study', caseStudy };
    }
    return { kind: 'brief', project };
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    const d = max - min;
    if (d !== 0) {
        s = d / (1 - Math.abs(2 * l - 1));
        switch (max) {
            case r:
                h = ((g - b) / d) % 6;
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
        if (h < 0) h += 360;
    }
    return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h < 60) {
        r = c; g = x; b = 0;
    } else if (h < 120) {
        r = x; g = c; b = 0;
    } else if (h < 180) {
        r = 0; g = c; b = x;
    } else if (h < 240) {
        r = 0; g = x; b = c;
    } else if (h < 300) {
        r = x; g = 0; b = c;
    } else {
        r = c; g = 0; b = x;
    }
    const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Each project gets a color related to (but distinct from) its category's
 * base accent - a deterministic +/-18deg hue shift keyed on the project name,
 * so projects sharing a category are still visibly different from each other
 * without breaking the category's overall color identity.
 */
export function getProjectAccent(project: ProjectRecord): string {
    const base = getCategoryTheme(project.category).accent;
    const [h, s, l] = hexToHsl(base);
    const offset = (hashString(project.name) % 37) - 18;
    const newHue = (h + offset + 360) % 360;
    return hslToHex(newHue, s, l);
}
