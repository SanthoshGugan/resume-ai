import React from "react";
import { triggerMatchingApi } from "../api/matchingApi";

const useMatching = ({}) => {

    const triggerMatching = async ({ jd_key }) => {
        const req = { jd_key };
        await triggerMatchingApi(req);
    }
    return {
        triggerMatching
    };
};

export default useMatching;