import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import Axios from '../utilz/Axios';

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
  edit: false,
};

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
  },
});

export default profileSlice.reducer;

export const { toggleProfileEdit } = profileSlice.actions;
