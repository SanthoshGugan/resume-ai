import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader";
import { initUploadResumeThunk } from "../../store/thunks/resumeThunks";
import { useDispatch, useSelector } from "react-redux";
import { setIsResumeAdded } from "../../store/resumeSlice";
import { useNavigate } from 'react-router-dom';
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";
import ScreenProgress from "../ScreenProgress";
import { Alert, Col, Container, Row } from "react-bootstrap";

const BUCKET_NAME = `${process.env.REACT_APP_RESUME_BUCKET_NAME}`;

const ResumesUploadHoc = ({ jd_key = 'tc1-jd.pdf_jd-assets-008971676609' }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access resumeUploadStatus from the Redux store
    const resumeUploadStatus = useSelector((state) => state.resumes.resumeUploadStatus);

    // Array of progress messages
    const progressMessages = ["Initializing...", "Preparing...", "Computing...", "Matching...", "Finalizing..."];

    const onAddFiles = (files) => {
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);
        dispatch(setIsResumeAdded(true));
    };

    const onUpload = async () => {
        if (!uploadedFiles.length) return;
        dispatch(initUploadResumeThunk({ files: uploadedFiles, Bucket: BUCKET_NAME, navigate }));
    };
    const onRemoveFiles = async (files) => {
        setUploadedFiles(files);
    }
    const onCancel = async (files) => {

    }

    if (resumeUploadStatus === 'completed') {
        return (
            <Container className="d-flex flex-wrap justify-content-center align-items-center mt-3">
                <Alert variant="success">
                    {/* <Alert.Heading>Job Description Uploaded!</Alert.Heading> */}
                    <Row>
                        <Col md={11}>
                            Your Resumes have been successfully uploaded.
                        </Col>
                    </Row>
                </Alert>
            </Container>
        )
    }

    return (
        <>
            <FileUploader
                onAddFiles={onAddFiles}
                multiple={true}
                description="Add Resumes"
                onRemoveFiles={onRemoveFiles}
                onCancel={onCancel}
            />
            {uploadedFiles.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button
                        onClick={onUpload}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            padding: "10px 15px"
                        }}
                    >
                        Upload Files
                    </button>
                </div>
            )}

            {/* Conditionally render status overlay based on resumeUploadStatus */}
            {resumeUploadStatus === RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS && (
                <ScreenProgress
                    sourceStatus={resumeUploadStatus}
                    targetStatus={RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS}
                    progressMessages={progressMessages}
                />
            )}
        </>
    );
};

export default ResumesUploadHoc;
