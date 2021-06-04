import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  cats: { content: [], status: 'idle', error: null },
  subcats: { content: [], status: 'idle', error: null },
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

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/categories/create/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const addSubcategory = createAsyncThunk(
  'categories/addSubcategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/categories/sub/create/`,
        data
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const fetchSubcats = createAsyncThunk(
  'categories/fetchSubcats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/categories/sub/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ data, catId }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/categories/${catId}/`,
        data
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
    builder.addCase(fetchSubcats.fulfilled, (state, action) => {
      state.subcats.content = action.payload;
      state.subcats.status = 'succeeded';
    });
    builder.addCase(fetchSubcats.pending, (state, action) => {
      state.subcats.status = 'pending';
    });
    builder.addCase(fetchSubcats.rejected, (state, action) => {
      state.subcats.status = 'failed';
      state.subcats.error = action.payload.data.detail;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.cats.content.push(action.payload);
    });
    builder.addCase(addSubcategory.fulfilled, (state, action) => {
      state.subcats.content.push(action.payload);
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      const index = state.cats.content.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.cats.content[index] = action.payload;
      }
    });
  },
});

export default categoriesSlice.reducer;
