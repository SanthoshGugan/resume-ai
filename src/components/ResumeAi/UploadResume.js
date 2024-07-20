import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

const UploadResume = ({ }) => {

    const [ files, setFiles] = useState([]);

    const handleFileUpload = (event) => {
        const files = event.target.files;
        setFiles(files);
    };

    const handleMockFileUpload = () => {
        const inputEle = document.getElementById("resume_upload_key");
        inputEle.click();

    }
    return (
        <Container>
            <input type="file" accept="image/*" onChange={handleFileUpload} id="resume_upload_key" style={{ display: "none"}}/>
            <Button onClick={handleMockFileUpload}>Upload Resume</Button>
            {files?.length > 0 && (<>{files.length} files selected</>)}
        </Container>
    );
};

export default UploadResume;