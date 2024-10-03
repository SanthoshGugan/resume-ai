import { KEY_DELIMTER } from "./constants";

export const generateJdKeyByUserId = (userId, fileName) => {
    const fileNameWithoutExtension = fileName.split('.')[0];
    // Generate a random 8-digit hexadecimal number
    const randomHex = Math.random().toString(16).substring(2, 10);
    
    // Combine the userId with the random hex to generate the key
    const jdKey = userId ? `${userId}${KEY_DELIMTER}${randomHex}${KEY_DELIMTER}${fileNameWithoutExtension}` : `${randomHex}`;
    return jdKey;
}; 