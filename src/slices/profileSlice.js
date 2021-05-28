import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import Axios from '../utilz/Axios';

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
  edit: false,
  editStatus: 'idle',
  editError: null
};

// Fetching profile of talent
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Create profile
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/profile/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Edit profile
export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/profile/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Create slice for keeping profile of login in talent & hirer
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleProfileEdit(state, action) {
      state.edit = !state.edit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.profile = action.payload;
    });
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.editStatus = 'succeeded'
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      state.editStatus = 'failed'
      state.editError = action.payload.data.detail
    })
    builder.addCase(createProfile.pending, (state, action) => {
      state.editStatus = 'loading'
    })
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.edit = false
      state.editStatus = 'succeeded'
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.editStatus = 'failed'
      state.editError = action.payload.data.detail
    })
    builder.addCase(editProfile.pending, (state, action) => {
      state.editStatus = 'loading'
    })
  },
});

export default profileSlice.reducer;

export const { toggleProfileEdit } = profileSlice.actions;
