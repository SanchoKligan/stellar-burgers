import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { ProtectedRouteProps } from './type';
import { getUserStateSelector } from '@slices';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useSelector(getUserStateSelector);
  const location = useLocation();
  const isPathForAuthorized = location.pathname.includes('/profile');

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user && isPathForAuthorized) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (user && !isPathForAuthorized) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
