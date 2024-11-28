import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isLoggedIn)
      navigate("/login");
  })

  return state.isLoggedIn ? <Outlet></Outlet> : navigate("/login");
};

export default ProtectedRoute;
