import React from 'react';
import Image from "next/image";

const FloatingButtonPortfolio = () => {
    return (
        <div className="floating-button">
            <a href="/" className="block">
                <Image width="48" height="48" src="/assets/laptop-svgrepo-com.svg" alt="Go to Portfolio"/>
                <span className="tooltip">Go to Portfolio</span>

            </a>
        </div>
    );
};

export default FloatingButtonPortfolio;
