import { createSelector } from "@reduxjs/toolkit";
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";

const selectResumeUploadStatus = state => state.resumes.resumeUploadStatus;

const isResumeUploadInProgress = createSelector(
    [
        selectResumeUploadStatus
    ],
    (resumeUploadStatus) => {
        console.log(`resume upload status : ${resumeUploadStatus}`);
        return resumeUploadStatus == RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS;
    }
);

export {
    isResumeUploadInProgress
}