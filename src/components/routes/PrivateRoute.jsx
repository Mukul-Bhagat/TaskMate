import React from 'react';
import { Navigate } from 'react-router-dom';
// Correcting the import path to be explicit for the bundler
import { useAuth } from '../../context/authContext/Index.jsx'; 

const PrivateRoute = ({ children }) => {
    const { userLoggedIn, loading } = useAuth();

    // While the authentication state is loading, don't render anything yet
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is logged in, render the component they are trying to access.
    // Otherwise, redirect them to the landing page.
    return userLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

