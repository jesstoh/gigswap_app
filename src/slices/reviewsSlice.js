import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  hirerReviews: [],
  talentReviews: [],
  status: 'idle',
  error: null,
  summary: null,
};

//Get hirer's reviews
export const fetchHirerReviews = createAsyncThunk(
  'reviews/fetchHirerReviews',
  async (hirerId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/hirer/all/${hirerId}/`
      
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);


const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHirerReviews.fulfilled, (state, action) => {
      state.summary = action.payload.summary
      state.hirerReviews = action.payload.reviews;
      state.status = 'succeeded';
    });
    builder.addCase(fetchHirerReviews.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchHirerReviews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail
    });
  },
});

export default reviewsSlice.reducer;
