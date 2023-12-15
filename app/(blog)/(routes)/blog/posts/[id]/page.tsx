// import BlogPost from "../../../../../../src/components/BlogPost";
import React from "react";
import {getAllPosts, getPostById} from "../../../../../../lib/api";

export async function generateMetadata({
                                           params: {id},
                                       }: {
    params: { id: string };
}) {
    const { title } = await getPostById(id);
    return {
        title,
    };
}
export default async function Page({params: {id}}: { params: { id: string } }) {

    const {html, title, date} = await getPostById(id)

//     const postData = {
//         title: "Time is crucial to Dev - Local S3 File Storage Service via Minio",
//         content: `
// # Introduction
// Brief overview of Minio and its significance in the cloud storage landscape.
//
// ## Chapter 1: Understanding Minio
// ### What is Minio?
//         `,
//         imageUrl: "/assets/minio-blog.webp",
//         tags: ["java", "kotlin", "minio"],
//         author: "Timur Isachenko",
//         date: "Dec 15, 2023"
//     };

    // return (
    //     <div className=" flex flex-auto items-center justify-center">
    //         <BlogPost {...postData} />
    //     </div>
    // );
    return (
        <article>
            <h1>{title}</h1>
            <h4>{date}</h4>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </article>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id,
    }));
}