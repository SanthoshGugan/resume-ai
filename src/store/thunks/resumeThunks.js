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

export const uploadResumeThunk = ({file, Bucket}) => async (dispatch, getState) => {
    const resume_name = file.name;
    const resume_key = `${resume_name}_${Bucket}`;
    const { jobDescription } = getState();
    const jd_key = jobDescription?.jd?.id;
    const response = await initializeResumeUploadApi({ jd_key, resume_key });
    const { id } = response?.data;
    const { Key } = await uploadFile({ file, Bucket});
}