import { fetchResumesApi, fetchResumeSummaryApi } from "../../api/resumeApi";
import { addFetchInProgress, addResume, removeFetchInProgress, setIds } from "../resumeSlice";
import { uploadFile, uploadFiles } from "../../api/s3FileUploadApi";
import { initializeResumeUploadApi } from "../../api/resumeApi";
import { setResumeUploadStatus } from "../resumeSlice";
import { updateStatusForStep, updateStepToActive } from "../timelineSlice";
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";

export const fetchResumesThunk = ({keys = [], interval = 5000}) => async (dispatch, getState) => {
    console.log(`keys ::: ${JSON.stringify(keys)}`);
    const { resumes } = getState();
    const { fetchInProgress, allIds } = resumes;
    if (keys.length === 0) return;
    try {
         console.log(`allids ::: ${JSON.stringify(allIds)}`);
        const filteredResumeKeys = keys.filter(key => !allIds.includes(key));
        if(filteredResumeKeys.length == 0){
            return;
        }
        // for(const resumeId of filteredResumeKeys) {
        //     // dispatch(addFetchInProgress({resumeId}))
        // }
        const res = await fetchResumesApi({ resumeIds: filteredResumeKeys });
        const resumeResult = res.data.resumes;
        for(const resume of resumeResult) {
            dispatch(addResume({ resume }));
            dispatch(removeFetchInProgress({resumeId: resume.id}));
        }
    } catch(err) {
        console.error('error while resume fetching :::: ', err);

    }
};

export const updateResumesThunk = (ids =[], interval = 5000, navigate) => async (dispatch, getState) => {
    // console.log(`keys ::: ${JSON.stringify(keys)}`);
    try {
       const res = await fetchResumeSummaryApi({
        resumeIds: ids
       });
       const resumes = res?.data || [];
       const remainingResumesIds = [];
       for(const resume of resumes){
            dispatch(addResume({resume}));
            if(resume.status != "EMBEDDING_UPDATED"){
                remainingResumesIds.push(resume.id);
            }
       }
       if(remainingResumesIds.length > 0 || resumes.length == 0){
            ids = resumes.length == 0 ? ids : remainingResumesIds;
            setTimeout(() => {
                dispatch(updateResumesThunk(ids, interval, navigate));
            }, interval)
       }
       else {
         dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_COMPLETED));
         dispatch(updateStatusForStep({ id: "resume", status: "completed"}));
         dispatch(updateStatusForStep({ id: "match", status: "enabled"}));
         dispatch(updateStepToActive({ id: "match"}));
         dispatch(setResumeUploadStatus('completed'));
         navigate('/queries');
       }       
    } catch (err) {
        console.error('error while resume fetching :::: ', err);   
    }
};

export const initUploadResumeThunk = ({files, Bucket, navigate}) => async (dispatch, getState) => {
    const resume_keys = [];
    for(const file of files) {
        const resume_name = file.name;
        const resume_key = `${resume_name}_${Bucket}`;
        resume_keys.push(resume_key);
    }
    const { jobDescription } = getState();
    const {s3_key, s3_bucket} = jobDescription?.key;
    console.log(`jd_key :${s3_key}`);

    const response = await initializeResumeUploadApi({ jd_key:`${s3_key}`, resume_keys });
    // const { id } = response?.data;
    dispatch(setResumeUploadStatus(RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS));
    const { Key } = await uploadFiles({ files, Bucket});
    // dispatch(updateStatusForStep({ id: "match", status: "enabled"}));
    dispatch(updateResumesThunk(resume_keys, 5000, navigate));
    console.log(resume_keys);
}

// export const uploadResumeThunk = ({ file, Bucket }) => async (dis)