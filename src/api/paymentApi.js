import axios from "axios";

const PAYMENT_ORDER_CREATION_API_URL = `${process.env.REACT_APP_PAYMENT_ORDER_CREATION_API_URL}`;
const PAYMENT_COMPLETION_API_URL = `${process.env.REACT_APP_PAYMENT_COMPLETION_API_URL}`;

export const paymentOrderCreationApi = async (req) => {
    return await axios.post(`${PAYMENT_ORDER_CREATION_API_URL}`, {...req });
};

export const paymentCompletionApi = async (req) => {
    return await axios.post(`${PAYMENT_COMPLETION_API_URL}`, {...req});
};
