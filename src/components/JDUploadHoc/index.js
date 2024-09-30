import React, { useEffect, useState } from "react";
import { fetchGlobalSkills, skipSkillUpdateThunk, updateJdThunk, uploadJDThunk } from "../../store/thunks/jdThunks";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import SkillSelector from "../JD/SkillSelector";
import { isJdUpdateSkillVisible, selectJdSkillUpdateStatus } from "../../store/selectors/jdSkillSelector";
import { setIsJDAdded } from "../../store/jobDescriptionSlice";
import { useNavigate } from 'react-router-dom';
import JDFileUploader from "../JDFileUpload";
import { FaCheckCircle } from "react-icons/fa";
import { isDimensionsChanged, isJDUpdateSkillInProgressSelector, isJDUploadInProgress } from "../../store/selectors/jdSelector";

const BUCKET_NAME = `${process.env.REACT_APP_JD_BUCKET_NAME}`;

const CompletionBanner = () => {
    return (
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={10}>
                <Alert variant="success" className="d-flex align-items-center" style={{ margin: '1rem 0' }}>
                    <FaCheckCircle style={{ fontSize: '24px', marginRight: '10px' }} />
                    <div>
                        <strong>JD Upload and Skill Update Completed!</strong> Please proceed with the next steps.
                    </div>
                </Alert>
            </Col>
        </Row>
    );
};

const JDUploadHoc = ({ }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [showAlert, setShowAlert] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateFlag = useSelector(state => isJdUpdateSkillVisible(state, ""));
    const jdUploadStatus = useSelector((state) => state.jobDescription.jdUploadStatus);
    const progressMessages = ["Uploading..."];
    const jdSkillUpdateStatus = useSelector(state => selectJdSkillUpdateStatus(state));
    const jdUploadInProgressFlag = useSelector(state => isJDUploadInProgress(state));
    const isJdUpdateSkillInProgress = useSelector(state => isJDUpdateSkillInProgressSelector(state));
    const dimensionsChanged = useSelector(state => isDimensionsChanged(state));

    const onAddFiles = (files) => {
        console.log(`onAddFiles files: ${files}`);
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);
        dispatch(setIsJDAdded(true))
    };

    const onRemoveFiles = (files) => {
        setUploadedFiles(files)
        // Optionally handle file removal here
    };

    const onCancel = (event) => {
        console.log(`onCancel ${event}`);
    };

    const onUpload = async (event) => {
        console.log(`onUpload ${event}`);
        // Handle the actual upload logic here
        console.log(uploadedFiles);
        const file = uploadedFiles[0];

        if (!uploadedFiles || !file) return;

        console.log(`bucket name : ${BUCKET_NAME}`);

        dispatch(uploadJDThunk({ file, Bucket: BUCKET_NAME }));

    };

    const skipNext = async (event) => {
        dispatch(skipSkillUpdateThunk());
        navigate('/resume-upload')
    }


    const handleClose = () => setShowAlert(false);

    useEffect(() => {
        dispatch(fetchGlobalSkills());
    }, [])

    if (jdSkillUpdateStatus == 'completed') return <CompletionBanner />;

    return (
        <div>
            {!updateFlag && (<JDFileUploader
                onAddFiles={onAddFiles}
                onRemoveFiles={onRemoveFiles}
                onCancel={onCancel}
                description="Select Job Description File"
                disabled={jdUploadInProgressFlag}
            />)}
            {uploadedFiles.length > 0 && !updateFlag && (  // Conditionally render upload button
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button
                        onClick={onUpload}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            padding: "10px 15px",
                        }}
                        disabled={jdUploadInProgressFlag}
                    >
                        Upload
                        {jdUploadInProgressFlag && <Spinner style={{ marginLeft: '5px' }}size="sm"/>}
                    </Button>
                </div>
            )}
            {updateFlag && (
                <Container className="d-flex flex-wrap justify-content-center align-items-center mt-3">
                    {showAlert && (<Alert variant="success" onClose={handleClose}>
                        {/* <Alert.Heading>Job Description Uploaded!</Alert.Heading> */}
                        <Row>
                            <Col md={11}>
                                Your Job Description has been successfully uploaded. You can now update the skills if necessary, or skip this step to proceed further.
                            </Col>
                            <Col className="d-flex justify-content-end">
                                <Button onClick={handleClose} variant="outline-info">
                                    Got it
                                </Button>
                            </Col>
                        </Row>
                    </Alert>)}
                    <SkillSelector />
                </Container>
            )}
            {updateFlag && (
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={3} style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

                        <Button 
                            variant="primary"
                            onClick={() => dispatch(updateJdThunk())}
                            disabled={isJdUpdateSkillInProgress || !dimensionsChanged}
                        >
                            Update Skill
                            {isJdUpdateSkillInProgress && <Spinner size="sm"/>}
                        </Button>
                        <Button
                            variant="success"
                            onClick={skipNext}
                            disabled={isJdUpdateSkillInProgress || dimensionsChanged}
                        >
                            Continue
                            {isJdUpdateSkillInProgress && <Spinner size="sm"/>}

                        </Button>
                    </Col>
                </Row>
            )}


            {/* Conditionally render status overlay based on jdUploadStatus */}
            {/* {jdUploadStatus === JD_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS && (
                <ScreenProgress
                    sourceStatus={jdUploadStatus}
                    targetStatus={JD_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS}
                    progressMessages={progressMessages}
                />
            )} */}
        </div>
    );
};

export default JDUploadHoc;
