import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json();
    console.log("hello");
    return NextResponse.json(data);
}