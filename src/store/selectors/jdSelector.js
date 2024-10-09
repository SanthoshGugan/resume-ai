import { createSelector } from "@reduxjs/toolkit";
import { JD_UPDATE_SKILL_STATUS, JD_UPLOAD_STATUS } from "../../utils/constants";


const selectJdKeyObj = state => state.jobDescription?.key;

const selectJd = state => state.jobDescription?.jd;

const selectJdUploadStatus = state => state.jobDescription.jdUploadStatus;

const selectJdUpdateSkillStatus = state => state.jobDescription.jdUpdateSkillStatus;

const selectJDInitialDimensions = state => state?.jobDescription?.initialDimensions;

const selectJdDimensions = state => state?.jobDescription?.jd?.dimensions || {};

const selectJdKey = createSelector(
    [
        selectJdKeyObj
    ],
    (jdKeyObject) => {
        return jdKeyObject;
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
        if ([JD_UPLOAD_STATUS.JD_WORKFLOW_COMPLETED, JD_UPLOAD_STATUS.JD_WORKFLOW_IDLE, JD_UPLOAD_STATUS.JD_WORKFLOW_FAILED].includes(jdUploadStatus)) return false;
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
);

const isDimensionsChanged = createSelector(
    [
        selectJDInitialDimensions,
        selectJdDimensions
    ],
    (initialDimensions, dimensions) => {
        const iDS = JSON.stringify(initialDimensions);
        const dS = JSON.stringify(dimensions);
        return iDS !== dS;
    }
);



export {
    selectJdKey,
    isJDOnQuickSelect,
    isJDUploadInProgress,
    isJDUpdateSkillInProgressSelector,
    isDimensionsChanged
};