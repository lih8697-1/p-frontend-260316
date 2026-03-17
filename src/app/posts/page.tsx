"use client"

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function List() {

    const [posts, setPosts] = useState<PostDto[]>([]);

    useEffect(() => {
        fetchApi(`/api/v1/posts`)
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