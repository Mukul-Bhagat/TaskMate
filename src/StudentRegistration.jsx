import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
// Correcting the import paths to be absolute from the project root
import { doSignInWithGoogle } from "/src/firebase/auth.js"; 
import { useAuth } from "/src/context/authContext/Index.jsx";


export default function StudentRegistration() {
    // Hooks must be called at the top level of the component
    const { userLoggedIn } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState(null);

    // This function now correctly handles the sign-in process for students
    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setError(null);
            try {
                // --- THIS IS THE KEY CHANGE ---
                // We now pass 'student' as the role when signing in.
                await doSignInWithGoogle('student');
                // The AuthProvider will automatically handle the redirect
            } catch (err) {
                console.error(err);
                setError("Sign in failed. Please try again.");
                setIsSigningIn(false);
            }
        }
    };

    // If the user is already logged in, redirect them immediately
    if (userLoggedIn) {
        return <Navigate to={'/student-dashboard'} replace={true} />;
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-white text-gray-900">
            <header className="border-b border-gray-200 w-full">
                <nav className="flex items-center justify-between p-4 md:px-6 max-w-screen-xl mx-auto w-full">
                    <Link to="/" className="flex items-center gap-3">
                        <svg className="h-8 w-8 text-sky-500" fill="currentColor" viewBox="0 0 48 48">
                           <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"></path>
                        </svg>
                        <h1 className="text-xl font-bold">TeachMate</h1>
                    </Link>
                    <Link to="/TeacherRegistration" className="rounded-md px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                        Teacher Sign-In
                    </Link>
                </nav>
            </header>

            <main className="flex-grow flex items-center justify-center w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Student Sign-In</h2>
                        <p className="mt-2 text-sm text-gray-600">Welcome! Please sign in to continue.</p>
                    </div>

                    <div className="mt-8">
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button
                            onClick={onGoogleSignIn}
                            disabled={isSigningIn}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                           <svg className="w-6 h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path><path fill="#EA4335" d="M12 5.16c1.56 0 2.95.53 4.04 1.58l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.59L5.84 9.43c.87-2.6 3.3-4.27 6.16-4.27z"></path></svg>
                            <span>{isSigningIn ? 'Signing In...' : 'Sign in with Google'}</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

