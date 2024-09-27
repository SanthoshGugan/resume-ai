import { fetchResumesApi, fetchResumeSummaryApi } from "../../api/resumeApi";
import { addFetchInProgress, addResume, addResumes, removeFetchInProgress, setIds } from "../resumeSlice";
import { uploadFile, uploadFiles } from "../../api/s3FileUploadApi";
import { initializeResumeUploadApi } from "../../api/resumeApi";
import { setIsJDUploaded } from "../jobDescriptionSlice";
import { updateStatusForStep } from "../timelineSlice";

export const fetchResumesThunk = ({keys = [], interval = 5000}) => async (dispatch, getState) => {
    // console.log(`keys ::: ${JSON.stringify(keys)}`);
    const { resumes } = getState();
    const { fetchInProgress, allIds } = resumes;
    if (keys.length === 0) return;
    try {
        const filteredResumeKeys = keys.filter(key => !allIds.includes(key));
        for(const resumeId of filteredResumeKeys) {
            // dispatch(addFetchInProgress({resumeId}))
        }
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

export const updateResumesThunk = (ids =[], interval = 5000) => async (dispatch, getState) => {
    // console.log(`keys ::: ${JSON.stringify(keys)}`);
    try {
       const res = await fetchResumeSummaryApi({
        resumeIds: ids
       });
       const data = res?.data;
       dispatch(addResumes(data));
       
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
    console.log(`jd_key :${s3_key}_${s3_bucket}`);

    const response = await initializeResumeUploadApi({ jd_key:`${s3_key}_${s3_bucket}`, resume_keys });
    // const { id } = response?.data;
    const { Key } = await uploadFiles({ files, Bucket});
    dispatch(setIsJDUploaded(true));
    dispatch(updateStatusForStep({ id: "match", status: "enabled"}));
    dispatch(setIds(resume_keys));
    dispatch(updateResumesThunk(resume_keys));
    navigate('/home/queries')
    // navigate('/home/resume-upload')
    console.log(resume_keys);
}

// export const uploadResumeThunk = ({ file, Bucket }) => async (dis)