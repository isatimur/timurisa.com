import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const FloatingButton = () => {
    return (
        <div className="floating-button">
            <Link href="/blog">
                <div className="block">
                    <Image width="48" height="48" src="/assets/blog-svgrepo-com.svg"  alt="Go to Blog"/>
                    <span className="tooltip">Go to Blog</span>
                </div>
            </Link>
        </div>
    );
};

export default FloatingButton;
