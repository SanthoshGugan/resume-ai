export const QUERIES = {
    SIMILARITY: "jd_resume_similarity",
    LABEL: "label",
    COMPANIES: "companies"
};

export const RESUME_UPLOAD_STATUS = {
    RESUME_WORKFLOW_PROGRESS: "RESUME_WORKFLOW_PROGRESS",
    RESUME_WORKFLOW_FAILED: "RESUME_WORKFLOW_FAILED",
    RESUME_WORKFLOW_COMPLETED: "RESUME_WORKFLOW_COMPLETED",
    RESUME_WORKFLOW_IDLE: "RESUME_WORKFLOW_IDLE"
};

export const JD_UPLOAD_STATUS = {
    JD_WORKFLOW_PROGRESS: "JD_WORKFLOW_PROGRESS",
    JD_WORKFLOW_FAILED: "JD_WORKFLOW_FAILED",
    JD_WORKFLOW_COMPLETED: "JD_WORKFLOW_COMPLETED",
    JD_WORKFLOW_IDLE: "JD_WORKFLOW_IDLE"
};

export const JD_UPDATE_SKILL_STATUS = {
    IN_PROGRESS: "JD_UPDATE_SKILL_PROGRESS",
    IDLE: "JD_UPDATE_SKILL_IDLE",
    COMPLETED: "JD_UPDATE_SKILL_COMPLETED",
    FAILED: "JD_UPDATE_SKILL_FAILED"
};

export const KEY_DELIMTER = "_____";

export const DOWNLOAD_CSV_HEADER = {
    CANDIDATE_NAME: "Candidate Name",
    OVERALL_MATCHING: "Overall Matching",
    FILENAME: "FileName"
}

export const JD_UPLOAD_STATUS_IMAGE = {
    JD_WORKFLOW_PROGRESS: "./jd/status_jd_upload_in_progress.png",
    JD_WORKFLOW_TEXT_EXTRACTION: "./jd/status_jd_upload_text_extraction.png",
    JD_WORKFLOW_DIMENSION_EXTRACTION: "./jd/status_jd_upload_dimension_extraction.png",
    JD_WORKFLOW_SUMMARY: "./jd/status_jd_upload_summary.png"
};