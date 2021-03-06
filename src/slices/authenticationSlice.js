import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  isAuthenticated: false,
  isHirer: false,
  isAdmin: false,
  isProfileComplete: false,
  user: { username: '', id: '' },
  status: 'idle',
  error: null,
};

// Thunk to check authentication upon component mount based on access token in local storage
export const checkAuth = createAsyncThunk(
  'authentication/checkAuth',
  async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/api/auth/`
    );
    return response.data;
  }
);

// Thunk to post login to api
export const login = createAsyncThunk(
  'authentication/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/login/`,
        data
      );
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      // console.log({data, status})
      return rejectWithValue({ data, status });
    }
  }
);

// Thunk Send data to api for registering of user
export const register = createAsyncThunk(
  'authentication/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/register/`,
        data
      );
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
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
    setProfileComplete(state, action) {
      state.isProfileComplete = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      // console.log(action.payload);
      return { ...action.payload, status: 'succeeded', error: null };
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.isHirer = user.is_hirer;
      state.isAdmin = user.is_staff;
      state.user.username = user.username;
      state.user.isProfileComplete = user.is_profile_complete;
      state.user.id = user.id;
      state.status = 'succeeded';
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.isHirer = user.is_hirer;
      state.isAdmin = user.is_staff;
      state.user.username = user.username;
      state.user.id = user.id;
      state.status = 'succeeded';
    });
    builder.addCase(register.rejected, (state, action) => {
      //Only take first error data
      state.error = Object.values(action.payload.data)[0][0];
      // console.log(state.error)
    });
  },
});

export default authenticationSlice.reducer;

export const { setFailedStatus, logout, setProfileComplete } = authenticationSlice.actions;
