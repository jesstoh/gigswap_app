import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isHirer: false,
  isAdmin: false,
  user: { username: '' },
  status: 'idle',
  error: null,
};

// Thunk to check authentication upon component mount based on access token in local storage
export const checkAuth = createAsyncThunk(
  'authentication/checkAuth',
  async () => {
    const accessToken = localStorage.getItem('access');
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/`,
      { headers: { authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  }
);

// Thunk to post login to api
export const login = createAsyncThunk('authentication/login', async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/login/`,
    data
  );
  localStorage.setItem('access', response.data.access);
  localStorage.setItem('refresh', response.data.refresh);
  return response.data;
});

// Thunk to register user by sending data to api
// export const register = createAsyncThunk(
//   'authentication/register',
//   async (data) => {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/register/`,
//       data
//     );
//     localStorage.setItem('access', response.data.access);
//     localStorage.setItem('refresh', response.data.refresh);
//     return response.data;
//   }
// );

export const register = createAsyncThunk(
  'authentication/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register/`,
        data
      );
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

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
      state.status = 'success';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.isHirer = user.is_hirer;
      state.isAdmin = user.is_staff;
      state.user.username = user.username;
      state.status = 'success';
    });
    builder.addCase(register.rejected, (state, action) => {});
  },
});

export default authenticationSlice.reducer;

export const { setFailedStatus, logout } = authenticationSlice.actions;
