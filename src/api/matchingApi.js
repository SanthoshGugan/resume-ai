import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_MATCHING_API_GATEWAY_URL}`

export const triggerMatchingApi = async (req) => {
    return await axios.post(`${BASE_URL}/matching_jd_resumes`, { ...req});
};