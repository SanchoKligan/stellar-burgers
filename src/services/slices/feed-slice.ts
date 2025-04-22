import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TFeedState = {
  feed: TOrdersData;
  isPending: boolean;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isPending: false
};

export const getFeeds = createAsyncThunk(
  'feed/get',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isPending = true;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.isPending = false;
        }
      );
  }
});

export default feedsSlice.reducer;
