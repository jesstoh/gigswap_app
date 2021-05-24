import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isHirer: false,
  isAdmin: false,
  user: null,
  status: 'idle',
};

export const checkAuth = createAsyncThunk(
  'authentication/checkAuth',
  async () => {
    const accessToken = localStorage.getItem('access');
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/`,
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    // console.log(response.data);
    return response.data;
  }
);

export const login = createAsyncThunk('authentication/login', async (data) => {
  const accessToken = localStorage.getItem('access');
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/login/`,
    data,
    { headers: { authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
});

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setFailedStatus(state, action) {
      state.status = 'failed';
    },
    logout(state, action) {
      return { ...initialState, status: 'failed' };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...action.payload, status: 'success' };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.isHirer = user.is_hirer;
      state.isAdmin = user.is_staff;
      state.user.username = user.username;
      state.status = 'fulfilled';
    });
  },
});

export default authenticationSlice.reducer;

export const { setFailedStatus, logout } = authenticationSlice.actions;
