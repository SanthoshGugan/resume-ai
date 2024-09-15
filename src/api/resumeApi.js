import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_RESUME_INITALIZE_UPLOAD_API_GATEWAY_URL}`;
const POLL_BASE_URL = `${process.env.REACT_APP_RESUME_API_GATEWAY_URL}`;
const FETCH_RESUMES_URL = `${process.env.REACT_APP_RESUME_FETCH_BY_ID}`;

export const fetchResumeSummaryApi = async (req) => {
    return await axios.post(`${POLL_BASE_URL}`, {...req });
}

export const initializeResumeUploadApi = async (req) => {
    return await axios.post(`${BASE_URL}/resume_init`, { ...req});
};

export const fetchResumesApi = async (req) => {
    return await axios.post(`${FETCH_RESUMES_URL}`, {...req});
};