import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_JD_API_GATEWAY_URL}`;

export const fetchJDSummaryApi = async (req) => {
    return await axios.post(`${BASE_URL}`, {...req });
}