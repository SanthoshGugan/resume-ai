import React, { useEffect, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import AWS from "aws-sdk";

// const s3 = new AWS.S3();


// move to secrets!!!!!
const AWS_REGION="ap-south-1";
const BUCKET_NAME = "jd-assets-009594049963";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY
    }
});

const useUploadToS3 = ({}) => {


    const uploadFile = async  ({ file }) => {
        try {
            const Key = file.name;
            const params = {
                Bucket: BUCKET_NAME,
                Key,
                Body: file
            };
            // const putCommand = new PutObjectCommand(params);
            const data = await client.send(new PutObjectCommand(params));
            // const data = await s3.putObject({
            //     ...params
            // }).promise();
            console.log(data);
            return data;
        } catch(err) {
            console.error(err);
        }
    }

    return {
        uploadFile
    };
}

export default useUploadToS3;