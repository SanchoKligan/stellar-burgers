import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type TFeedState = {
  feed: TOrdersData;
};

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
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
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feed = action.payload;
    });
  }
});

export const reducer = feedsSlice.reducer;
