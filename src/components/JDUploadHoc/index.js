import React, { useEffect, useState } from "react";
import FileUploader from "../FileUploader";
import { fetchGlobalSkills, updateJdThunk, uploadJDThunk } from "../../store/thunks/jdThunks";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import SkillSelector from "../JD/SkillSelector";
import SkillBadge from "../JD/SkillBadge";
import Avatar from "../Avatar";
import { isJdUpdateSkillVisible, selectSkillsFromAllCategory } from "../../store/selectors/jdSkillSelector";

const BUCKET_NAME = `${process.env.REACT_APP_JD_BUCKET_NAME}`;

const JDUploadHoc = ({}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const dispatch = useDispatch();

    const skills = useSelector(state => selectSkillsFromAllCategory(state, ""));

    const updateFlag = useSelector(state => isJdUpdateSkillVisible(state, ""));

    const onAddFiles = (files) => {
        console.log(`onAddFiles files: ${files}`);
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);
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
                    {skills.map(item => 
                    <SkillBadge
                        category={<Avatar initials={item?.categoryName.substring(0,2)} />}
                        tooltipText={item?.categoryName}
                        label={item?.skill }
                        onRemove={(e) => {}}
                    />)}
                </Container>
                <Button onClick={() => dispatch(updateJdThunk())}>Update Skill</Button>
            </Container>)}
        </Container>
    );
};

export default JDUploadHoc;
