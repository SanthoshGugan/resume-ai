import React, { useState } from "react";
import { fetchJDSummaryApi } from "../api/jdApi";
import { domainToCardMapper } from "../utils/jdUtils";
export const MOCK_DIMENSIONS = "[{\"domain\":\"software_engineering\",\"roles\":[{\"role\":\"full_stack\",\"skills\":[{\"skill\":\"front_end\",\"label\":\"Front End\",\"schema\":\"front_end\",\"categories\":[{\"category\":\"core\",\"schema\":\"core_schema\",\"attributes\":[{\"core_skill\":\"5\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"JavaScript\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"+\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"CSS\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Mobx\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Webpack\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Babel\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"npm\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"problem-solving skills\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Git\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"automated testing\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Jest\",\"expertise\":\"intermediate\",\"YoE\":\"4\"}]}]},{\"skill\":\"back_end\",\"label\":\"Backend\",\"schema\":\"back_end\",\"categories\":[{\"category\":\"core\",\"schema\":\"core_schema\",\"attributes\":[{\"core_skill\":\"5\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"JavaScript\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"+\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"CSS\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Mobx\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Webpack\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Babel\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"npm\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"problem-solving skills\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Git\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"automated testing\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Jest\",\"expertise\":\"intermediate\",\"YoE\":\"4\"}]}]},{\"skill\":\"database\",\"schema\":\"database\",\"label\":\"Database\",\"categories\":[{\"category\":\"core\",\"schema\":\"core_schema\",\"attributes\":[{\"core_skill\":\"5\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"JavaScript\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"+\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"CSS\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Mobx\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Webpack\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Babel\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"npm\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"problem-solving skills\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Git\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"automated testing\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Jest\",\"expertise\":\"intermediate\",\"YoE\":\"4\"}]}]},{\"skill\":\"devops\",\"schema\":\"front_end\",\"label\":\"DevOps\",\"categories\":[{\"category\":\"core\",\"schema\":\"core_schema\",\"attributes\":[{\"core_skill\":\"5\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"JavaScript\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"+\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"CSS\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Mobx\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Webpack\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Babel\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"npm\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"problem-solving skills\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Git\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"automated testing\",\"expertise\":\"intermediate\",\"YoE\":\"4\"},{\"core_skill\":\"Jest\",\"expertise\":\"intermediate\",\"YoE\":\"4\"}]}]}]}]}]";
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


    const fetchJDSummary = async ({ key }) => {
        const req = {
            s3_key: key
        };
        const res = await fetchJDSummaryApi(req);
        const { status, retry, dimensions, summary } = res?.data;
        if (retry && (!summary || !dimensions)) {
            setTimeout(() => {
                fetchJDSummary({ key });
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
        fetchJDSummary,
        dimensions,
        summary
    };
};

export default useLongPollJDSummary;