import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useUploadToS3 from "../../hooks/useUploadToS3";
import useLongPollResumeSummary from "../../hooks/useLongPollResumeSummary";

const BUCKET_NAME = `${process.env.REACT_APP_RESUME_BUCKET_NAME}`;


const ResumeUpload = ({  }) => {

    const [ files, setFiles] = useState([]);
    const { 
        fetchResumeSummary,
        summary,
        dimensions
    } = useLongPollResumeSummary({});

    const { 
        uploadFile
    } = useUploadToS3({ Bucket: BUCKET_NAME });

    const onFileUpload = async ({files }) => {
        console.log(`files : ${JSON.stringify(files)}`, files);
        const [file] = files;
        const { Key } = await uploadFile({ file, Bucket: BUCKET_NAME });
        await fetchResumeSummary({ key: Key, bucket: BUCKET_NAME });
    }

    const handleFileUpload = (event) => {
        const files = event.target.files;
        setFiles(files);
        onFileUpload({ files, Bucket: BUCKET_NAME })
    };

    const handleMockFileUpload = () => {
        const inputEle = document.getElementById("resume_upload_key");
        inputEle.click();

    }

    return (
        <Container>
            <div>Resume Upload</div>
            <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} id="resume_upload_key" style={{ display: "none"}}/>
            <Button onClick={handleMockFileUpload}>Upload</Button>
            <div>
                <>{JSON.stringify(summary)}</>
                <>{JSON.stringify(dimensions)}</>
            </div>
        </Container>
    );
}

export default ResumeUpload;