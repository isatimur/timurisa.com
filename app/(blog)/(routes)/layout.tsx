import '../../globals.css'
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Timur Isachenko | Tech Lead | Solution Architect',
    description: 'Technical Blog - Passion to code',
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