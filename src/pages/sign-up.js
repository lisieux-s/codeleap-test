import { useState, useEffect } from "react"

import Modal from "../components/modal"

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: ''
    })
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (formData.username.length < 1) {
            setIsDisabled(true)
        } else {
            if (isDisabled) setIsDisabled(false);
        }
    }, [formData, isDisabled])

    function handleChange({target}) {
        setFormData({
            ...formData, [target.name]: target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <Modal enableOverlay={false}>
                <form onSubmit={(e) => handleSubmit()}>
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
        </div>
    )
}
