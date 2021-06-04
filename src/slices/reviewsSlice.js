import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  hirerReviews: [],
  talentReviews: [],
  status: 'idle',
  error: null,
  summary: null,
  activeReview: { review: null, status: 'idle', error: null },
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

//Get talent's reviews
export const fetchTalentReviews = createAsyncThunk(
  'reviews/fetchTalentReviews',
  async (talentId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/talent/all/${talentId}/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

//fetch my reviews of login user
export const fetchMyReviews = createAsyncThunk(
  'reviews/fetchMyReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/myreviews/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Fetch hirer's review
export const fetchSingleHirerReview = createAsyncThunk(
  'reviews/fetchSingleHirerReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/hirer/${reviewId}/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Fetch talent's review
export const fetchSingleTalentReview = createAsyncThunk(
  'reviews/fetchSingleTalentReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/reviews/talent/${reviewId}/`
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
      state.summary = action.payload.summary;
      state.hirerReviews = action.payload.reviews;
      state.status = 'succeeded';
    });
    builder.addCase(fetchHirerReviews.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchHirerReviews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    builder.addCase(fetchTalentReviews.fulfilled, (state, action) => {
      state.summary = action.payload.summary;
      state.talentReviews = action.payload.reviews;
      state.status = 'succeeded';
    });
    builder.addCase(fetchTalentReviews.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTalentReviews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    builder.addCase(fetchMyReviews.fulfilled, (state, action) => {
      state.talentReviews = action.payload.talent_reviews;
      state.hirerReviews = action.payload.hirer_reviews;
      state.status = 'succeeded';
    });
    builder.addCase(fetchMyReviews.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMyReviews.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data.detail;
    });
    builder.addCase(fetchSingleHirerReview.fulfilled, (state, action) => {
      state.activeReview.review = action.payload;
      state.activeReview.status = 'succeeded';
    });
    builder.addCase(fetchSingleHirerReview.pending, (state, action) => {
      state.activeReview.status = 'loading';
    });
    builder.addCase(fetchSingleHirerReview.rejected, (state, action) => {
      state.activeReview.status = 'failed';
      state.activeReview.error = action.payload.data.detail;
    });
    builder.addCase(fetchSingleTalentReview.fulfilled, (state, action) => {
      state.activeReview.review = action.payload;
      state.activeReview.status = 'succeeded';
    });
    builder.addCase(fetchSingleTalentReview.pending, (state, action) => {
      state.activeReview.status = 'loading';
    });
    builder.addCase(fetchSingleTalentReview.rejected, (state, action) => {
      state.activeReview.status = 'failed';
      state.activeReview.error = action.payload.data.detail;
    });
  },
});

export default reviewsSlice.reducer;
