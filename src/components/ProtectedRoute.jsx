import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { UnAuthorized } from '../pages/UnAuthorizedPage';

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (state.loading) {
    return <div>Checking Auth...</div>; // Display loading indicator while authentication status is being checked
  }
/// if user is logged out show unauthorised
  if (!state.isLoggedIn) {
    return UnAuthorized();
  }

  return <Outlet />; 
};

export default ProtectedRoute;
