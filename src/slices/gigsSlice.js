import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  gigs: [],
  status: 'idle',
  error: null,
};

export const fetchGigs = createAsyncThunk('gigs/fetchGigs', async () => {
  const response = await Axios.get(`${process.env.REACT_APP_API_URL}/api/gigs/`);
  return response.data
});

const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update gigs state when fetchGigs success
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
    //   console.log(action.payload);
      state.gigs = action.payload;
      state.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when fetchGigs rejected
    builder.addCase(fetchGigs.rejected, (state, action) => {
      state.status = 'failed';
      // Change it to other content later
      state.error = action.error.message;
    });
  },
});

export default gigsSlice.reducer;
