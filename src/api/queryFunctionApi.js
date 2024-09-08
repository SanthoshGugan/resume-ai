import axios from "axios"

const QUERY_FUNCTION_API_BASE_URL = `${process.env.REACT_APP_QUERY_FUNCTION_API_GATEWAY_URL}`;

export const queryFunctionApi = async (req) => {
    return await axios.post(`${QUERY_FUNCTION_API_BASE_URL}`, {...req });
}