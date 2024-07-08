import '../../globals.css';
import Link from 'next/link';

export const metadata = {
    title: 'Timur Isachenko | Tech Lead | Solution Architect',
    description: 'Technical Blog - Passion to code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gray-50 text-gray-800">
        <div>
            <header className="bg-white shadow-md py-4 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
                <div className="container mx-auto p-6 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">Timur Isa | Passion to code</Link>
                    <nav className="flex space-x-6">
                        <Link href="/blog">
                            <div className="block text-gray-600 hover:text-gray-900 text-lg">Blog</div>
                        </Link>
                        <Link href="/">
                            <div className="block text-gray-600 hover:text-gray-900 text-lg">Portfolio</div>
                        </Link>
                    </nav>
                </div>
            </header>
            <main>{children}</main>
            <footer className="bg-white shadow-md mt-10 py-4">
                <div className="container mx-auto p-6 text-center">
                    <p className="text-gray-600">© 2024 Timur Isachenko. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <Link href="https://www.linkedin.com/in/timur-isachenko/" className="text-gray-600 hover:text-gray-900">
                            <img src="/assets/iconmonstr-linkedin-3.svg" alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition-transform" />
                        </Link>
                        <a href="https://github.com/isatimur" className="text-gray-600 hover:text-gray-900">
                            <img src="/assets/iconmonstr-github-1.svg" alt="GitHub" className="w-6 h-6 hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}
