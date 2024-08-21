import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_MATCHING_API_GATEWAY_URL}`;

const BASE_MATCIHNG_POLL_URL = `${process.env.REACT_APP_MATCHING_SUMMARY_POLLING_URL}`;

export const triggerMatchingApi = async (req) => {
    return await axios.post(`${BASE_URL}/matching_jd_resumes`, { ...req});
};

export const pollSummaryApi = async (req) => {
    return await axios.post(`${BASE_MATCIHNG_POLL_URL}/poll_matching_summary`, { ...req});
};