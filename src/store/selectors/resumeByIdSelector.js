import { createSelector } from "@reduxjs/toolkit";


const selectResumeByIds = state => state.resumes.byId;

const resumesByIdsSelector = createSelector(
    [selectResumeByIds, (state, resumeIds) => resumeIds],
    (resumesById, resumeIds) => {
        return resumeIds.reduce((results, resumeId) => {
            // console.log(`results on selector :::::: ${JSON.stringify(resumesById)}`);
            if (resumesById[resumeId]) {
                results[resumeId] = resumesById[resumeId];
            }
            return results;
        }, {}) || {};
    }
);

const resumeByIdSelector = createSelector(
    [selectResumeByIds, (state, resumeId) => resumeId],
    (resumesById, resumeId) => {
        return resumesById[resumeId] || {};
    }
)

export { resumesByIdsSelector, resumeByIdSelector };