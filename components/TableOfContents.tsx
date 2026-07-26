
import React from 'react';
import { ContentBlock } from './BlogContent';

interface TableOfContentsProps {
    content: ContentBlock[];
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const headings: Heading[] = React.useMemo(() => {
        return content
            .filter((block: any) =>
                block._type === 'block' &&
                ['h1', 'h2', 'h3', 'h4'].includes(block.style)
            )
            .map((block: any) => ({
                id: `heading-${block._key}`,
                text: block.children
                    .filter((child: any) => child._type === 'span')
                    .map((span: any) => span.text)
                    .join(''),
                level: parseInt(block.style.charAt(1)),
            }));
    }, [content]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="space-y-1 text-sm">
            {headings.map((heading) => (
                <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block py-2 px-3 rounded-md transition-colors hover:bg-gray-100 ${heading.level > 2 ? `ml-${(heading.level - 2) * 4}` : ''
                        }`}
                >
                    {heading.text}
                </a>
            ))}
        </nav>
    );
};