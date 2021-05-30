import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  hirer: null, // for future usage
  status: 'idle',
  error: null,
  activeHirer: { hirer: null, status: 'idle', error: null },
};

//Fetching particular hirer profile by id
export const fetchSingleHirer = createAsyncThunk(
  'hirers/fetchSingleHirer',
  async (hirerId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/hirers/${hirerId}/`
      );
      return response.data;
    } catch (err) {
      const { data, status } = err.response;
      return rejectWithValue({ data, status });
    }
  }
);

const hirersSlice = createSlice({
  name: 'hirers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update state when successfully fetching hirer detail
    builder.addCase(fetchSingleHirer.fulfilled, (state, action) => {
      state.activeHirer.hirer = action.payload;
      state.activeHirer.status = 'succeeded';
    });
    // Change status to loading when fetching
    builder.addCase(fetchSingleHirer.pending, (state, action) => {
      state.activeHirer.status = 'loading';
    });
    // Change status to failed & set error, when not found
    builder.addCase(fetchSingleHirer.rejected, (state, action) => {
      state.activeHirer.status = 'failed';
      state.activeHirer.error = action.payload.data.detail;
    });
  },
});

export default hirersSlice.reducer;
