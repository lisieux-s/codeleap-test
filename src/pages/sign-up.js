import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Modal from "../components/modal"
import useUser from "../hooks/useUser";

export default function SignUp() {
    const navigate = useNavigate();

    const { storeUsername, removeUsername } = useUser();

    const [formData, setFormData] = useState({
        username: ''
    })
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (formData.username.length < 1) {
            setIsDisabled(true);
        } else {
            if (isDisabled) setIsDisabled(false);
        }
    }, [formData, isDisabled])

    function handleChange({ target }) {
        setFormData({
            ...formData, [target.name]: target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        storeUsername(formData.username);
        navigate('/');
    }

    return (

        <Modal enableOverlay={false}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>
                    Welcome to CodeLeap network!
                </h2>
                <p>
                    Please enter your username
                </p>
                <input
                    type='text'
                    name='username'
                    placeholder="John Doe"
                    value={formData.username}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <button
                    type='submit'
                    disabled={isDisabled}
                >
                    Enter
                </button>
            </form>
        </Modal>

    )
}
