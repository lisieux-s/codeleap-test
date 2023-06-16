import { useState, useEffect } from "react"

import useUser from "../hooks/useUser"
import * as api from '../actions/api'

export default function CreatePost() {
    const { username } = useUser();
    const [formData, setFormData] = useState({
        username: username,
        title: '',
        content: '',
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormDisabled, setIsFormDisabled] = useState(false)

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

    async function handleSubmit(e) {
        e.preventDefault();
        setIsFormDisabled(true);
        try {
            await api.createPost(formData);
            setFormData({
                ...formData,
                title: '',
                content: '',
            })
            setIsFormDisabled(false);
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h2>
                What's on your mind?
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
                placeholder="John Doe"
                value={formData.content}
                onChange={(e) => {
                    handleChange(e);
                }}
                disabled={isFormDisabled}
            />
            <button
                type="submit"
                disabled={isButtonDisabled}
            >
                Create</button>
        </form>
    )
}
