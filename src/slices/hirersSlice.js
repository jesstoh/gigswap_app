import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  hirer: null, // for future usage
  status: 'idle',
  error: null,
  activeHirer: { hirer: null, status: 'idle', error: null },
};

const hirersSlice = createSlice({
  name: 'hirers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default hirersSlice.reducer;
