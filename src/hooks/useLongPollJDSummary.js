import React, { useState } from "react";
import { fetchJDSummaryApi } from "../api/jdApi";

export const MOCK_JD_SUMMARY = {
	cards: [
		{
			type: "SKill",
			name: "Front End",
			content: 
			[
				{
					type: "List",
					heading: "Core Skills",
					items: [
						{
							name: "HTML"
						},
						{
							name: "CSS"
						},
					]
				},
				{
					type: "List",
					heading: "Frameworks",
					items: [
						{
							name: "Vue.js"
						},
						{
							name: "CSS"
						},
					]
				}
			]
		},
		{
			type: "SKill",
			name: "Backend",
			content: 
			[
				{
					type: "List",
					heading: "Core Skills",
					items: [
						{
							name: "OOPS"
						},
						{
							name: "REST API"
						},
                    ]
				},
				{
					type: "List",
					heading: "Frameworks",
					items: [
						{
							name: "Node.js"
						},
						{
							name: "Express.js"
						},
						{
							name: "Java"
						},
						{
							name: "Python"
						},
						{
							name: "PHP"
						}
					]
				}
			]
		}
	]
	
};

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
        if (retry && !summary) {
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