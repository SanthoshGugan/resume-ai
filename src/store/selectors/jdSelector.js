import { createSelector } from "@reduxjs/toolkit";


const selectJdKeyObj = state => state.jobDescription?.key;

const selectJd = state => state.jobDescription?.jd;

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



export {
    selectJdKey,
    isJDOnQuickSelect
};