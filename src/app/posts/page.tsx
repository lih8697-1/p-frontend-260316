"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export interface Post {
    id: number,
    title: string,
    content: string
}

export default function Home() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            });
    }, []);

    return (
        // 로딩 중
        posts.length <= 0
            ? <div>로딩 중...</div>

            // 로딩 완료
            : <ul>
                {posts.map((post) => (
                    <li key={post.id} className="p-2">
                        <Link href={`/posts/${post.id}`}>{post.id}. {post.title}</Link>
                    </li>
                ))}
            </ul>
    );
}