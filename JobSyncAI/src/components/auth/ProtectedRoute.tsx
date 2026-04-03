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
 * 
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 * 
 * @example
 * ```tsx
 * <ProtectedRoute authenticationPath="/auth/signin">
 *   <AdminPanel />
 * </ProtectedRoute>
 * ```
 */
const ProtectedRoute = ({ 
  children, 
  authenticationPath = '/login' 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { session } = UserAuth(); // Assuming session exists if logged in

  // If there is no session, boot them to the login page
  if (!session) {
    return <Navigate to={authenticationPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;