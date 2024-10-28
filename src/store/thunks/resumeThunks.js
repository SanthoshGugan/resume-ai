import { fetchResumesApi, fetchResumeSummaryApi } from "../../api/resumeApi";
import { addFetchInProgress, addResume, removeFetchInProgress, setIds, setResumeRetries } from "../resumeSlice";
import { uploadFile, uploadFiles } from "../../api/s3FileUploadApi";
import { initializeResumeUploadApi } from "../../api/resumeApi";
import { setResumeUploadStatus } from "../resumeSlice";
import { updateStatusForStep, updateStepToActive } from "../timelineSlice";
import { KEY_DELIMTER, RESUME_UPLOAD_STATUS, USER_FLAGS } from "../../utils/constants";
import { setResumeStatus } from "./loaderThunk";
import { resetLoader, setLoaderProgress, setLoaderVisibility } from "../loaderSlice";
import usePermissions from "../../hooks/usePermissions";
import { setTotalMatches } from "../userSlice";
import { URLs } from "../../utils/urls";

export const fetchResumesThunk = ({ keys = [], interval = 5000 }) => async (dispatch, getState) => {
    console.log(`keys ::: ${JSON.stringify(keys)}`);
    const { resumes } = getState();
    const { fetchInProgress, allIds } = resumes;
    if (keys.length === 0) return;
    try {
        console.log(`allids ::: ${JSON.stringify(allIds)}`);
        const filteredResumeKeys = keys.filter(key => !allIds.includes(key));
        if (filteredResumeKeys.length == 0) {
            return;
        }
        for (const resumeId of filteredResumeKeys) {
            dispatch(addFetchInProgress({ resumeId }))
        }
        const res = await fetchResumesApi({ resumeIds: filteredResumeKeys });
        const resumeResult = res.data.resumes;
        for (const resume of resumeResult) {
            dispatch(addResume({ resume }));
            dispatch(removeFetchInProgress({ resumeId: resume.id }));
        }
    } catch (err) {
        console.error('error while resume fetching :::: ', err);

    }
};

export const pollResumesThunk = (ids = [], interval = 5000, navigate) => async (dispatch, getState) => {
    // console.log(`keys ::: ${JSON.stringify(keys)}`);
    const { resumes, user } = getState();
    const { resumeRetries, maxResumeRetries } = resumes;
    const { usage = {} } = user;
    const { totalMatches = 0 } = usage;
    try {
        const res = await fetchResumeSummaryApi({
            resumeIds: ids
        });
        const resumes = res?.data || [];
        const remainingResumesIds = [];
        for (const resume of resumes) {
            dispatch(addResume({ resume }));
            if (!["EMBEDDING_UPDATED"].includes(resume.status)) {
                remainingResumesIds.push(resume.id);
            }
        }
        const hasFetchPending = remainingResumesIds.length > 0 || resumes.length == 0;
        if (hasFetchPending && resumeRetries < maxResumeRetries) {
            ids = resumes.length == 0 ? ids : remainingResumesIds;
            dispatch(setResumeRetries(resumeRetries + 1));
            setTimeout(() => {
                dispatch(pollResumesThunk(ids, interval, navigate));
            }, interval)
        } else if (hasFetchPending && resumeRetries >= maxResumeRetries) {
            console.error("Max retries reaching for resume fetch");
            throw new Error("Max retries reached for resume fetch");
        } else {
            dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_COMPLETED));
            dispatch(updateStatusForStep({ id: "resume", status: "completed" }));
            dispatch(updateStatusForStep({ id: "match", status: "enabled" }));
            dispatch(updateStepToActive({ id: "match" }));
            dispatch(setResumeUploadStatus('completed'));
            dispatch(resetLoader());
            dispatch(setTotalMatches(totalMatches + 1));
            navigate(URLs.QUERIES);
        }
    } catch (err) {
        console.error('error while resume fetching :::: ', err);
        dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_FAILED));
        dispatch(resetLoader());
    }
};

export const initUploadResumeThunk = ({ files, Bucket, navigate }) => async (dispatch, getState) => {
    try {
        const { jobDescription } = getState();
        const s3_key = jobDescription?.key;
        console.log(`jd_key :${s3_key}`);
        const resume_keys = [];
        const key_map = new Map();
        for (const file of files) {
            const resume_name = file.name;
            const fileSplit = resume_name.split('.');
            const resume_key = `${fileSplit[0]}${KEY_DELIMTER}${s3_key}`;
            resume_keys.push(resume_key);
            key_map.set(resume_name, resume_key);
        }
        dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS));
        dispatch(setLoaderVisibility(true));
        dispatch(setLoaderProgress(40));
        dispatch(setResumeStatus());
        const response = await initializeResumeUploadApi({ jd_key: `${s3_key}`, resume_keys });
        // const { id } = response?.data;
        const { Key } = await uploadFiles({ files, Bucket, key_map });
        // dispatch(updateStatusForStep({ id: "match", status: "enabled"}));
        dispatch(pollResumesThunk(resume_keys, 5000, navigate));
        // console.log(resume_keys);

    } catch (err) {
        dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_FAILED));
        dispatch(resetLoader());
        console.log("Error on int resume", err);
    }
}

// export const uploadResumeThunk = ({ file, Bucket }) => async (dis)