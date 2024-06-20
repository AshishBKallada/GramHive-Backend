import jwt from 'jsonwebtoken';

export const verifyRefreshToken = (token: string): any => {
    try {
      return jwt.verify(token, 'thadavil__aanu',);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  };