import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  gigs: [],
  status: 'idle',
  error: null,
  errorCode: null,
  activeGig: { gig: null, status: 'idle', error: null, edit: false },
};

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({data, status})
    }
  }
);

export const fetchRecommendedGigs = createAsyncThunk(
  'gigs/fetchRecommendedGigs',
  async () => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_URL}/api/gigs/recommended/`
    );
    return response.data;
  }
);

export const fetchSingleGig = createAsyncThunk(
  'gigs/fetchSingleGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      console.log(err.response);
      return rejectWithValue({ data, status });
    }
  }
);

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
    builder.addCase(fetchSingleGig.pending, (state, action) => {
      state.activeGig.status = 'loading';
    });
    builder.addCase(fetchSingleGig.fulfilled, (state, action) => {
      state.activeGig.gig = action.payload;
      state.activeGig.status = 'succeeded';
    });
    builder.addCase(fetchSingleGig.rejected, (state, action) => {
      state.activeGig.error = action.payload.data.detail;
      state.activeGig.status = 'failed';
    });
    // Update gigs state when fetchGigs success
    builder.addCase(fetchRecommendedGigs.fulfilled, (state, action) => {
      state.gigs = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchRecommendedGigs.pending, (state, action) => {
      state.status = 'loading';
    });
    // Change status to failed & set error, when fetchGigs rejected
    builder.addCase(fetchRecommendedGigs.rejected, (state, action) => {
      state.status = 'failed';
      // Change it to other content later
      state.error = action.payload.data.detail
      state.errorCode = action.payload.status
    });
  },
});

export default gigsSlice.reducer;
