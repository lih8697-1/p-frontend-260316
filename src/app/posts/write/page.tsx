"use client"

import { get } from "http";
import { useRouter } from "next/navigation";

export default function wirte() {

    const router = useRouter();

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title;
        const content = form.content;

        if (title.value.length === 0) {
            alert("제목을 입력해 주세요.");
            title.focus();
            return;
        }

        if (content.value.length === 0) {
            alert("내용을 입력해 주세요.");
            content.focus();
            return;
        }

        // DB에 저장
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "title": title.value,
                "content": content.value
            })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.msg);
                // 글 상세 페이지로 이동
                router.push(`/posts/${data.data.postDto.id}`)
            });
    }

    return (
        <>
            <h1>글 작성</h1>
            <form action="" onSubmit={onSubmitHandler} className="flex flex-col gap-4">
                <input type="text" name="title" className="border-1 rounded p-2" placeholder="제목을 입력해 주세요." />
                <textarea rows={10} name="content" className="border-1 rounded p-2" placeholder="내용을 입력해 주세요."></textarea>
                <input type="submit" value="작성" className="border-1 rounded p-2" />
            </form>
        </>
    );
}