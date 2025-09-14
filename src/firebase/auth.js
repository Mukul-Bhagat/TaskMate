// Using explicit relative paths and standard module resolution (without .js extension)
import { auth, provider } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserProfile } from "./database"; 

// This function now saves the user to the Realtime Database after sign-in
export const doSignInWithGoogle = async (role) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // After a successful sign-in, create their profile in the database with their role
    if (user) {
        await createUserProfile(user, role);
    }

    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

