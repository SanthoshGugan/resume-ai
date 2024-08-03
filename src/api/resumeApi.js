import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_RESUME_API_GATEWAY_URL}`;

export const fetchResumeSummaryApi = async (req) => {
    return await axios.post(`${BASE_URL}`, {...req });
}