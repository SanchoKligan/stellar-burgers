import { TOrder, TOrdersData } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TOrdersState = {
  orders: TOrder[];
  exactOrder: TOrder | null;
  isPendingOrders: boolean;
  isPendingOrderByNumber: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  exactOrder: null,
  isPendingOrders: false,
  isPendingOrderByNumber: false
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
      .addCase(getOrders.pending, (state) => {
        state.isPendingOrders = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isPendingOrders = false;
        }
      )
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isPendingOrderByNumber = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.exactOrder = action.payload.orders[0];
        state.isPendingOrderByNumber = false;
      });
  }
});

export default ordersSlice.reducer;
