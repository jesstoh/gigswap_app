import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isHirer: false,
  isAdmin: false,
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    checkAuthentication(state, action) {
      if (localStorage.refresh) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },  
  },
});

export default authenticationSlice.reducer;

export const {checkAuthentication} = authenticationSlice.actions;