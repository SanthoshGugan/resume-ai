import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import UploadResume from "../ResumeAi/UploadResume";
import useUploadToS3 from "../../hooks/useUploadToS3";

const JDUpload = ({ }) => {

    const [ files, setFiles] = useState([]);

    const { 
        uploadFile
    } = useUploadToS3({});

    const onFileUpload = ({files }) => {
        console.log(`files : ${JSON.stringify(files)}`, files);
        const [file] = files;
        uploadFile({ file });
    }

    const handleFileUpload = (event) => {
        const files = event.target.files;
        setFiles(files);
        onFileUpload({ files })
    };

    const handleMockFileUpload = () => {
        const inputEle = document.getElementById("jd_upload_key");
        inputEle.click();

    }

    return (
        <Container>
            <div>JD Upload</div>
            <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} id="jd_upload_key" style={{ display: "none"}}/>
            <Button onClick={handleMockFileUpload}>Upload</Button>
        </Container>
    );
}

export default JDUpload;