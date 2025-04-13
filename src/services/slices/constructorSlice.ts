import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id }
        };
      }
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type !== 'bun') {
        state.ingredients = state.ingredients.filter(
          (el) => el._id !== action.payload._id
        );
      }
    }
  }
});

export const reducer = constructorSlice.reducer;
export const { addIngredient } = constructorSlice.actions;
