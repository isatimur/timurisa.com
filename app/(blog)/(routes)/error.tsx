"use client";

import { Empty } from "../../../src/components/Empty";

const Error = () => {
    return (
        <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
            <Empty label="Something went wrong." />
        </div>
    );
};

export default Error;
