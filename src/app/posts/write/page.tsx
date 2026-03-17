"use client"

import { fetchApi } from "@/lib/client";
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

        if (title.value.length >= 10 || title.value.length < 2) {
            alert("2글자 이상 10자 미만으로 작성해주세요");
            title.focus();
            return;
        }

        if (content.value.length === 0) {
            alert("내용을 입력해 주세요.");
            content.focus();
            return;
        }

        if (content.value.length >= 100 || content.value.length < 2) {
            alert("2글자 이상 100자 미만으로 작성해주세요");
            content.focus();
            return;
        }

        // DB에 저장
        fetchApi(`/api/v1/posts`, {
            method: "POST",
            body: JSON.stringify({
                "title": title.value,
                "content": content.value
            })
        })
            .then(rs => {
                alert(rs.msg);
                // 글 상세 페이지로 이동
                router.replace(`/posts/${rs.data.postDto.id}`)
            });
    }

    return (
        <>
            <h1>글 작성</h1>
            <form action="" onSubmit={onSubmitHandler} className="flex flex-col gap-4">
                <input
                    className="border border-gray-300 rounded p-2"
                    type="text"
                    name="title"
                    placeholder="제목"
                />
                <textarea
                    className="border border-gray-300 rounded p-2"
                    name="content"
                    placeholder="내용"
                />
                <button className="bg-blue-500 text-white p-2 rounded" type="submit">
                    저장
                </button>
            </form>
        </>
    );
}