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
    console.log(response.data);
    return response.data;
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setFailedStatus(state, action) {
      state.status = 'failed';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...action.payload, status: 'success' };
    });
  },
});

export default authenticationSlice.reducer;

export const { setFailedStatus } = authenticationSlice.actions;
