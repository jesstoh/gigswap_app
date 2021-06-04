import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  summary: null,
  users: null,
  status: 'idle',
  error: null,
  gigs: [],
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

// Deactivate user
export const deactivateUser = createAsyncThunk(
  'admins/deactivateUser',
  async ({ isHirer, userId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/admins/users/${userId}/deactivate/`
      );
      return { data: response.data, userId, isHirer };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Activate user
export const activateUser = createAsyncThunk(
  'admins/activateUser',
  async ({ isHirer, userId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/admins/users/${userId}/activate/`
      );
      return { data: response.data, userId, isHirer };
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Fetch gigs
export const fetchAdminGigs = createAsyncThunk(
  'admins/fetchAdminGigs',
  async ({ active }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/admins/gigs/?active=${active}`
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
    builder.addCase(deactivateUser.fulfilled, (state, action) => {
      const { isHirer, userId } = action.payload;
      let index;
      if (isHirer) {
        index = state.users.hirers.findIndex((hirer) => hirer.id === userId);
        state.users.hirers[index].is_active = false;
      } else {
        index = state.users.talents.findIndex((talent) => talent.id === userId);
        state.users.talents[index].is_active = false;
      }
    });
    builder.addCase(activateUser.fulfilled, (state, action) => {
      const { isHirer, userId } = action.payload;
      let index;
      if (isHirer) {
        index = state.users.hirers.findIndex((hirer) => hirer.id === userId);
        state.users.hirers[index].is_active = true;
      } else {
        index = state.users.talents.findIndex((talent) => talent.id === userId);
        state.users.talents[index].is_active = true;
      }
    });
    builder.addCase(fetchAdminGigs.fulfilled, (state, action) => {
      state.gigs = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchAdminGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAdminGigs.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
  },
});

export default adminsSlice.reducer;
