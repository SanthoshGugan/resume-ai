import React, { useState } from "react";
import { fetchResumeSummaryApi } from "../api/resumeApi";
import { domainToCardMapper } from "../utils/jdUtils";

const useLongPollResumeSummary = ({ interval = 5000 }) => {
    const [ status, setStatus ] = useState(null);
    const [ retry, setRetry ] = useState(false);
    const [ summary, setSummary ] = useState("");
    const [ dimensions, setDimensions ] = useState(null);

    const fetchResumeSummary = async ({ key, bucket }) => {
        const req = {
            s3_key: key,
            s3_bucket: bucket
        };
        const res = await fetchResumeSummaryApi(req);
        const { status, retry, dimensions, summary } = res?.data;
        if (retry && !dimensions && !summary) {
            setTimeout(() => {
                fetchResumeSummary({ key, bucket});
            }, interval)
            setStatus(status);
            setRetry(retry);
            return;
        }
        setStatus(status);
        setDimensions(domainToCardMapper(dimensions));
        setRetry(retry);
        setSummary(summary);
    }

    return {
        fetchResumeSummary,
        dimensions,
        summary
    };
};

export default useLongPollResumeSummary;