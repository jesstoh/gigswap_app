import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  gigs: [],
  status: 'idle',
  error: null,
};

const gigsSlice = createSlice({
    name: 'gigs',
    initialState,
    reducers: {

    }
})


export default gigsSlice.reducer;