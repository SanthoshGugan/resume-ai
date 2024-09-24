import React, { useState } from "react";
import FileUploader from "../FileUploader";
import { initUploadResumeThunk } from "../../store/thunks/resumeThunks";
import { useDispatch, useSelector } from "react-redux";

const BUCKET_NAME = `${process.env.REACT_APP_RESUME_BUCKET_NAME}`;

// todo: hardcoded jd_key for now, it should be fetched from store.
const ResumesUploadHoc = ({ jd_key = 'tc1-jd.pdf_jd-assets-008971676609' }) => {
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
        // const file = uploadedFiles;
        if (!uploadedFiles) return;
        dispatch(initUploadResumeThunk({ files: uploadedFiles, Bucket: BUCKET_NAME }));
        // const resume_name = file.name;
        // const resume_key = `${resume_name}_${BUCKET_NAME}`;
        // const id = await initializeResumeUpload({ jd_key, resume_key })
        // const { Key } = await uploadFile({ file, Bucket: BUCKET_NAME });
        // await fetchResumeSummary({ key: Key, bucket: BUCKET_NAME });
    };

    return (
        <>
            <FileUploader 
                onAddFiles={onAddFiles}  
                onRemoveFiles={onRemoveFiles}
                onCancel={onCancel}
                multiple={true}
                description="Drag & Drop your Resume or Add Files"
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

export default ResumesUploadHoc;
