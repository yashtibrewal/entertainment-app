import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (state.loading) {
    return <div>Checking Auth...</div>; // Display loading indicator while authentication status is being checked
  }
/// if user is logged out show unauthorised
  if (!state.isLoggedIn) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized</h1>
        <p>You do not have access to this page. Please log in.</p>
      </div>
    );
  }

  return <Outlet />; 
};

export default ProtectedRoute;
