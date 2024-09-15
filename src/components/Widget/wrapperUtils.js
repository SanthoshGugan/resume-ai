import { getResumeIdsFromQueryResult } from "../../utils/queryResultUtils";

export const getResumeIdsForQueries = (queryResults, queryIds) => {
    let resumeIds = [];
    for(const queryId of queryIds) {
        const { result = [] } = queryResults[queryId] || {};
        for(const { resume_id } of result) {
            resumeIds.push(resume_id);
        }
    }
    console.log(`resumeIds :::::: ${JSON.stringify(resumeIds)}`);
    return resumeIds;
};