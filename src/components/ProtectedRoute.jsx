import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';
import LoaderSpinner from './LoaderSpinner';
import { UnAuthorized } from "../pages/UnAuthorizedPage";


const ProtectedRoute = () => {
  const location = useLocation();
  const { state } = useAuth();

  if (state.loading) {
    return <LoaderSpinner/>
  }

if (!state.isLoggedIn) {
  if (location.pathname === "/") {
    return <LoaderSpinner />;
  }
  return <UnAuthorized/>;
}

  return <Outlet />; 
};

export default ProtectedRoute;
