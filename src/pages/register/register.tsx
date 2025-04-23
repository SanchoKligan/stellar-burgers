import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getUserStateSelector, registerUser } from '@slices';
import { TRegisterData } from '@api';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isPending } = useSelector(getUserStateSelector);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const data: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    dispatch(registerUser(data));
  };

  if (isPending) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error.registerError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
