import { Preloader } from '@ui';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useSelector((state) => state.userReducer);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
