import Link from "next/link";
import {getAllPosts} from "../../../../lib/api.ts";

export default async function BlogPage() {

    const posts = await getAllPosts()

    return (
        <div>
            <h1>My blog</h1>

            <h2>All posts:</h2>
            <ul>
                {posts.map(post => {
                    const {id, date, title} = post
                    return (
                        <li key={id}>
                            <Link href={`/blog/posts/${id}`}>
                                {date} - {title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );

}
