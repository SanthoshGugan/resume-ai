import React from "react";
import { initializeResumeUploadApi } from "../api/resumeApi";

const useInitializeResume = ({}) => {
    const initializeResumeUpload = async ({ jd_key, resume_key }) => {
        const response = await initializeResumeUploadApi({jd_key, resume_key});
        const { id } = response?.data;
        return id;
    };
    return {
        initializeResumeUpload
    };
};

export default useInitializeResume;