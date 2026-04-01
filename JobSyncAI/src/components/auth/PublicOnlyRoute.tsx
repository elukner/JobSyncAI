import React, { type ReactNode } from 'react'
import { UserAuth } from '../../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

interface PublicOnlyRouteProps {
  children: ReactNode;
  authenticationPath?: string;
}

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