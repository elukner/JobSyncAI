import React, { type ReactNode } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

interface PublicOnlyRouteProps {
  children: ReactNode;
  authenticationPath?: string;
}

/**
 * A route component that restricts access to public pages for authenticated users.
 * 
 * If a user is already logged in (has an active session), they are redirected to the
 * authentication path (typically the dashboard). Otherwise, the public page content is rendered.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to render if the user is not authenticated
 * @param {string} [props.authenticationPath='/dashboard'] - The path to redirect authenticated users to
 * @returns {JSX.Element} Either a Navigate component redirecting authenticated users, or the children component
 */
const PublicOnlyRoute = ({ 
  children, 
  authenticationPath = '/dashboard'
}: PublicOnlyRouteProps) => {
  const location = useLocation();
  const { session } = UserAuth(); // Assuming session exists if logged in

  // If there is no session, boot them to the login page
  if (session) {
    return <Navigate to={authenticationPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;