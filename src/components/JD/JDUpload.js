import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import UploadResume from "../ResumeAi/UploadResume";
import useUploadToS3 from "../../hooks/useUploadToS3";
import useLongPollJDSummary from "../../hooks/useLongPollJDSummary";

const BUCKET_NAME = `${process.env.REACT_APP_JD_BUCKET_NAME}`;


const JDUpload = ({  }) => {

    const [ files, setFiles] = useState([]);
    const { 
        fetchJDSummary,
        summary,
        dimensions
    } = useLongPollJDSummary({});

    const { 
        uploadFile
    } = useUploadToS3({});

    const onFileUpload = async ({files }) => {
        console.log(`files : ${JSON.stringify(files)}`, files);
        const [file] = files;
        const { Key } = await uploadFile({ file });
        await fetchJDSummary({ key: Key, bucket: BUCKET_NAME });
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
            <div>
                <>{JSON.stringify(summary)}</>
                <>{JSON.stringify(dimensions)}</>
            </div>
        </Container>
    );
}

export default JDUpload;