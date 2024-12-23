'use client';

import React from 'react';
import { NavBar } from '@/components/NavBar';

export default function PrivacyPolicyPage() {
    const formattedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <NavBar />
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg">
                    <p>Last updated: {formattedDate}</p>
                    
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information Collection and Use</h2>
                    <p>We collect several different types of information for various purposes to provide and improve our service to you:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Usage Data (automatically collected)</li>
                        <li>Personal Data (voluntarily provided)</li>
                        <li>Cookies and Tracking Data</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Data</h2>
                    <p>We use the collected data for various purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>To provide and maintain our Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To provide customer support</li>
                        <li>To gather analysis or valuable information</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Analytics</h2>
                    <p>We use Google Analytics to monitor and analyze the use of our website. Google Analytics is a web analytics service that tracks and reports website traffic. The data collected includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Pages visited</li>
                        <li>Time spent on pages</li>
                        <li>Geographic location</li>
                        <li>Device information</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Security</h2>
                    <p>The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data.</p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>By email: [Your Email]</li>
                        <li>By visiting our contact page: <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a></li>
                    </ul>
                </div>
            </main>
        </div>
    );
} 