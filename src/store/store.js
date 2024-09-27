import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jobDescriptionReducer from './jobDescriptionSlice';
import resumeReducer from './resumeSlice';
import queryReducer from './querySlice';
import widgetReducer from './widgetSlice';
import userReducer from './userSlice';
import queryResultsReducer from './queryResultsSlice';
import timelineReducer from './timelineSlice';

// Define some global states outside of the slices
const globalInitialState = {
  appStatus: 'idle', // App-wide status (e.g., 'idle', 'loading', 'error')
  overallProgress: 0, // Tracks overall progress (e.g., for displaying a global progress bar)
};

const globalReducer = (state = globalInitialState, action) => {
  switch (action.type) {
    case 'SET_APP_STATUS':
      return {
        ...state,
        appStatus: action.payload,
      };
    case 'SET_OVERALL_PROGRESS':
      return {
        ...state,
        overallProgress: action.payload,
      };
    default:
      return state;
  }
};

// Combine all reducers, including the global one
const rootReducer = combineReducers({
  global: globalReducer,           // Global state
  jobDescription: jobDescriptionReducer,
  resumes: resumeReducer,
  queries: queryReducer,
  widgets: widgetReducer,
  user: userReducer,
  queryResults: queryResultsReducer,
  timeline: timelineReducer
});

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
});