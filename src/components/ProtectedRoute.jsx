import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { state } = useAuth();

  if(state.loading)
    return <div>Checking Auth</div>;

  return state.isLoggedIn ? <Outlet></Outlet> : navigate("/login");
};

export default ProtectedRoute;
