import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  fav: [],
  status: 'idle',
  error: null,
};

export const fetchTalentFav = createAsyncThunk('favourites/fetchTalentFav', async(_, {rejectWithValue}) => {
    try {
        const response = await Axios.get(
          `${process.env.REACT_APP_API_URL}/api/talents/fav/`
        );
        return response.data;
      } catch (err) {
        const { data, status } = err.response;
        return rejectWithValue({ data, status });
      }
})

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      // Update talent favourite list when fetch success
    builder.addCase(fetchTalentFav.fulfilled, (state, action) => {
        state.fav = action.payload;
        state.status = 'succeeded';
      });
      // Change status to loading when fetching
      builder.addCase(fetchTalentFav.pending, (state, action) => {
        state.status = 'loading';
      });
      // Change status to failed & set error, when not found
      builder.addCase(fetchTalentFav.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.data.detail
      });
  },
});

export default favouritesSlice.reducer;
