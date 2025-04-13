import { TUser } from '@utils-types';
import { getUserApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

//TODO: разобраться с типизацией
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      });
  }
});

export const reducer = userSlice.reducer;
