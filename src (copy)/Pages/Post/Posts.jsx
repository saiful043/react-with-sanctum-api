import {useEffect, useState } from "react";
// import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import Sidebar from "../Global/Sidebar";
import Header from "../Global/Header";

export default function Posts() {
    // const {name} = useContext(AppContext)
    const [posts, setPosts] = useState([])

    async function getPosts(){
        const res = await fetch('/api/posts')
        const data = await res.json()
        if(res.ok) {
            setPosts(data)
        }
    }
    useEffect(() => {
        getPosts();
    },[]);
    return (
        <>
        <div className="flex">
            <Sidebar/>
            <div className="w-full">
                <Header/>
                <main>
                    <h1 className="title">Latest Post </h1>
                    {posts.length > 0 ? posts.map(post => (

                        <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h2 className="font-bold text-2xl">{post.title}</h2>
                                    <small className="text-xs text-slate-600">Created by {post.user.name} on {new Date(post.created_at).toLocaleTimeString()}</small>
                                </div>
                                <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read more</Link>
                            </div>
                        <p>{post.body}</p>
                        </div>

                    )) : <p> There is no posts</p>}
                    </main>
            </div>
        </div>
        </>
    );
}