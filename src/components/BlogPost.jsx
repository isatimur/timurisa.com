import Image from "next/image";
import React from "react";
const BlogPost = ({title, content, imageUrl, tags, author, date}) => {
    return (
        <article className="blog-post justify-center">
            <header className="blog-post-header">
                <h1>{title}</h1>
                <div className="blog-post-meta">
                    <span>{date}</span>
                    {tags.map(tag => <span key={tag} className="blog-post-tag">{tag}</span>)}
                </div>
                <figure className="blog-post-media">
                    <Image width="100%" height="100%" src={imageUrl} alt={title}/>
                </figure>
            </header>
            <div className="blog-post-content" dangerouslySetInnerHTML={{__html: content}}/>
            <footer className="blog-post-footer">
                <span>Written by: {author}</span>
            </footer>
        </article>
    );
};

export default BlogPost;
