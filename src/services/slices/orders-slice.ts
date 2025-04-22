import { TOrder, TOrdersData } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TOrdersState = {
  orders: TOrder[];
  exactOrder: TOrder | null;
};

const initialState: TOrdersState = {
  orders: [],
  exactOrder: null
};

export const getOrders = createAsyncThunk(
  'orders/get',
  async () => await getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.exactOrder = action.payload.orders[0];
      });
  }
});

export const reducer = ordersSlice.reducer;
