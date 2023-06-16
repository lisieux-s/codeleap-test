import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../hooks/useUser";
import { Modal, Post, PostForm } from "../components"
import * as api from '../actions/api';

export default function Main() {
    const navigate = useNavigate();

    const { removeUsername } = useUser();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)

    useEffect(() => {
        loadPosts();
    }, []);

    setInterval(() => {
        loadPosts();
    }, 60000);

    useEffect(() => {
    }, [isEditModalOpen])

    function checkForUser() {
        if (!localStorage.getItem('code-leap-network-username')) navigate('/sign-up');
    }

    async function loadPosts() {
        try {
            const { data } = await api.getPosts();
            setPosts(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    function renderEditPostModal() {
        return (
            <Modal enableOverlay>
                <PostForm
                    type='edit'
                    post={selectedPost}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            </Modal>
        )
    }

    async function handleDelete(e) {
        e.preventDefault();
        try {
            await api.deletePost(selectedPost.id);
            setIsDeleteModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    function handleLogout() {
        removeUsername();
        navigate('/sign-up')
    }

    function renderDeletePostModal() {
        return (
            <Modal enableOverlay>
                <form>
                    <h2>
                        Are you sure you want to delete this item?
                    </h2>
                    <div className="buttons">
                        <button
                            type='cancel'
                            onClick={(e) => {
                                e.preventDefault();
                                setIsDeleteModalOpen(false)
                            }}>
                            Cancel
                        </button>
                        <button
                            type='button'
                            className="delete"
                            onClick={(e) => handleDelete(e)}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </Modal>
        )
    }

    checkForUser();


    return (
        <>
            {isEditModalOpen ? renderEditPostModal() : ''}
            {isDeleteModalOpen ? renderDeletePostModal() : ''}
            <main>
                <header className="title">
                    <h2>
                        CodeLeap Network
                    </h2>
                    <button
                    type='button'
                    onClick={() => {
                        handleLogout();
                    }}
                    >
                        Logout
                    </button>
                </header>

                <div>
                    <PostForm type='create' />
                    {
                        posts ?
                            posts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        post={post}
                                        setIsEditModalOpen={setIsEditModalOpen}
                                        setSelectedPost={setSelectedPost}
                                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                                    />
                                )
                            })
                            : ''
                    }
                </div>
            </main>
        </>
    )
}
