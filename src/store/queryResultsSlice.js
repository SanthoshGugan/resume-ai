import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byQueryId: {},                // Results data keyed by queryId
  cumulativeResults: {},        // Cumulative results from multiple queries
  fetching: false,              // Flag to indicate if fetching is ongoing
  remainingQueries: [],         // List of queryIds yet to be fetched
};

const queryResultsSlice = createSlice({
  name: 'queryResults',
  initialState,
  reducers: {
    addQueryResult: (state, action) => {
      const { queryId, result } = action.payload;
      state.byQueryId[queryId] = result;
      // Remove the queryId from remainingQueries once it's fetched
      state.remainingQueries = state.remainingQueries.filter(id => id !== queryId);
    },
    updateCumulativeResults: (state, action) => {
      state.cumulativeResults = action.payload;
    },
    setRemainingQueries: (state, action) => {
      state.remainingQueries = action.payload;  // Set the remaining queries that need fetching
    },
    setFetching: (state, action) => {
      state.fetching = action.payload;  // Toggle fetching status
    },
    addRemainingQuery: (state, action) => {
      const queryId = action.payload;
      // Only add the query if it's not already in the remainingQueries list
      if (!state.remainingQueries.includes(queryId)) {
        state.remainingQueries.push(queryId);
      }
    },
  },
});

export const {
  addQueryResult,
  updateCumulativeResults,
  setRemainingQueries,
  setFetching,
  addRemainingQuery
} = queryResultsSlice.actions;

export default queryResultsSlice.reducer;