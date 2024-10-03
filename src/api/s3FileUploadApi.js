import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// todo: move to secrets!!!!!
const AWS_REGION = "ap-south-1";

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_ACCESS_SECRET_KEY
    }
});

export const uploadFiles = async ({ files, Bucket, key_map }) => {
    try {
        const keys = [];
        for (const file of files) {
            const name = file.name;
            const Key = key_map.get(name); 
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

export const uploadFile = async ({ file, Bucket, Key }) => {
    try {
        // const Key = file.name;
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

// Function to download a file from S3
export const downloadFile = async ({ Bucket, Key }) => {
    try {
        const params = {
            Bucket,
            Key
        };

        const command = new GetObjectCommand(params);
        const data = await client.send(command);
        
        // Convert the stream to a Blob and return it
        const response = await data.Body.transformToString(); // Use this for text files
        return response; // You can also return data.Body as a stream if needed
    } catch (err) {
        console.error(err);
    }
};