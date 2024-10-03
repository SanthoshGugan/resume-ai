import { configureStore, combineReducers } from '@reduxjs/toolkit';
import jobDescriptionReducer from './jobDescriptionSlice';
import resumeReducer from './resumeSlice';
import queryReducer from './querySlice';
import widgetReducer from './widgetSlice';
import userReducer from './userSlice';
import queryResultsReducer from './queryResultsSlice';
import timelineReducer from './timelineSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Global states outside of slices
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

// Configure persist settings
const persistConfig = {
  key: 'root',            // Root key for persistence (can be customized)
  storage,                // Default storage is localStorage
  whitelist: ['user', 'queries', 'jobDescription', 'resumes', 'timeline', 'queryResults', 'widgets'], // Only persist selected reducers (optional)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }),
});

// Create persistor for rehydration
export const persistor = persistStore(store);