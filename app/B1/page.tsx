"use client"
import React, { useEffect, useState } from 'react';

async function getPost() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
}

export default function Page() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const postsData = await getPost();
            setPosts(postsData);
        }
        
        fetchData();
    }, []);

    return (
        <div>
            <p>Danh sach bai viet</p>
            <ul>
                {posts.map((post:any) => {
                    return <li key={post.id}>{post.title}</li> 
                })}
            </ul>
        </div>
    );
}
