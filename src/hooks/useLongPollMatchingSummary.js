import React, { useState } from "react";
import { pollSummaryApi } from "../api/matchingApi";

const useLongPollMatchingSummary = ({ interval = 5000 }) => {
    const [ retry, setRetry ] = useState(false);
    const [ summary, setSummary ] = useState("");

    const fetchMatchingSummary = async ({ jd_key }) => {
        const req = {
            jd_key
        };
        const res = await pollSummaryApi(req);
        const { retry, summary } = res?.data;
        if (retry && !summary) {
            setTimeout(() => {
                fetchMatchingSummary({ jd_key });
            }, interval)
            setRetry(retry);
            return;
        }
        setRetry(retry);
        setSummary(summary);
    }

    return {
        fetchMatchingSummary,
        summary
    };
};

export default useLongPollMatchingSummary;