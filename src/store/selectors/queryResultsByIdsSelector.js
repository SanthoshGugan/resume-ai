import { createSelector } from '@reduxjs/toolkit';


const selectQueryResultsById = state => state.queryResults.byQueryId;

// Memoized selector to get query results by a list of query IDs
const selectQueryResultsByIds = createSelector(
  [selectQueryResultsById, (state, queryIds) => queryIds],
  (queryResultsById, queryIds) => {
    return queryIds.reduce((results, queryId) => {
      if (queryResultsById[queryId]) {
        results[queryId] = queryResultsById[queryId];
      }
      return results;
    }, {}) || {};
  }
);

export { selectQueryResultsByIds };