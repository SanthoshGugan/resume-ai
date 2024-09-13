import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jd: null,
  status: 'idle',        // 'idle' | 'extracting' | 'embedding' | 'completed' | 'failed'
  progress: 0,           // Percentage of progress (0-100)
  error: null,           // Error details, if any
};

const jobDescriptionSlice = createSlice({
  name: 'jobDescription',
  initialState,
  reducers: {
    startJDProcess: (state) => {
      state.status = 'extracting';
      state.progress = 10;
    },
    updateJDProgress: (state, action) => {
      state.progress = action.payload;
    },
    completeJDProcess: (state) => {
      state.status = 'completed';
      state.progress = 100;
    },
    setJDError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { startJDProcess, updateJDProgress, completeJDProcess, setJDError } = jobDescriptionSlice.actions;

export default jobDescriptionSlice.reducer;