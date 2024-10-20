import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_FEATURE_FETCH_USER_API_GATEWAY_URL}`;

export const fetchUserFeature = async (req) => {
    return await axios.post(`${BASE_URL}`, { ...req});
};