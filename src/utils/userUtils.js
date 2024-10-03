import { KEY_DELIMTER } from "./constants";

export const generateJdKeyByUserId = (userId, fileName) => {
    const fileSplit = fileName.split('.');
    const fileNameWithoutExtension = fileSplit[0];
    const ext = fileSplit[1];
    // Generate a random 8-digit hexadecimal number
    const randomHex = Math.random().toString(16).substring(2, 10);
    
    // Combine the userId with the random hex to generate the key
    const jdKey = userId ? `${userId}${KEY_DELIMTER}${randomHex}${KEY_DELIMTER}${fileNameWithoutExtension}.${ext}` : `${randomHex}.${ext}`;
    return jdKey;
}; 