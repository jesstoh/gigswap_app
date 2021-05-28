import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slices/authenticationSlice';
import gigsReducer from '../slices/gigsSlice';
import profileReducer from '../slices/profileSlice';
import categoriesReducer from '../slices/categoriesSlice';
import notificationsReducer from '../slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    gigs: gigsReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    notifications: notificationsReducer,
  },
});
