import { Outlet, Navigate } from 'react-router-dom';

const AuthGuard = () => {
  // TODO: Replace with real auth check later
  const userToken = true;  // temporary auth check

  return userToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthGuard;