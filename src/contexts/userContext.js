import { useState, createContext } from 'react';

export const UserContext = createContext(null)

const localUsername = localStorage.getItem('code-leap-network-username')

export function UserProvider({ children }) {
    const [username, setUsername] = useState(localUsername)

    function storeUsername(username) {
        localStorage.setItem('code-leap-network-username', username)
        setUsername(username);
    }

    function removeUsername() {
        setUsername(null)
    }


    return(
        <UserContext.Provider value={{ username, storeUsername, removeUsername }}>
            {children}
        </UserContext.Provider>
    )
}
