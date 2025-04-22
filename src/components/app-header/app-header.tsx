import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '@store';

export const AppHeader: FC = () => {
  const userName = useSelector(
    (state: RootState) => state.userReducer.user?.name
  );

  return <AppHeaderUI userName={userName} />;
};
