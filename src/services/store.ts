import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { reducer as feedReducer } from './slices/feed-slice';
import { reducer as ingredientsReducer } from './slices/ingredients-slice';
import { reducer as constructorReducer } from './slices/constructor-slice';
import { reducer as userReducer } from './slices/user-slice';
import { reducer as ordersReducer } from './slices/orders-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  feedReducer,
  ingredientsReducer,
  constructorReducer,
  userReducer,
  ordersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
