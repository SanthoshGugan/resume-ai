// store/resumeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for uploading a resume
export const uploadResume = createAsyncThunk(
  'resume/uploadResume',
  async (resume, { dispatch, getState }) => {
    try {
      // Simulate an API call
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify(resume),
      });
      const data = await response.json();

      // On success, return the uploaded resume ID or data
      return { resumeId: resume.id, status: 'uploaded', data };
    } catch (error) {
      throw new Error('Upload failed');
    }
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    resumes: {
      byId: {},
      allIds: [],
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    addResume: (state, action) => {
      const { resume } = action.payload;
      state.resumes.byId[resume.id] = { ...resume, uploadStatus: 'idle', processStatus: 'idle', matchStatus: 'idle' };
      state.resumes.allIds.push(resume.id);
    },
    updateResumeStatus: (state, action) => {
      const { resumeId, statusKey, statusValue } = action.payload;
      if (state.resumes.byId[resumeId]) {
        state.resumes.byId[resumeId][statusKey] = statusValue;
      }
    },
    removeResume: (state, action) => {
      const { resumeId } = action.payload;
      delete state.resumes.byId[resumeId];
      state.resumes.allIds = state.resumes.allIds.filter(id => id !== resumeId);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadResume.pending, (state, action) => {
        const resumeId = action.meta.arg.id;
        if (state.resumes.byId[resumeId]) {
          state.resumes.byId[resumeId].uploadStatus = 'inProgress';
        }
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        const { resumeId } = action.payload;
        if (state.resumes.byId[resumeId]) {
          state.resumes.byId[resumeId].uploadStatus = 'uploaded';
        }
      })
      .addCase(uploadResume.rejected, (state, action) => {
        const resumeId = action.meta.arg.id;
        if (state.resumes.byId[resumeId]) {
          state.resumes.byId[resumeId].uploadStatus = 'failed';
        }
      });
  }
});

export const { addResume, updateResumeStatus, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;