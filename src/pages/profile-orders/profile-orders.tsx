import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getOrders, getOrdersStateSelector } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const {
    orders,
    pending: { isPendingOrders: isPending }
  } = useSelector(getOrdersStateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isPending) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
