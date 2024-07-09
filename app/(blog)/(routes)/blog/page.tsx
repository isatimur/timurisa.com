import Link from 'next/link';
import { getAllPosts } from '../../../../lib/api';
import Image from "next/image";

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <aside className="relative text-center py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="relative text-5xl font-bold mb-4">Passion to Code</h1>
                <p className="relative text-lg">Sharing my journey and insights on coding, technology, and development.</p>
            </aside>
            <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {posts.map(post => {
                        const { id, date, title, short, image } = post;
                        return (
                            <div key={id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                                <Link href={`/blog/posts/${id}`}>
                                    <div className="block">
                                        <div className="h-80 mb-4 rounded-lg overflow-hidden">
                                            <img src={image} alt={title} className="w-full h-full object-cover"/>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h3>
                                        <p className="text-gray-500">{date}</p>
                                        <p className="text-gray-600 mt-4">{short}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <aside className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900">Java</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900">Kotlin</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900">Spring</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900">System Design</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-gray-900">Architecture</Link></li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">About the Author</h3>
                        <div className="flex items-center space-x-4">
                            <Image width="16" height="16" src="/assets/avatar-modified.jpg" alt="Author" className="w-16 h-16 rounded-full" />
                            <div>
                                <h4 className="text-lg font-semibold">Timur Isachenko</h4>
                                <p className="text-gray-500">Software Engineer</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mt-4">Timur Isachenko is a seasoned software engineer with a passion for Java and Kotlin. He has been developing enterprise-level applications for over a decade and is excited to share his knowledge and insights with the community.</p>
                    </div>
                </aside>
            </main>
        </div>
    );
}
