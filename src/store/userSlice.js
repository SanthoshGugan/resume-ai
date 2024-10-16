import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  details: null,           // User profile details
  userPlan: 'guest',       
  userId: null,
  flags: {
  },
  loadingFlags: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: state => initialState,
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.details = action.payload.details;
      state.userPlan = action.payload.userType;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.details = null;
      state.userPlan = 'guest';
    },
    setuserId: (state, action) => {
      const userId = action.payload;
      state.userId = userId;
    },
    setFlags: (state, action) => {
      const flags = action.payload;
      state.flags = flags;
    },
    setLoadingFlags: (state, action) => {
      const loading = action.payload;
      state.loadingFlags = loading;
    },
    setUserPlan: (state, action) => {
      const planId = action.payload;
      state.userPlan = planId;
    },
    setUserGuest: (state, action) => {
      state.userPlan = "guest";
      state.userId = "";  
    }
  },
});

export const { userReset, loginUser, logoutUser, setuserId, setFlags, setLoadingFlags, setUserPlan, setUserGuest } = userSlice.actions;

export default userSlice.reducer;