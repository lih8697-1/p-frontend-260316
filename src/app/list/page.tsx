'use client';

import { useEffect, useState } from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/v1/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            });
    }, []);

    return (
        <ul>
            {posts.map((post: { id: number; title: string }) => (
                <li key={post.id} className="p-2">
                    {post.id} : {post.title}
                </li>
            ))}
        </ul>
    );
}