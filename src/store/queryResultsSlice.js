import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byQueryId: {},                // Results data keyed by queryId
  cumulativeResults: {},        // Cumulative results from multiple queries
  fetching: false,              // Flag to indicate if fetching is ongoing
  remainingQueries: [],         // List of queryIds yet to be fetched
  queryApiTriggered: false,
  domainsQueryEnabled: []
};

const queryResultsSlice = createSlice({
  name: 'queryResults',
  initialState,
  reducers: {
    qResultReset: state => initialState,
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
    setQueryApiTriggered: (state, action) => {
      state.queryApiTriggered = action.payload;
    },
    enableDomainQuery: (state, action) => {
      const { domain } = action.payload;
      state.domainsQueryEnabled = [
        ...state.domainsQueryEnabled,
        domain
      ]
    }
  },
});

export const {
  qResultReset,
  addQueryResult,
  updateCumulativeResults,
  setRemainingQueries,
  setFetching,
  addRemainingQuery,
  setQueryApiTriggered,
  enableDomainQuery
} = queryResultsSlice.actions;

export default queryResultsSlice.reducer;