// src/components/ProtectedRouteWrapper.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';  // Assuming you have the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();  // Access the authentication state
  if (!state.user) {
    // If there's no user (i.e., the user is not logged in), redirect to the login page
    return <Navigate to="/login" replace />;
  }
  // If the user is authenticated, render the children (protected route content)
  console.log(children)
  return (<div>
    {children}
  </div>);
};

export default ProtectedRoute;
