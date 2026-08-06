import { Chrome, Apple, Globe, Smartphone, Github, type LucideIcon } from 'lucide-react';

export type PlatformType = 'web' | 'chrome' | 'ios' | 'android' | 'github';

export const PLATFORM_ICONS: Record<PlatformType, LucideIcon> = {
    web: Globe,
    chrome: Chrome,
    ios: Apple,
    android: Smartphone,
    github: Github,
};
