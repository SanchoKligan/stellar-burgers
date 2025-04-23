import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TLoginData } from '@api';
import { useDispatch, useSelector } from '@store';
import { getUserStateSelector, loginUser } from '@slices';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isPending } = useSelector(getUserStateSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const data: TLoginData = {
      email: email,
      password: password
    };

    dispatch(loginUser(data));
  };

  if (isPending) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error.loginError || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
