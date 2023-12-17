import Image from "next/image";

interface BlogProps {
    label: string;
    url: string;
}

export const Blog = ({
                         label,
                         url
                     }: BlogProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image src="/assets/logo.svg" fill alt="Empty"/>
            </div>
            <p className="text-muted-foreground text-sm text-center">
                <a href={url}>{label}</a>
            </p>
        </div>
    );
};