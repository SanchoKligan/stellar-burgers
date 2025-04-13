import { FC } from 'react';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrdersSelector,
  getFeedInfoSelector,
  getFeeds
} from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const feed: TOrdersData = useSelector(getFeedInfoSelector);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
