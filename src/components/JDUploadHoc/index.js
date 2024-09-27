import React, { useEffect, useState } from "react";
import FileUploader from "../FileUploader";
import { fetchGlobalSkills, updateJdThunk, uploadJDThunk } from "../../store/thunks/jdThunks";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import SkillSelector from "../JD/SkillSelector";
import SkillBadge from "../JD/SkillBadge";
import Avatar from "../Avatar";
import { isJdUpdateSkillVisible, selectSkillsFromAllCategory } from "../../store/selectors/jdSkillSelector";
import { setIsJDAdded, setIsJDUploaded } from "../../store/jobDescriptionSlice";
import { useNavigate } from 'react-router-dom';
import { JD_UPLOAD_STATUS } from "../../utils/constants";
import ScreenProgress from "../ScreenProgress";

const BUCKET_NAME = `${process.env.REACT_APP_JD_BUCKET_NAME}`;

const JDUploadHoc = ({}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const skills = useSelector(state => selectSkillsFromAllCategory(state, ""));

    const updateFlag = useSelector(state => isJdUpdateSkillVisible(state, ""));
    const jdUploadStatus = useSelector((state) => state.jobDescription.jdUploadStatus);
    const progressMessages = ["Uploading..."];

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

        dispatch(uploadJDThunk({file, Bucket: BUCKET_NAME}));

    };

    const skipNext = async (event) => {
        navigate('/home/resume-upload')
    }

    useEffect(() => {
        dispatch(fetchGlobalSkills());
    }, [])

    return (
        <Container>
            <FileUploader 
                onAddFiles={onAddFiles}  
                onRemoveFiles={onRemoveFiles}
                onCancel={onCancel}
                description="Drag & Drop Your JD or Add Files"
            />
            {uploadedFiles.length > 0 && (  // Conditionally render upload button
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
            {updateFlag && (<Container  className="d-flex flex-wrap">
                <SkillSelector />
                
                <Container  className="d-flex flex-wrap">
                    {skills.map((item, idx) => 
                    <SkillBadge key={idx}
                        category={<Avatar initials={item?.categoryName.substring(0,2)} />}
                        tooltipText={item?.categoryName}
                        label={item?.skill }
                        onRemove={(e) => {}}
                    />)}
                </Container>
                <Button onClick={() => dispatch(updateJdThunk())}>Update Skill</Button>
                <Button onClick={skipNext}>Skip</Button>
            </Container>)}
             {/* Conditionally render status overlay based on jdUploadStatus */}
             {jdUploadStatus === JD_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS && (
                <ScreenProgress
                    sourceStatus={jdUploadStatus}
                    targetStatus={JD_UPLOAD_STATUS.RESUME_WORKFLOW_PROGRESS}
                    progressMessages={progressMessages}
                />
            )}
        </Container>
    );
};

export default JDUploadHoc;
