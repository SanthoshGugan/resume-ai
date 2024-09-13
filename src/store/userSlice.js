import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  details: null,           // User profile details
  userType: 'guest',       // User type: 'guest', 'free', 'premium'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.details = action.payload.details;
      state.userType = action.payload.userType;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.details = null;
      state.userType = 'guest';
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;