import React, { useContext, useState, useEffect } from "react";
// Correcting the import path to be more standard for modern bundlers
import { auth } from "../../firebase/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // FIX: Corrected all instances of 'userState' to 'useState' and fixed typos in state variable names.
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            // FIX: Corrected setter function names and boolean value 'true'
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        // FIX: Corrected setter function name
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn, // FIX: Corrected variable name to match state
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

