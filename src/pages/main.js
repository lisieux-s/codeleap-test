import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, Post, CreatePost } from "../components"
import * as api from '../actions/api';

export default function Main() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts();
    }, []);

    setInterval(() => {
        loadPosts();
    }, 60000);

    function checkForUser() {
        if(!localStorage.getItem('code-leap-network-username')) navigate('/sign-up');
    }

    checkForUser();

    async function loadPosts() {
        try {
            const {data} = await api.getPosts();
            setPosts(data.results);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main>
            <header className="title">
                <h2>
                    CodeLeap Network
                </h2>
            </header>

            <div>
                <CreatePost />
                {
                    posts ?
                        posts.map((post) => {
                            return(
                                <Post
                                    key={post.id}
                                    username={post.username}
                                    title={post.title}
                                    content={post.content}
                                    created={post.created_datetime}
                                />
                            )
                        })
                    : ''
                }
            </div>
        </main>
    )
}
