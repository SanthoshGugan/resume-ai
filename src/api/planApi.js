import axios from "axios";

const FETCH_PLANS_URL = `${process.env.REACT_APP_FETCH_PLANS_URL}`;

export const fetchAllPlans = async (req) => {
    return await axios.post(`${FETCH_PLANS_URL}`, {...req });
};