import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  details: null,           // User profile details
  userType: 'guest',       // User type: 'guest', 'free', 'premium'
  userId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: state => initialState,
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
    setuserId: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
    },
  },
});

export const { userReset, loginUser, logoutUser, setuserId } = userSlice.actions;

export default userSlice.reducer;