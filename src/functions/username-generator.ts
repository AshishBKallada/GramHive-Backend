export const generateRandomUsername = (name: string): string => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); 
    const username = name.replace(/\s+/g, '').toLowerCase(); 
    return `${username}${randomSuffix}`;
  };