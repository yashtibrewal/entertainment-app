import { Outlet } from 'react-router-dom';
import { useAuth } from '../store/auth';
import LoaderSpinner from './LoaderSpinner';

const ProtectedRoute = () => {
  const { state } = useAuth();

  if (state.loading) {
    return <LoaderSpinner/>
  }
/// if user is logged out show unauthorised
  if (!state.isLoggedIn) {
    return <LoaderSpinner/>;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
