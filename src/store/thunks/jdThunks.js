import { dispatch } from "d3";
import { fetchJdSkillsApi, fetchJDSummaryApi, updateJDApi } from "../../api/jdApi";
import jobDescriptionSlice, { initSkill, setIsSkillUpdated, updatedJD } from "../jobDescriptionSlice";


export const fetchJDThunk = (interval = 5000) => async (dispatch, getState) => {
    const { jobDescription} = getState();
    // console.log(`JD ::: ${JSON.stringify(jobDescription)}`);
    const { key } = jobDescription;
    try {
        const { s3_key, s3_bucket} = key;
        if(!s3_key || !s3_bucket) {
            // console.log(`key : ${s3_bucket} ${s3_bucket}`);
            return;
        }
        const req = {
            s3_key,
            s3_bucket
        };

        const res = await fetchJDSummaryApi(req);
        // console.log(`response ::: ${JSON.stringify(res)}`);
        const { status, retry, dimensions, summary, id } = res?.data;
        dispatch(updatedJD({
            ...(status !== undefined && { status }),
            ...(dimensions !== undefined && { dimensions }),
            ...(summary !== undefined && { summary }),
            id
        }))
        if (retry) {
            setTimeout(() => {
                fetchJDThunk(interval);
            }, interval)
        }


    } catch(err) {
        console.error(`Error while fetching JD ::::`, err);
    }
};

export const fetchGlobalSkills = () => async (dispatch, getState) => {
    const { jobDescription: {skills: { byCategory }}} = getState();
    // console.log(`bycateogry ::::: `, Object.keys(byCategory).length);
    // if (Object.keys(byCategory).length) return;
    try {
        const res = await fetchJdSkillsApi();
        dispatch(initSkill(res?.data?.skills));
    } catch(err) {
        console.error(`error while fetching global skills : `, err);
        return [];
    }
};

export const updateJdThunk = () => async (dispatch, getState) => {
    const { jobDescription: {jd, skills: { newSkills = [] }} } = getState();
    const { dimensions, status, id, summary } = jd;
    try {
        const res = await updateJDApi({ jd : {dimensions, status, id, summary}, newSkills });
        dispatch(setIsSkillUpdated(true));
    } catch(err) {
        console.error(`error while updating jd`, err);
    }
};