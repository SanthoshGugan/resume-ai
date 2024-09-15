import React, { useEffect, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import AWS from "aws-sdk";

// const s3 = new AWS.S3();


// move to secrets!!!!!
const AWS_REGION="ap-south-1";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY
    }
});

const useUploadToS3 = ({ Bucket }) => {
    // console.log(`bucket : ${Bucket}`);

    const uploadFile = async  ({ file, Bucket }) => {
        try {
            const Key = file.name;
            // console.log('Bucket ::::::', Bucket);
            const params = {
                Bucket,
                Key,
                Body: file
            };
            const data = await client.send(new PutObjectCommand(params));
            console.log(data);
            return {
                Key: Key
            };
        } catch(err) {
            console.error(err);
        }
    }

    return {
        uploadFile
    };
}

export default useUploadToS3;