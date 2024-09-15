import React from 'react';
import { useSelector } from 'react-redux';
// import { selectQueryResultsByIds } from '../store/slices/querySlice';
// import Loading from '';
// import ErrorComponent from './common/ErrorComponent';
// import NotAvailable from './common/NotAvailable';
import { selectQueryResultsByIds } from '../../store/selectors/queryResultsByIdsSelector';
import { ErrorComponent, Loading, NotAvailable } from './Common';
import { areAllQueryIdsPopulated, getResumeIdsFromQueryResult } from '../../utils/queryResultUtils';
import { resumesByIdsSelector } from '../../store/selectors/resumeByIdSelector';
import { getResumeIdsForQueries } from './wrapperUtils';

const withWidgetWrapper = (WrappedComponent, queryIds) => {
  return function WidgetWrapper() {
    // Fetch query results from the Redux store based on query IDs
    const queryResults = useSelector((state) => selectQueryResultsByIds(state, queryIds)) || { };
    const queryStatus = useSelector((state) => state.queries.status);



    const resumeIds = getResumeIdsForQueries(queryResults, queryIds);
    // console.log(`resumeIds i widget wrapper :${JSON.stringify(resumeIds)}`);
    const resumes = useSelector((state) => resumesByIdsSelector(state, resumeIds));
    // console.log(`resumes i widget wrapper :${JSON.stringify(resumes)}`);

    // Handle different states (loading, error, etc.)
    // if (queryStatus === 'loading') {
    //   return <Loading />;
    // }
    
    // if (queryStatus === 'error') {
    //   return <ErrorComponent />;
    // }
    // console.log(`query results :::: ${JSON.stringify(queryResults)}`);
    // // If some queries are not available in the results, show not available
    // if (!queryResults || !areAllQueryIdsPopulated(queryResults, queryIds)) {
    //   return <NotAvailable />;
    // }
    
    // Pass fetched results to the wrapped component
    return (
      <WrappedComponent
        queryResults={queryResults}
        resumes={resumes}
      />
    );
  };
};

export default withWidgetWrapper;