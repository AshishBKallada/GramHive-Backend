import crypto from 'crypto';

const tokenUserIdMap = new Map();
const TOKEN_LENGTH = 5;

export const generateResetToken = (userId: string): string => {
    const hash = crypto.createHash('sha256');
    hash.update(userId);
    const digest = hash.digest('hex');
    const token = digest.substring(0, TOKEN_LENGTH);

    tokenUserIdMap.set(token, userId);

    return token;
};

export const getUserIdFromToken = (token: string): string | null => {
    return tokenUserIdMap.get(token) || null;
};
