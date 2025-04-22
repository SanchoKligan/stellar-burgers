import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

type TError = {
  loginError: string | undefined;
  registerError: string | undefined;
  updateError: string | undefined;
};

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: TError;
  isPending: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  error: {
    loginError: undefined,
    registerError: undefined,
    updateError: undefined
  },
  isPending: false
};

export const getUser = createAsyncThunk(
  'user/get',
  async () => await getUserApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const responceData = await registerUserApi(data);

    setCookie('accessToken', responceData.accessToken);
    localStorage.setItem('refreshToken', responceData.refreshToken);

    return responceData.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const responceData = await loginUserApi(data);

    setCookie('accessToken', responceData.accessToken);
    localStorage.setItem('refreshToken', responceData.refreshToken);

    return responceData.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  deleteCookie('accessToken');
  localStorage.clear();
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData, { dispatch }) => {
    await updateUserApi(data);

    dispatch(getUser());
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isPending = false;
        state.error.registerError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error.registerError = undefined;
      })
      .addCase(loginUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isPending = false;
        state.error.loginError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error.loginError = undefined;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isPending = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isPending = false;
        state.error.updateError = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isPending = false;
      });
  }
});

export const { authChecked } = userSlice.actions;

export default userSlice.reducer;
