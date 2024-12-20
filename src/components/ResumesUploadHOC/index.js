import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader";
import { initUploadResumeThunk } from "../../store/thunks/resumeThunks";
import { useDispatch, useSelector } from "react-redux";
import { setIsResumeAdded } from "../../store/resumeSlice";
import { useNavigate } from 'react-router-dom';
import { RESUME_UPLOAD_STATUS, USER_FLAGS } from "../../utils/constants";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { isResumeUploadInProgress } from "../../store/selectors/resumeSelector";
import StartOver from "../StartOver/StartOver";
import StatusBox from "../StatusBox/StatusBox";
import { FaCheckCircle, FaRegWindowClose } from "react-icons/fa";
import usePermissions from "../../hooks/usePermissions";

const BUCKET_NAME = `${process.env.REACT_APP_RESUME_BUCKET_NAME}`;

const ResumesUploadHoc = ({ }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [ resumeUploadDenied, setResumeUploadDenied ] = useState(false);
    // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { 
        [USER_FLAGS.ALLOWED_RESUMES_PER_MATCH]: allowedResumesCount
    } = usePermissions([{ name: USER_FLAGS.ALLOWED_RESUMES_PER_MATCH, defaultVal: 100}]);

    // Access resumeUploadStatus from the Redux store
    const resumeUploadStatus = useSelector((state) => state.resumes.resumeUploadStatus);

    const isResumeUplodInProgressFlag = useSelector((state) => isResumeUploadInProgress(state));

    const isResumeUploadFailed = resumeUploadStatus === RESUME_UPLOAD_STATUS.RESUME_WORKFLOW_FAILED;

    const onAddFiles = (files) => {
        const uploadFiles = [...uploadedFiles, ...files];
        if (uploadFiles?.length > allowedResumesCount) {
            setResumeUploadDenied(true);
        } else {
            setResumeUploadDenied(false);
        }
        setUploadedFiles(uploadFiles);
        dispatch(setIsResumeAdded(true));
    };

    const onUpload = async () => {
        if (!uploadedFiles.length) return;
        dispatch(initUploadResumeThunk({ files: uploadedFiles, Bucket: BUCKET_NAME, navigate }));
    };
    const onRemoveFiles = async (files) => {
        setUploadedFiles(files);
        if (files?.length <= allowedResumesCount) {
            setResumeUploadDenied(false);
        }
    }
    const onCancel = async (files) => {

    }

    if (resumeUploadStatus === 'completed') {
        return (
            <Container className="d-flex flex-wrap justify-content-center align-items-center mt-3" style={{ gap: '2rem' }}>
                <Alert variant="success">
                    {/* <Alert.Heading>Job Description Uploaded!</Alert.Heading> */}
                    <Row>
                        <Col md={12}>
                            <FaCheckCircle style={{ fontSize: '30px', marginRight: '10px' }} />
                            Your Resumes have been successfully uploaded.
                        </Col>
                    </Row>
                </Alert>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col style={{ marginBottom: '1rem' }}>
                        <StartOver asIcon /></Col>
                </Row>
            </Container>
        )
    }

    return (
        <>
            {isResumeUploadFailed && uploadedFiles.length > 0 && (
                <Container className="d-flex flex-wrap justify-content-center align-items-center mt-3" style={{ gap: '2rem' }}>
                    <Alert variant="warning">
                        <Row>
                            <Col md={12}>
                                <FaRegWindowClose style={{ fontSize: '30px', marginRight: '10px', color: 'red' }} />
                                    Resume upload failed.
                            </Col>
                        </Row>
                    </Alert>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col style={{ marginBottom: '1rem' }}>
                            <StartOver asIcon /></Col>
                    </Row>
                </Container>
            )}
            {resumeUploadDenied && (
                <Container className="d-flex flex-wrap justify-content-center align-items-center mt-3" style={{ gap: '2rem' }}>
                <Alert variant="warning">
                    {/* <Alert.Heading>Job Description Uploaded!</Alert.Heading> */}
                    <Row>
                        <Col md={10}>
                            <FaRegWindowClose style={{ fontSize: '30px', marginRight: '10px', color: 'red' }} />
                                Exceeded resume upload count. Max allowed resumes are {allowedResumesCount}
                        </Col>
                        <Col md="auto">Purchase</Col>
                    </Row>
                </Alert>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col style={{ marginBottom: '1rem' }}>
                        <StartOver asIcon /></Col>
                </Row>
            </Container>
            )

            }
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
                            opacity: (isResumeUplodInProgressFlag ||isResumeUploadFailed || resumeUploadDenied  )  ? "0.5" : "1"
                        }}
                        disabled={isResumeUplodInProgressFlag || isResumeUploadFailed || resumeUploadDenied}
                    >
                        <span className="fw-semibold">Upload Files</span>
                        {isResumeUplodInProgressFlag && <Spinner style={{ marginLeft: '5px' }} size="sm" />}
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
