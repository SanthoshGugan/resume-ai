import { JD_UPLOAD_STATUS_IMAGE, RESUME_UPLOAD_STATUS_IMAGE } from "../../utils/constants";
import { setLoaderStatusImage, setLoaderStatusMessage } from "../loaderSlice";


export const setJdStatus = ({ status }) => (dispatch, getState) => {
    switch(status) {
        case JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_PROGRESS:
            dispatch(setLoaderStatusMessage("JD Upload In progress"));
            dispatch(setLoaderStatusImage(JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION));
            break;
        case "DIMENSION_EXTRACTION_COMPLETED":
            dispatch(setLoaderStatusMessage("Extracting information from JD"));
            dispatch(setLoaderStatusImage(JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION));
            break;
        case JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION:
            dispatch(setLoaderStatusMessage("Calculating various dimensions..."));
            dispatch(setLoaderStatusImage(JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION));
            break;
        case "EMBEDDING_UPDATED":
            dispatch(setLoaderStatusMessage("Calculating various dimensions..."));
            dispatch(setLoaderStatusImage(JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION));
            break;
        default:
            dispatch(setLoaderStatusMessage("Extracting information from JD"));
            dispatch(setLoaderStatusImage(JD_UPLOAD_STATUS_IMAGE.JD_WORKFLOW_DIMENSION_EXTRACTION));
            break;
    }
};

export const setResumeStatus = () => (dispatch, getState) => {
    dispatch(setLoaderStatusMessage("Extracting information from Resume"));
    dispatch(setLoaderStatusImage(RESUME_UPLOAD_STATUS_IMAGE.RESUME_WORKFLOW));

};