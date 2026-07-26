import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { TypedObject } from '@portabletext/types';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState, useEffect } from 'react';

// Define the structure of the image block
export interface ImageBlock {
  _type: 'image';
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
  customSize?: {
    width: number;
    height: number;
  };
}

// Define the structure of the code block
export interface CodeBlock {
  _type: 'code';
  code: string;
  language?: string;
  filename?: string;
}

// Define the structure of the block content
export type ContentBlock = TypedObject;

interface BlogContentProps {
  content: ContentBlock[];
}

const builder = imageUrlBuilder(client);

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  console.log(isClient);

  const components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: ImageBlock }) => {
        const { asset, alt, caption, customSize } = value;
        const imageUrl = builder.image(asset).url();
        if (!imageUrl) {
          return (
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="text-red-500">Image not available</p>
              <p className="text-sm text-gray-600">Alt text: {alt || 'No alt text provided'}</p>
            </div>
          );
        }

        return (
          <figure className="my-8">
            <div className="relative w-full" >
              <Image
                src={imageUrl}
                alt={alt || ''}
                width={customSize?.width || 800}
                height={customSize?.height || 600}
                className="rounded-lg"
              />
            </div>
            {caption && <figcaption className="text-center text-sm mt-2 text-gray-600">{caption}</figcaption>}
          </figure>
        );
      },
      code: ({ value }: { value: CodeBlock }) => (
        <div className="my-4">
          {value.filename && (
            <div className="bg-gray-200 px-4 py-2 rounded-t-md text-sm font-mono">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={dracula}
            className="rounded-b-md"
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
    block: {
      h1: ({ children, value }) => {
        const _key = (value as any)._key;
        return <h1 id={`heading-${_key}`} className="text-4xl font-bold my-4">{children}</h1>;
      },
      h2: ({ children, value }) => {
        const _key = (value as any)._key;
        return <h2 id={`heading-${_key}`} className="text-3xl font-bold my-3">{children}</h2>;
      },
      h3: ({ children, value }) => {
        const _key = (value as any)._key;
        return <h3 id={`heading-${_key}`} className="text-2xl font-bold my-2">{children}</h3>;
      },
      h4: ({ children, value }) => {
        const _key = (value as any)._key;
        return <h4 id={`heading-${_key}`} className="text-xl font-bold my-2">{children}</h4>;
      },
      normal: ({ children }) => <p className="my-4">{children}</p>,
      blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => <code className="bg-gray-100 rounded px-1">{children}</code>,
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="text-blue-500 hover:underline">
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{children}</li>,
      number: ({ children }) => <li className="mb-1">{children}</li>,
    },
  };

  return <PortableText value={content} components={components} />;
};

export default BlogContent;
