import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  summary: null,
  users: null,
  status: 'idle',
  error: null,
};

// Fetch app summary
export const fetchAdminDashboard = createAsyncThunk(
  'admins/fetchAdminDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admins/dashboard/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Fetch users list
export const fetchUsers = createAsyncThunk(
  'admins/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admins/users/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminDashboard.fulfilled, (state, action) => {
      state.summary = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchAdminDashboard.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAdminDashboard.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
  },
});

export default adminsSlice.reducer;