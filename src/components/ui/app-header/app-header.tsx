import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

enum LinkNumbers {
  Constructor = 1,
  Feed = 2,
  Profile = 3
}

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();
  let linkNumber = 0;

  if (pathname === '/' || pathname.includes('/ingredients')) {
    linkNumber = LinkNumbers.Constructor;
  } else if (pathname.includes('/feed')) {
    linkNumber = LinkNumbers.Feed;
  } else if (pathname.includes('/profile')) {
    linkNumber = LinkNumbers.Profile;
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            className={`${styles.link} ${
              linkNumber === LinkNumbers.Constructor ? styles.link_active : ''
            }`}
            to='/'
          >
            <BurgerIcon
              type={
                linkNumber === LinkNumbers.Constructor ? 'primary' : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            className={`${styles.link} ${
              linkNumber === LinkNumbers.Feed ? styles.link_active : ''
            }`}
            to='/feed'
          >
            <ListIcon
              type={linkNumber === LinkNumbers.Feed ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <Link
            className={`${styles.link} ${
              linkNumber === LinkNumbers.Profile ? styles.link_active : ''
            }`}
            to='/profile'
          >
            <ProfileIcon
              type={
                linkNumber === LinkNumbers.Profile ? 'primary' : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
