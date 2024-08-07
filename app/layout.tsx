import './globals.css'
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Timur Isachenko | Tech Lead | Solution Architect',
    description: 'Portfolio and full information about my work, passion, contributions, achievements, awards and hobbies',
}
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <div id="root">{children}</div>
        </body>
        </html>

    )
}