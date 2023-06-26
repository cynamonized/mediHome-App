import React, {useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firestore";

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (authUser)=>{
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
    },[]);

    return <div>Auth Details</div>>
}