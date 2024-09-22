import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_JD_API_GATEWAY_URL}`;
const FETCH_JD_SKILL_URL = `${process.env.REACT_APP_JD_SKILL_API_URL}`;
const REACT_APP_UPDATE_JD_API = process.env.REACT_APP_UPDATE_JD_API;

export const fetchJDSummaryApi = async (req) => {
    return await axios.post(`${BASE_URL}`, {...req });
};

export const fetchJdSkillsApi = async (req) => {
    return await axios.post(`${FETCH_JD_SKILL_URL}`, {...req});
};

export const updateJDApi = async (req) => {
    return axios.post(`${REACT_APP_UPDATE_JD_API}`, { ...req });
};