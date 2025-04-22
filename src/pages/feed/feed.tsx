import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { getFeeds } from '@slices';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(
    (state) => state.feedReducer.feed.orders
  );
  const { isPending } = useSelector((state) => state.feedReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (!orders.length || isPending) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
