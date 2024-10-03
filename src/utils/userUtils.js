export const generateJdKeyByUserId = (userId, fileName) => {
    const delimiter = "_____";
    // Generate a random 8-digit hexadecimal number
    const randomHex = Math.random().toString(16).substring(2, 10);
    
    // Combine the userId with the random hex to generate the key
    const jdKey = userId ? `${userId}${delimiter}${randomHex}${delimiter}${fileName}` : `${randomHex}`;
    return jdKey;
  }; 