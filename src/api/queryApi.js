import axios from "axios"

const QUERY_API_BASE_URL = `${process.env.REACT_APP_QUERY_API_GATEWAY_URL}`;

export const fetchQueriesApi = async (req) => {
    return await axios.post(`${QUERY_API_BASE_URL}`, {...req });
}