'use client'

import React from 'react'

export interface TableOfContentsProps {
    content?: any[]
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content = [] }) => {
    const headings = content
        ? content.filter((block: any) => block._type === 'block' && ['h1', 'h2', 'h3', 'h4'].includes(block.style))
        : []

    if (!headings.length) {
        return <p className="text-xs text-slate-500 font-mono">No section headings found.</p>
    }

    return (
        <ul className="space-y-2 text-sm font-mono text-slate-300 border-l border-slate-800 pl-4">
            {headings.map((heading: any, idx: number) => {
                const text = heading.children ? heading.children.map((c: any) => c.text).join('') : 'Section'
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return (
                    <li key={idx} className="hover:text-cyan-400 transition-colors">
                        <a href={`#${id}`}>{text}</a>
                    </li>
                )
            })}
        </ul>
    )
}

export default TableOfContents
