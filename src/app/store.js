import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slices/authenticationSlice';
import gigsReducer from '../slices/gigsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    gigs: gigsReducer,
  },
});
