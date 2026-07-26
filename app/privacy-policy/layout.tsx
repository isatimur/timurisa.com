import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Timur Isachenko',
    description: 'Privacy policy and data protection information for timurisa.com',
    alternates: {
        canonical: 'https://timurisa.com/privacy-policy',
    }
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
} 2 