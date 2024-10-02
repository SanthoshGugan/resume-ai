import { createSelector } from "@reduxjs/toolkit";
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";
import { skillListFromCategories } from "../../utils/dimensionsUtil";

const selectResumeUploadStatus = state => state.resumes.resumeUploadStatus;

const selectAllResumeById = state => state.resumes.byId;

const selectSkillsFromFullStackDomain = dimensions => dimensions.domains[0]?.roles[0]?.skills || [];


const isResumeUploadInProgress = createSelector(
    [
        selectResumeUploadStatus
    ],
    (resumeUploadStatus) => {
        return resumeUploadStatus == RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS;
    }
);

const resumeMetadataByIdSelector = createSelector(
    [
        selectAllResumeById,
        (state, id) => id
    ],
    (resumesById, id) => {
        const resume = resumesById[id];
        const { metadata } = resume;
        const { name: names } = metadata;
        const [name = ""] = names;
        
        const resumeMetadata = {};
        return {
            name
        };
    }
);

const resumeSummaryByIdSelector = createSelector(
    [
        selectAllResumeById,
        (state, id) => id,
    ],
    (resumesById, id) => {
        const resume = resumesById[id] || {};
        const { summary = ''} = resume;
        return {
            summary
        }
    }
);

const resumeSkillListSelector = createSelector(
    [
        selectAllResumeById,
        (state, id) => id
    ],
    (resumesById, id) => {
        const resume = resumesById[id] || {};
        const { dimensions } = resume;
        const skills = selectSkillsFromFullStackDomain(dimensions);
        return skills?.reduce((acc, skill) => {
            const { categories, skill: category, label } = skill;
            const skillList = skillListFromCategories(categories);
            return {
                ...acc,
                [category]: {
                    skillList,
                    label
                }
            };
        }, {});
    }
);

export {
    isResumeUploadInProgress,
    resumeMetadataByIdSelector,
    resumeSummaryByIdSelector,
    resumeSkillListSelector
}