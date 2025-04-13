import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type TFeedState = {
  feed: TOrdersData;
  loading: boolean;
  error: string | undefined;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: undefined
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
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      });
  },
  selectors: {
    getOrdersSelector: (state) => state.feed.orders,
    getFeedInfoSelector: (state) => state.feed
  }
});

export const reducer = feedsSlice.reducer;
export const { getOrdersSelector, getFeedInfoSelector } =
  feedsSlice.getSelectors();
