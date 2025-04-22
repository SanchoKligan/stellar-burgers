import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getOrders } from '@slices';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { orders } = useSelector((state) => state.ordersReducer);
  const isPending = useSelector((state) => state.ordersReducer.isPendingOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isPending) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
