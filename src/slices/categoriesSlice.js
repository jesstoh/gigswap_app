import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  cats: { content: null, status: 'idle', error: null },
  subcats: { content: null, status: 'idle', error: null },
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/categories/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.cats.content = action.payload;
      state.cats.status = 'succeeded';
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.cats.status = 'pending';
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.cats.status = 'failed';
      state.cats.error = action.payload.data.detail;
    });
  },
});

export default categoriesSlice.reducer;
