import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../hooks/useUser";
import { Modal, Post, PostForm } from "../components"
import * as api from '../actions/api';

import LOADING_GIF from '../icons/loading.gif'

export default function Main() {
    const navigate = useNavigate();

    const { username, removeUsername } = useUser();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState(null)

    const [blockedUsers, setBlockedUsers] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    setInterval(() => {
        loadPosts();
    }, 5000);

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

    async function handleDelete(e) {
        e.preventDefault();
        try {
            await api.deletePost(selectedPost.id);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    }

    function handleLogout() {
        removeUsername();
        navigate('/sign-up')
    }

    function handleBlock() {
        if (!blockedUsers.includes(selectedPost.username) && selectedPost.username !== username) setBlockedUsers([...blockedUsers, selectedPost.username])
        setIsBlockModalOpen(false);
    }

    function handleUnblock() {
        setBlockedUsers([]);
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
                                setIsDeleteModalOpen(false);
                            }}>
                            Cancel
                        </button>
                        <button
                            type='button'
                            className="red"
                            onClick={(e) => handleDelete(e)}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </Modal>
        )
    }

    function renderBlockModal(selectedUser) {
        return (
            <Modal enableOverlay>
                <div className="confirm-block">
                    <p>
                        {`Would you like to block ${selectedUser}? You won't see their posts anymore.`}

                    </p>
                    <p className="tiny">
                        This action can be undone by clicking  on the 'Unblock all users' button at the top of the page.
                    </p>
                    <div className="buttons">
                        <button className="cancel" onClick={() => setIsBlockModalOpen(false)}>Cancel</button>
                        <button
                            className="red"
                            onClick={() => handleBlock()}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

    checkForUser();


    return (
        <>
            {isEditModalOpen ? renderEditPostModal() : ''}
            {isDeleteModalOpen ? renderDeletePostModal() : ''}
            {isBlockModalOpen ? renderBlockModal() : ''}
            <main>
                <header className="title">
                    <h2>
                        CodeLeap Network
                    </h2>
                    <div>
                        <button type='button' className="unblock" onClick={() => handleUnblock()}>
                            Unblock all users
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div>
                    <PostForm type='create' />
                    {
                        posts.length > 0 ?
                            posts.map((post) => {
                                return (
                                    <Post
                                        key={post.id}
                                        post={post}
                                        setIsEditModalOpen={setIsEditModalOpen}
                                        setSelectedPost={setSelectedPost}
                                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                                        blockedUsers={blockedUsers}
                                        setIsBlockModalOpen={setIsBlockModalOpen}
                                    />
                                )
                            })
                            :
                            <div className="loading">Looking for new posts<img src={LOADING_GIF} alt='loading' /></div>

                    }
                </div>
            </main>
        </>
    )
}
