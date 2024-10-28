import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_FEATURE_FETCH_USER_API_GATEWAY_URL}`;
const UPDATE_USER_FEATURE_API_URL = process.env.REACT_APP_FEATURE_UPDATE_USER_API_GATEWAY_URL;

export const fetchUserFeature = async (req) => {
    return await axios.post(`${BASE_URL}`, { ...req});
};

export const updateUserFeature = async (req) => {
    return await axios.post(`${UPDATE_USER_FEATURE_API_URL}`, { ...req});
}