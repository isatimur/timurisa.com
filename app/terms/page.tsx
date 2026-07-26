'use client';

import React from 'react';
import { NavBar } from '@/components/NavBar';

export default function TermsPage() {
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <NavBar />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <div className="prose prose-lg">
                    <p>Last updated: {formattedDate}</p>
                    
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
                    <p>By accessing this website, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
                    <p>All content published and made available on our site is the property of Timur Isachenko and our licensors. This includes, but is not limited to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Books and educational materials</li>
                        <li>Blog posts and articles</li>
                        <li>Source code and examples</li>
                        <li>Images and graphics</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. User License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Timur Isachenko's website for personal, non-commercial transitory viewing only.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Contributions</h2>
                    <p>Users may post comments and other content provided that the content:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Is not illegal, obscene, threatening, or defamatory</li>
                        <li>Does not violate third-party rights</li>
                        <li>Does not contain viruses or malicious code</li>
                        <li>Does not advertise or solicit</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer</h2>
                    <p>The materials on Timur Isachenko's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Implied warranties of merchantability</li>
                        <li>Fitness for a particular purpose</li>
                        <li>Non-infringement of intellectual property</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitations</h2>
                    <p>In no event shall Timur Isachenko or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Please review these terms periodically for changes.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Information</h2>
                    <p>If you have any questions about these Terms, please contact us through our <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.</p>
                </div>
            </main>
        </div>
    );
} 