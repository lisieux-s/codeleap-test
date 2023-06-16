import { useContext } from "react";

import { UserContext } from "../contexts/userContext";

export default function useUser() {
    const userContext = useContext(UserContext);
    return userContext;
}
