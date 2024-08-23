import React, { useState } from "react";
import { pollSummaryApi } from "../api/matchingApi";

export const MOCK_QUERY_SUMMARY = {
    topResume: {
        sentence: "The resume [single-page.pdf_resume-assets-008971676609] is a top match with the job description, showing a similarity of 80.77%",
        resume_id: "[single-page.pdf_resume-assets-008971676609",
        matchPercent: 80.77
    },
    topListResume: {
        sentence: "Here is the top 2 resumes matching job description. \n1. Resume [single-page.pdf_resume-assets-008971676609] matches 80.77% \n2. Resume [Profile_2.pdf_resume-assets-008971676609] matches 72.66%",
        list: [
            {
                resume_id: "single-page.pdf_resume-assets-008971676609",
                matchPercent: 80.77
            }
        ]
    },
    groupByLabels: {
        full_stack:[
            "Get_Started_With_Smallpdf-output.pdf_resume-assets-008971676609",
            "Profile.pdf_resume-assets-008971676609",
            "Profile_2.pdf_resume-assets-008971676609",
            "single-page.pdf_resume-assets-008971676609"
        ]
    }
}

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
        setSummary(JSON.parse(summary));
    }

    return {
        fetchMatchingSummary,
        summary
    };
};

export default useLongPollMatchingSummary;