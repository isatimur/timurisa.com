import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const FloatingButton = () => {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
            <Link href="/blog">
                <div className="floating-button-item">
                    <Image
                        width="48"
                        height="48"
                        src="/assets/blog-svgrepo-com.svg"
                        alt="Go to Blog"
                    />
                    <span className="tooltip">Blog</span>
                </div>
            </Link>
            <Link href="/book">
                <div className="floating-button-item">
                    <Image
                        width="48"
                        height="48"
                        src="/assets/book-computer-hardware-svgrepo-com.svg"
                        alt="Go to Books"
                    />
                    <span className="tooltip">Books</span>
                </div>
            </Link>
        </div>
    );
};

export default FloatingButton;
