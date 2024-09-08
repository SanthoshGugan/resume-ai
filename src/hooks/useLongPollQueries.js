import React, { useState } from "react";
import { fetchQueriesApi } from "../api/queryApi";

const useLongPollQueries = ({ interval = 5000 }) => {
    const [ queries, setQueries ] = useState(null);

    const fetchQuerySummary = async ({ jd_key }) => {
        const res = await fetchQueriesApi({jd_key});
        const { queries } = res?.data;
        
        setTimeout(() => {
            fetchQuerySummary({ jd_key });
        }, interval)

        setQueries(queries);
    }

    return {
        fetchQuerySummary,
        queries
    };
};

export default useLongPollQueries;