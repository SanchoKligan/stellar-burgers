import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { TIngredient } from '@utils-types';
import { getIngredientsStateSelector } from '@slices';

type IngredientParams = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<IngredientParams>();
  const { ingredients } = useSelector(getIngredientsStateSelector);

  const ingredientData: TIngredient | undefined = ingredients.find(
    (el) => el._id == id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
