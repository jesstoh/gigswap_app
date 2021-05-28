import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../utilz/Axios';

const initialState = {
  notifications: [],
  unread: 0,
  status: 'idle',
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/notifications/`
      );
      return response.data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.unread = action.payload.filter(notice => !notice.is_read).length
      state.status = 'succeeded';
    });
    builder.addCase(fetchNotifications.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data;
    });
  },
});

export default notificationsSlice.reducer;
