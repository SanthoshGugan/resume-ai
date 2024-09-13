import { addQueryResult, setRemainingQueries, setFetching } from '../queryResultsSlice';
import { fetchQueriesApi } from '../../api/queryApi';  // API call to fetch query results

export const longPollQueries = (jd_key, interval = 5000) => async (dispatch, getState) => {
  const { queryResults } = getState();
  console.log(`remiaing queries ::::: $${JSON.stringify(queryResults.remainingQueries)}`)

  // Only proceed if there are queries left to fetch
  if (queryResults.remainingQueries.length > 0 && !queryResults.fetching) {
    dispatch(setFetching(true));
    console.log(`remiaing queries ::::: $${JSON.stringify(queryResults.remainingQueries)}`)

    try {
      // Call API to fetch results for the remaining queries
      const res = await fetchQueriesApi({ jd_key, queryIds: queryResults.remainingQueries });
      const { queries } = res.data;

      // Dispatch results for each fetched query
      queries.forEach(query => {
        dispatch(addQueryResult({ queryId: query.query_id, result: query.result }));
      });

      // After the results are fetched, continue long polling after the interval
      setTimeout(() => {
        dispatch(longPollQueries(jd_key, interval));
      }, interval);
      
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      dispatch(setFetching(false));  // End fetching
    }
  }
};