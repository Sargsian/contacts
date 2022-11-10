import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const RequireAuth = () => {
  const authorized = useAppSelector((state) => state.auth.email);
  const location = useLocation();

  return authorized ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
