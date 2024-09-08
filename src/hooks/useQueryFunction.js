import React from "react";
import { queryFunctionApi } from "../api/queryFunctionApi";

const useQueryFunction = ({}) => {
    const queryFunctionTriggerApi = async ({ queries, jd_key }) => {
        const response = await queryFunctionApi({ queries, jd_key });
        return response?.data;
    };
    return {
        queryFunctionTriggerApi
    };
};

export default useQueryFunction;