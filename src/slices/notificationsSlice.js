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

// const readNotification = createAsyncThunk(
//   'notifications/readNotification',
//   async (data, { rejectWithValue }) => {
//     try {
//       // Pass in id of notification to be read
//       const response = await Axios.put(
//         `${process.env.REACT_APP_API_URL}/api/notifications/read/`,
//         data
//       );
//       // if read successfully
//       return { message: response.data.message, read_ids: data.notification_id };
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.unread = action.payload.filter((notice) => !notice.is_read).length;
      state.status = 'succeeded';
    });
    builder.addCase(fetchNotifications.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload.data;
    });
    // builder.addCase(readNotification.fulfilled, (state, action) => {
    //   const { read_ids } = action.payload;
    //   state.notifications.forEach((notification) => {
    //     if (read_ids.includes(notification.id)) {
    //       notification.is_read = true;
    //     }
    //   });
    // });
  },
});

export default notificationsSlice.reducer;
