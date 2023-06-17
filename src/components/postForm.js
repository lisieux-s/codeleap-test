import { useState, useEffect } from "react"

import useUser from "../hooks/useUser"
import * as api from '../actions/api'

export default function PostForm({
    type,
    post,
    setIsEditModalOpen
}) {
    const { username } = useUser();

    const [formData, setFormData] = useState({
        username: username,
        title: '',
        content: '',
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormDisabled, setIsFormDisabled] = useState(false)


    useEffect(() => {
        if (post) {
            setFormData({
                ...formData,
                title: post.title,
                content: post.content
            })
        }
    }, []);

    useEffect(() => {
        if (
            formData.title.length > 0
            && formData.content.length > 0
        ) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [formData, isButtonDisabled])


    function handleChange({ target }) {
        setFormData({
            ...formData, [target.name]: target.value
        });
    }

    function clearForm() {
        setFormData({
            ...formData,
            title: '',
            content: '',
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsFormDisabled(true);
        try {
            if (type === 'create') {
                await api.createPost(formData);
            }

            if (type === 'edit') {
                const result = await api.editPost(post.id,
                    {
                        title: formData.title,
                        content: formData.content
                    })
                console.log(result)

                setIsEditModalOpen(false);
            }

            clearForm();
            setIsFormDisabled(false);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h2>
                {
                    type === 'create' ? `What's on your mind, ${username}?`
                        : 'Edit Item'
                }
            </h2>
            <p>
                Title
            </p>
            <input
                type='text'
                name='title'
                placeholder="Hello world"
                value={formData.title}
                onChange={(e) => {
                    handleChange(e);
                }}
                disabled={isFormDisabled}
            />
            <p>
                Content
            </p>
            <textarea
                type='text'
                name='content'
                placeholder="Content here"
                value={formData.content}
                onChange={(e) => {
                    handleChange(e);
                }}
                disabled={isFormDisabled}
            />
            <div className="buttons">
                {
                    type === 'edit' ?
                        <button
                            type="cancel"
                            className="cancel"
                            onClick={() => {
                                clearForm();
                                setIsEditModalOpen(false);
                            }}
                        >
                            Cancel
                        </button>
                        : ''
                }
                {
                    type === 'create' ?
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                        >
                            Create
                        </button>
                        :
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className="green"
                        >
                            Save
                        </button>
                }
            </div>
        </form>
    )
}
