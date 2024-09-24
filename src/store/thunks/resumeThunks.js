import { fetchResumesApi } from "../../api/resumeApi";
import { addFetchInProgress, addResume, removeFetchInProgress } from "../resumeSlice";
import { uploadFile } from "../../api/s3FileUploadApi";
import { initializeResumeUploadApi } from "../../api/resumeApi";

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

export const initUploadResumeThunk = ({files, Bucket}) => async (dispatch, getState) => {
    const resume_keys = [];
    for(const file of files) {
        const resume_name = file.name;
        const resume_key = `${resume_name}_${Bucket}`;
        resume_keys.push(resume_key);
    }
    const { jobDescription } = getState();
    const jd_key_object = jobDescription?.key;
    const {s3_key, s3_bucket} = jd_key_object;

    const response = await initializeResumeUploadApi({ jd_key:`${s3_key}_${s3_bucket}`, resume_keys });
    // const { id } = response?.data;
    const { Key } = await uploadFile({ files, Bucket});
}

// export const uploadResumeThunk = ({ file, Bucket }) => async (dis)