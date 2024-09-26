import { addQueryResult, setRemainingQueries, setFetching, setQueryApiTriggered } from '../queryResultsSlice';
import { fetchQueriesApi } from '../../api/queryApi';  // API call to fetch query results
import { queryFunctionApi } from "../../api/queryFunctionApi";
import { queryComplete } from '../widgetSlice';
import { fetchResumesThunk } from './resumeThunks';
import { getResumeIdsFromQueryResult } from '../../utils/queryResultUtils';

export const longPollQueries = (jd_key, interval = 5000) => async (dispatch, getState) => {
  const { queryResults } = getState();
  // console.log(`remiaing queries ::::: $${JSON.stringify(queryResults.remainingQueries)}`)

  // Only proceed if there are queries left to fetch
  if (queryResults.remainingQueries.length > 0 && !queryResults.fetching) {
    dispatch(setFetching(true));
    // console.log(`remiaing queries ::::: $${JSON.stringify(queryResults.remainingQueries)}`)

    try {
      // Call API to fetch results for the remaining queries
      const res = await fetchQueriesApi({ jd_key, queryIds: queryResults.remainingQueries });
      const { queries } = res.data;

      // Dispatch results for each fetched query
      queries.forEach(query => {
        dispatch(addQueryResult({ queryId: query.query_id, result: query.result }));
        dispatch(queryComplete({ queryId: query.query_id }));

        // get resume ids from query results to fetch resumes
        const keys = getResumeIdsFromQueryResult(query);
        dispatch(fetchResumesThunk({keys}));
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

export const triggerQueries = (queries) => async (dispatch, getState) => {
  // const { queryResults } = getState();
  // console.log(`remiaing queries ::::: $${JSON.stringify(queryResults.remainingQueries)}`)
  // Only proceed if there are queries left to fetch
  // console.log(`trigger query api queries: ${queries} jd_key: ${jd_key}`);
  const { jobDescription } = getState();
  const {s3_key,s3_bucket} = jobDescription?.key;
  const jd_key = `${s3_key}_${s3_bucket}`
  try{
    dispatch(setQueryApiTriggered(true));
    const response = await queryFunctionApi({
      "queries": queries,
      "jd_key": jd_key
    });
    console.log(`query trigger api response ${JSON.stringify(response)}`);
  } catch(error) {
    console.error('Error fetching queries:', error);
  } finally {
    dispatch(setQueryApiTriggered(false));
  }
  
};