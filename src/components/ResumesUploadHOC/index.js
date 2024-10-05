import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader";
import { initUploadResumeThunk } from "../../store/thunks/resumeThunks";
import { useDispatch, useSelector } from "react-redux";
import { setIsResumeAdded } from "../../store/resumeSlice";
import { useNavigate } from 'react-router-dom';
import { RESUME_UPLOAD_STATUS } from "../../utils/constants";
import ScreenProgress from "../ScreenProgress";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { isResumeUploadInProgress } from "../../store/selectors/resumeSelector";
import StartOver from "../StartOver/StartOver";
import StatusBox from "../StatusBox/StatusBox";

const BUCKET_NAME = `${process.env.REACT_APP_RESUME_BUCKET_NAME}`;

const ResumesUploadHoc = ({ jd_key = 'tc1-jd.pdf_jd-assets-008971676609' }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access resumeUploadStatus from the Redux store
    const resumeUploadStatus = useSelector((state) => state.resumes.resumeUploadStatus);

    const isResumeUplodInProgressFlag = useSelector((state) => isResumeUploadInProgress(state)); 

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

    console.log(`isResumeUplodInProgressFlag ${isResumeUplodInProgressFlag}`);

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
                    <Row className="d-flex justify-content-center align-items-center">
                        <StartOver />
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
                disabled={isResumeUplodInProgressFlag}
            />
            {uploadedFiles.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", flexDirection: 'column' }}>
                    <button
                        onClick={onUpload}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            padding: "10px 15px",
                            opacity: isResumeUplodInProgressFlag ? "0.5" : "1"
                        }}
                        disabled = {isResumeUplodInProgressFlag}
                    >
                        Upload Files
                        {isResumeUplodInProgressFlag && <Spinner style={{ marginLeft: '5px' }}size="sm"/>}
                    </button>
                    {(isResumeUplodInProgressFlag) && (
                        <Container className="d-flex justify-content-center align-items-center">
                            <StatusBox />
                        </Container>
                    )}

                </div>
            )}
        </>
    );
};

export default ResumesUploadHoc;
