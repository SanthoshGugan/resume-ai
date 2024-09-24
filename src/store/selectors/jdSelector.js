import { createSelector } from "@reduxjs/toolkit";


const selectJdKeyObj = state => state.jobDescription?.key;

const selectJdKey = createSelector(
    [
        selectJdKeyObj
    ],
    (jdKeyObject) => {
        const { s3_key, s3_bucket } = jdKeyObject;
        return `${s3_key}_${s3_bucket}`;
    }
)

export {
    selectJdKey
};