import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// todo: move to secrets!!!!!
const AWS_REGION = "ap-south-1";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY
    }
});

export const uploadFiles = async ({ files, Bucket }) => {
    try {
        const keys = [];
        for (const file of files) {
            const Key = file.name;
            // console.log('Bucket ::::::', Bucket);
            const params = {
                Bucket,
                Key,
                Body: file
            };
            const data = await client.send(new PutObjectCommand(params));
            console.log(data);
            keys.push(Key);
        }
        return keys;
    } catch (err) {
        console.error(err);
    }
}

export const uploadFile = async ({ file, Bucket }) => {
    try {
        const Key = file.name;
        // console.log('Bucket ::::::', Bucket);
        const params = {
            Bucket,
            Key,
            Body: file
        };
        const data = await client.send(new PutObjectCommand(params));
        return {Key};
    } catch (err) {
        console.error(err);
    }
}