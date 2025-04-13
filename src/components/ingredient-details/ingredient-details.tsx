import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { getIngredients } from '../../services/slices/ingredientsSlice';

type IngredientParams = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<IngredientParams>();
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  const ingredientData: TIngredient | undefined = useSelector(
    (state) => state.ingredientsReducer.ingredients
  ).find((el) => el._id == id);

  useEffect(() => {
    if (!background) {
      dispatch(getIngredients());
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
