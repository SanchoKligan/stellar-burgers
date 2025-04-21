import { TIngredient, TConstructorIngredient, TOrder } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type TConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

// Второй элемент уходит наверх
const swapIngredients = (
  ingredients: TConstructorIngredient[],
  firstIdx: number,
  secondIdx: number
) => {
  const tempIngredient = ingredients[firstIdx];
  ingredients[firstIdx] = ingredients[secondIdx];
  ingredients[secondIdx] = tempIngredient;
};

export const orderBurger = createAsyncThunk(
  'burger/order',
  async (data: string[]) => await orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: { ...ingredient, id }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (el) => el.id !== action.payload.id
          );
      }
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      const idx = action.payload;
      if (idx !== 0) {
        swapIngredients(ingredients, idx - 1, idx);
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const ingredients = state.constructorItems.ingredients;
      const idx = action.payload;
      if (idx !== ingredients.length - 1) {
        swapIngredients(ingredients, idx, idx + 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      });
  }
});

export const reducer = constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} = constructorSlice.actions;
