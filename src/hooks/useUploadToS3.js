import React, { useEffect, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import AWS from "aws-sdk";

// const s3 = new AWS.S3();


// move to secrets!!!!!
const AWS_REGION="us-east-1";
const BUCKET_NAME = "resume-filtering-ai";

const client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
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