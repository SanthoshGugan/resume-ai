import { createSelector } from '@reduxjs/toolkit';
import { QUERIES } from '../../utils/constants';


const selectQueryResultsById = state => state.queryResults.byQueryId;

const similarityQueryResultByResumeId = state => state.queryResults.byQueryId[QUERIES.SIMILARITY]?.result;
const labelQueryResultByResumeId = state => state.queryResults.byQueryId[QUERIES.LABEL];
const companiesQueryResultByResumeId = state => state.queryResults.byQueryId[QUERIES.COMPANIES];

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
    // console.log(`in selector :::: ${JSON.stringify(similarityResult)}`);
    if(!similarityResult) return 0;
    const resumeResult = similarityResult.filter(result => result.resume_id === resumeId);
    return resumeResult ? Math.ceil(resumeResult[0]?.match) : 0;
  }
);

const selectLabelsByResumeId = createSelector(
  [labelQueryResultByResumeId, (state, resumeId) => resumeId],
  (labelResult, resumeId) => {
    if(!labelResult) return [];
    const { label_result } = labelResult;
    // console.log(`in selector label_result:::: ${JSON.stringify(label_result)}, ${resumeId}`);
    const [label_resume] = label_result.filter(result => result.resume_id === resumeId) || [];
    return label_resume?.labels || []; 
  }
);

const selectSkillPercentByResumeId = createSelector(
  [labelQueryResultByResumeId, (state, resumeId) => resumeId],
  (labelResult, resumeId) => {
    // console.log(`in selector skill_result:::: ${JSON.stringify(labelResult?.skill_result?.resume_id)}, ${resumeId}`);
    if (!labelResult) return {};
    const { skill_result } = labelResult;
    const [ skill_percent_resume ] = skill_result.filter(skill => skill.resume_id === resumeId) || [];
    const skill_percent = skill_percent_resume?.result?.skill_percent || {};
    return skill_percent;
  }
);

const selectCompaniesByResumeId = createSelector(
  [companiesQueryResultByResumeId, (state, resumeId) => resumeId],
  (companiesResult, resumeId) => {
    if(!companiesResult) return [];
    const { companies_result } = companiesResult;
    console.log(`in selector label_result:::: ${JSON.stringify(companies_result)}, ${resumeId}`);
    const  [companies_resume] = companies_result.filter(result => result.resume_id === resumeId) || [];
    return companies_resume?.companies || []; 
  }
);

export { selectQueryResultsByIds, selectSimilarityByResumeId, selectLabelsByResumeId, selectSkillPercentByResumeId, selectCompaniesByResumeId };