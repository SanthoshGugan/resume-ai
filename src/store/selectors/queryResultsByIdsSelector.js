import { createSelector } from '@reduxjs/toolkit';
import { QUERIES } from '../../utils/constants';


const selectQueryResultsById = state => state.queryResults.byQueryId;

const similarityQueryResultByResumeId = state => state.queryResults.byQueryId[QUERIES.SIMILARITY]?.result;

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

const selectSimilarityByResumeId = createSelector(
  [similarityQueryResultByResumeId, (state, resumeId) => resumeId],
  (similarityResult, resumeId) => {
    console.log(`in selector :::: ${JSON.stringify(similarityResult)}`);
    if(!similarityResult) return 0;
    const resumeResult = similarityResult.filter(result => result.resume_id === resumeId);
    return resumeResult ? Math.ceil(resumeResult[0]?.match) : 0;
  }
);

export { selectQueryResultsByIds, selectSimilarityByResumeId };