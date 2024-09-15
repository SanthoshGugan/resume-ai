import { fetchResumesApi } from "../../api/resumeApi";
import { addFetchInProgress, addResume, removeFetchInProgress } from "../resumeSlice";


export const fetchResumesThunk = ({keys = [], interval = 5000}) => async (dispatch, getState) => {
    console.log(`keys ::: ${JSON.stringify(keys)}`);
    const { resumes } = getState();
    const { fetchInProgress, allIds } = resumes;
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