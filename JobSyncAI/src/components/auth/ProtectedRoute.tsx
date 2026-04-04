import React, { type ReactNode } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  authenticationPath?: string;
}

/**
 * A route component that protects child routes by requiring user authentication.
 * If no active session exists, redirects unauthenticated users to the login page.
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to render when authenticated
 * @param {string} [props.authenticationPath='/login'] - The redirect path for unauthenticated users
 * @returns {JSX.Element} The children if authenticated, otherwise a Navigate component to the authentication path
 */
const ProtectedRoute = ({
  children,
  authenticationPath = '/login'
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { loading, session } = UserAuth(); // Assuming session exists if logged in

if (loading) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
       <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
    </div>
  );
}


  if (!session) {
    return <Navigate to={authenticationPath} replace state={{ from: location }} />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;