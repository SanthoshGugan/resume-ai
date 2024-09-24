import React, { useState } from "react";
import FileUploader from "../FileUploader";
import { uploadJDThunk } from "../../store/thunks/jdThunks";
import { useDispatch, useSelector } from "react-redux";

const BUCKET_NAME = `${process.env.REACT_APP_JD_BUCKET_NAME}`;

const JDUploadHoc = ({}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const dispatch = useDispatch();

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

        dispatch(uploadJDThunk({file, Bucket: BUCKET_NAME}));

    };

    return (
        <>
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
        </>
    );
};

export default JDUploadHoc;
