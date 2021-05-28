import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unread: 0,
  status: 'idle',
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
});

export default notificationsSlice.reducer;
