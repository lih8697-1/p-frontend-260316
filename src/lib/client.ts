"use client"

// 선택적으로 사용할 때는 default 안 씀
export function fetchApi(url: string) {
    return fetch(url)
            .then(response => response.json());
}