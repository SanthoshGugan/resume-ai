import { createSelector } from "@reduxjs/toolkit";
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";

const selectResumeUploadStatus = state => state.resumes.resumeUploadStatus;

const selectAllResumeById = state => state.resumes.byId;


const isResumeUploadInProgress = createSelector(
    [
        selectResumeUploadStatus
    ],
    (resumeUploadStatus) => {
        console.log(`resume upload status : ${resumeUploadStatus}`);
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

export {
    isResumeUploadInProgress,
    resumeMetadataByIdSelector,
    resumeSummaryByIdSelector
}