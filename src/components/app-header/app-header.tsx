import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { getUserStateSelector } from '@slices';

export const AppHeader: FC = () => {
  const { user } = useSelector(getUserStateSelector);

  return <AppHeaderUI userName={user?.name} />;
};
