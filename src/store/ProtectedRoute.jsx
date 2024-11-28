// src/components/ProtectedRouteWrapper.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';  // Assuming you have the useAuth hook

const ProtectedRouteWrapper = ({ children }) => {
  const { user } = useAuth();  // Access the authentication state

  if (!user) {
    // If there's no user (i.e., the user is not logged in), redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children (protected route content)
  return <>{children}</>;
};

export default ProtectedRouteWrapper;
