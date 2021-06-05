import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../slices/authenticationSlice';
import gigsReducer from '../slices/gigsSlice';
import profileReducer from '../slices/profileSlice';
import categoriesReducer from '../slices/categoriesSlice';
import notificationsReducer from '../slices/notificationsSlice';
import favouritesReducer from '../slices/favouritesSlicer';
import talentsReducer from '../slices/talentsSlice';
import hirersReducer from '../slices/hirersSlice';
import reviewsReducer from '../slices/reviewsSlice';
import adminsReducer from '../slices/adminsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    gigs: gigsReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    notifications: notificationsReducer,
    favourites: favouritesReducer,
    talents: talentsReducer,
    hirers: hirersReducer,
    reviews: reviewsReducer,
    admins: adminsReducer,
  },
});
