import { Compass, Apple, Globe, Smartphone, GitBranch, type LucideIcon } from 'lucide-react';

export type PlatformType = 'web' | 'chrome' | 'ios' | 'android' | 'github';

// lucide-react 1.x removed the brand icons Chrome and Github.
// Compass and GitBranch exist in 0.x and 1.x, so this file works with both.
export const PLATFORM_ICONS: Record<PlatformType, LucideIcon> = {
    web: Globe,
    chrome: Compass,
    ios: Apple,
    android: Smartphone,
    github: GitBranch,
};
