import React from "react";
import { fetchQueriesApi } from "../api/queryApi";

const useQueries = ({}) => {
    const queryApi = async ({ jd_key }) => {
        const response = await fetchQueriesApi({jd_key});
        return response?.data;
    };
    return {
        queryApi
    };
};

export default useQueries;