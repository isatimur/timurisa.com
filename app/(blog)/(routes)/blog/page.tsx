"use client"
import {useRouter} from "next/navigation";

export default function BlogPage() {

    const router = useRouter();

    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">Talk and Practice | Passion to code</h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Professional blog about interesting topics
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">

            </div>

        </div>

    )
}
