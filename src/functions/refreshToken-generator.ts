const jwt = require('jsonwebtoken');

export function generateRefreshToken(user: any): string {
    return jwt.sign({ userId: user.email }, 'thadavil__aanu', { expiresIn: '7d' });
}