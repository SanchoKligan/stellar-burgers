import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TOrdersState = {
  orders: TOrder[];
  exactOrder: TOrder | null;
  pending: {
    isPendingOrders: boolean;
    isPendingExactOrder: boolean;
  };
};

const initialState: TOrdersState = {
  orders: [],
  exactOrder: null,
  pending: {
    isPendingOrders: false,
    isPendingExactOrder: false
  }
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
        state.pending.isPendingOrders = true;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.pending.isPendingOrders = false;
        }
      )
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.pending.isPendingExactOrder = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.exactOrder = action.payload.orders[0];
        state.pending.isPendingExactOrder = false;
      });
  },
  selectors: {
    getOrdersStateSelector: (state) => state
  }
});

export const { getOrdersStateSelector } = ordersSlice.selectors;

export default ordersSlice.reducer;
