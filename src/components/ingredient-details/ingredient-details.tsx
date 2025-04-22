import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

type IngredientParams = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<IngredientParams>();

  const ingredientData: TIngredient | undefined = useSelector(
    (state) => state.ingredientsReducer.ingredients
  ).find((el) => el._id == id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
