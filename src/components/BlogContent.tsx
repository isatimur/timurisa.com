'use client'

import React from 'react'

export interface ContentBlock {
    _type: string
    style?: string
    children?: Array<{ text: string }>
    [key: string]: any
}

export interface BlogContentProps {
    content?: ContentBlock[]
}

export const BlogContent: React.FC<BlogContentProps> = ({ content = [] }) => {
    if (!content || !content.length) {
        return <p className="text-slate-400 font-light">No content available.</p>
    }

    return (
        <div className="space-y-6 text-slate-200 leading-relaxed">
            {content.map((block: ContentBlock, idx: number) => {
                if (block._type === 'block') {
                    const text = block.children ? block.children.map(c => c.text).join('') : ''
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')

                    if (block.style === 'h1') return <h1 id={id} key={idx} className="text-3xl font-extrabold text-white mt-8 mb-4">{text}</h1>
                    if (block.style === 'h2') return <h2 id={id} key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{text}</h2>
                    if (block.style === 'h3') return <h3 id={id} key={idx} className="text-xl font-semibold text-cyan-300 mt-4 mb-2">{text}</h3>

                    return <p key={idx} className="text-slate-300 font-light leading-relaxed">{text}</p>
                }
                return null
            })}
        </div>
    )
}

export default BlogContent
