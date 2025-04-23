import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  getUserStateSelector,
  getConstructorStateSelector,
  orderBurger
} from '@slices';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    getConstructorStateSelector
  );
  const { isAuthenticated } = useSelector(getUserStateSelector);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(order));
  };

  //TODO: разобраться
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
