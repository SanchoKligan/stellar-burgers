import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';
import { useLocation } from 'react-router-dom';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => {
    const location = useLocation();
    const isNumberTitle =
      location.pathname.includes('/orders') ||
      location.pathname.includes('/feed');

    return (
      <>
        <div className={styles.modal}>
          <div className={styles.header}>
            <h3
              className={`${styles.title} text ${isNumberTitle ? 'text_type_digits-medium' : 'text_type_main-large'}`}
            >
              {title}
            </h3>
            <button className={styles.button} type='button'>
              <CloseIcon type='primary' onClick={onClose} />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        <ModalOverlayUI onClick={onClose} />
      </>
    );
  }
);
