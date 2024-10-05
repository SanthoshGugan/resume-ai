import { dispatch } from "d3";
import { fetchJdSkillsApi, fetchJDSummaryApi, updateJDApi } from "../../api/jdApi";
import jobDescriptionSlice, { initSkill, setIsSkillUpdated, updatedJD, addKey, setJDUploadStatus, setJDSkillUpdateSkill, setJDUpdateSkillStatus } from "../jobDescriptionSlice";
import { uploadFile } from "../../api/s3FileUploadApi";
import { updateStatusForStep, updateStepToActive } from "../timelineSlice";
import { JD_UPDATE_SKILL_STATUS, JD_UPLOAD_STATUS } from "../../utils/constants";
import { generateJdKeyByUserId } from "../../utils/userUtils";
import { resetLoader, setLoaderProgress, setLoaderVisibility } from "../loaderSlice";
import { setJdStatus } from "./loaderThunk";


export const fetchJDThunk = (interval = 5000) => async (dispatch, getState) => {
    const { jobDescription, loader: { progress } } = getState();
    // console.log(`JD ::: ${JSON.stringify(jobDescription)}`);
    const { key, jdUpdateSkillStatus } = jobDescription;
    try {
        const req = {
            s3_key: key
        };

        const res = await fetchJDSummaryApi(req);
        // console.log(`response ::: ${JSON.stringify(res)}`);
        const { status, retry, dimensions, summary, id } = res?.data;
        if (retry) {
            setTimeout(() => {
                dispatch(fetchJDThunk(interval));
                dispatch(setLoaderProgress(Math.min((progress * 2.5), 80)));
                dispatch(setJdStatus({ status }));
            }, interval)
        } else {
            dispatch(updatedJD({
                ...(status !== undefined && { status }),
                ...(dimensions !== undefined && { dimensions }),
                ...(summary !== undefined && { summary }),
                id
            }))
            dispatch(setJDUploadStatus(JD_UPLOAD_STATUS.JD_WORKFLOW_COMPLETED));
            dispatch(setLoaderProgress(100));
            dispatch(resetLoader());
            if (jdUpdateSkillStatus === JD_UPDATE_SKILL_STATUS.IN_PROGRESS){
                dispatch(setIsSkillUpdated(true));
                dispatch(updateStatusForStep({ id: 'resume', status: 'enabled'}));
                dispatch(setJDUpdateSkillStatus(JD_UPDATE_SKILL_STATUS.COMPLETED));
            } 
        }


    } catch (err) {
        console.error(`Error while fetching JD ::::`, err);
    }
};

export const fetchGlobalSkills = () => async (dispatch, getState) => {
    const { jobDescription: { skills: { byCategory } } } = getState();
    // console.log(`bycateogry ::::: `, Object.keys(byCategory).length);
    // if (Object.keys(byCategory).length) return;
    try {
        const res = await fetchJdSkillsApi();
        dispatch(initSkill(res?.data?.skills));
    } catch (err) {
        console.error(`error while fetching global skills : `, err);
        return [];
    }
};

export const updateJdThunk = () => async (dispatch, getState) => {
    const { jobDescription: { jd, skills: { newSkills = [] }, key } } = getState();
    const { dimensions, status, summary } = jd;
    try {
        dispatch(setJDUpdateSkillStatus(JD_UPDATE_SKILL_STATUS.IN_PROGRESS));
        const res = await updateJDApi({ jd: { dimensions, status, id: key, summary }, newSkills });
        dispatch(fetchJDThunk());

    } catch (err) {
        console.error(`error while updating jd`, err);
        dispatch(setJDUpdateSkillStatus(JD_UPDATE_SKILL_STATUS.FAILED));
    }
};

// jd upload thunk
export const uploadJDThunk = ({ file, Bucket }) => async (dispatch, getState) => {
    const { user } = getState();
    const { userId } = user;
    const Key = generateJdKeyByUserId(userId, file.name);
    dispatch(setLoaderVisibility(true));
    dispatch(setLoaderProgress(20));
    dispatch(setJDUploadStatus(JD_UPLOAD_STATUS.JD_WORKFLOW_PROGRESS));
    await uploadFile({ file, Bucket, Key });
    // console.log(`on jdthunk ::; ${Key} ${Bucket}`);
    dispatch(addKey(Key));
    dispatch(fetchJDThunk());
}

export const skipSkillUpdateThunk = () => async (dispatch, getState) => {
    dispatch(setJDSkillUpdateSkill("completed"));
    dispatch(updateStatusForStep({ id: 'resume', status: 'enabled' }));
    dispatch(updateStatusForStep({ id: 'jd', status: 'completed' }));
    dispatch(updateStepToActive({ id: 'resume' }));
}