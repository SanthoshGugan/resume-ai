import React, { useState } from "react";
import { fetchJDSummaryApi } from "../api/jdApi";

const useLongPollJDSummary = ({ interval = 5000 }) => {
    const [ status, setStatus ] = useState(null);
    const [ retry, setRetry ] = useState(false);
    const [ summary, setSummary ] = useState("");
    const [ dimensions, setDimensions ] = useState(null);

    const fetchJDSummary = async ({ key, bucket }) => {
        const req = {
            s3_key: key,
            s3_bucket: bucket
        };
        const res = await fetchJDSummaryApi(req);
        const { status, retry, dimensions, summary } = res?.data;
        if (retry && (!dimensions && !summary)) {
            setTimeout(() => {
                fetchJDSummary({ key, bucket});
            }, interval)
            setStatus(status);
            setRetry(retry);
            return;
        }
        setStatus(status);
        setDimensions(dimensions);
        setRetry(retry);
        setSummary(summary);
    }

    return {
        fetchJDSummary,
        dimensions,
        summary
    };
};

export default useLongPollJDSummary;