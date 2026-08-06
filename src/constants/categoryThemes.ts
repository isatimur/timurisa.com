import {
    Cpu,
    Terminal,
    GraduationCap,
    RefreshCw,
    Landmark,
    Building2,
    Snowflake,
    Rocket,
    type LucideIcon,
} from 'lucide-react';

export type CategoryTheme = {
    accent: string;
    Icon: LucideIcon;
};

const DEFAULT_THEME: CategoryTheme = { accent: '#22D3EE', Icon: Rocket };

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
    'AI & Machine Learning': { accent: '#22D3EE', Icon: Cpu },
    'Developer Tools & AI Agents': { accent: '#F43F5E', Icon: Terminal },
    EdTech: { accent: '#8B5CF6', Icon: GraduationCap },
    'Enterprise Modernization': { accent: '#16A34A', Icon: RefreshCw },
    FinTech: { accent: '#F59E0B', Icon: Landmark },
    Government: { accent: '#1E40AF', Icon: Building2 },
    'Olympics & Infrastructure': { accent: '#38BDF8', Icon: Snowflake },
    'Side Projects & Tools': { accent: '#10B981', Icon: Rocket },
};

export function getCategoryTheme(category: string): CategoryTheme {
    return CATEGORY_THEMES[category] ?? DEFAULT_THEME;
}
