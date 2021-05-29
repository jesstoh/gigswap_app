import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  talents: [],
  status: 'idle',
  error: null,
  activeTalent: { talent: null, status: 'idle', error: null },
};

export const fetchTalents = createAsyncThunk(
  'talents/fetchTalents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/talents/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update talent favourite list when fetch for login talent success
    builder.addCase(fetchTalents.fulfilled, (state, action) => {
      state.talents = action.payload;
      state.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchTalents.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when not found
    builder.addCase(fetchTalents.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
  },
});

export default talentsSlice.reducer;
