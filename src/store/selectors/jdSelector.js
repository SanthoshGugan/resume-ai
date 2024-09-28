import { createSelector } from "@reduxjs/toolkit";
import { JD_UPDATE_SKILL_STATUS, JD_UPLOAD_STATUS } from "../../utils/constants";


const selectJdKeyObj = state => state.jobDescription?.key;

const selectJd = state => state.jobDescription?.jd;

const selectJdUploadStatus = state => state.jobDescription.jdUploadStatus;

const selectJdUpdateSkillStatus = state => state.jobDescription.jdUpdateSkillStatus;

const selectJdKey = createSelector(
    [
        selectJdKeyObj
    ],
    (jdKeyObject) => {
        const { s3_key, s3_bucket } = jdKeyObject;
        return `${s3_key}_${s3_bucket}`;
    }
)

const isJDOnQuickSelect = createSelector(
    [
        selectJd
    ],
    (jd) => {
        if (!jd || !jd?.status) return false;
        return jd?.status === 'EMBEDDING_UPDATED';
    }
);

const isJDUploadInProgress = createSelector(
    [
        selectJdUploadStatus
    ],
    (jdUploadStatus) => {
        console.log(`jd upload status : ${jdUploadStatus}`);
        if ([JD_UPLOAD_STATUS.JD_WORKFLOW_COMPLETED, JD_UPLOAD_STATUS.JD_WORKFLOW_IDLE].includes(jdUploadStatus)) return false;
        return true;
    }
);

const isJDUpdateSkillInProgressSelector = createSelector(
    [
        selectJdUpdateSkillStatus
    ],
    (jdUpdateSkillStatus) => {
        console.log(`jd upload status : ${jdUpdateSkillStatus}`);
        if ([JD_UPDATE_SKILL_STATUS.COMPLETED, JD_UPDATE_SKILL_STATUS.IDLE].includes(jdUpdateSkillStatus)) return false;
        return true;
    }
)



export {
    selectJdKey,
    isJDOnQuickSelect,
    isJDUploadInProgress,
    isJDUpdateSkillInProgressSelector
};