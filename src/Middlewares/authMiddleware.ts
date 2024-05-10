import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import userModel from '../data/data-sources/mongodb/models/user';
import { User } from '../domain/entities/user';

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (!token || bearer.toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid Authorization header format' });
  }

  try {
    const decodedToken = jwt.verify(token, 'thadavil__aanu') as { userId: string, exp: number };
    if (decodedToken.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: 'Token expired' });
    }

    const userIdString = decodedToken.userId.toString();
    const user: User | null = await userModel.findOne({ _id: userIdString });

    if (user) {
      if (user.isBan) {
        return res.status(403).json({ message: 'User is blocked' });
      }
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid user' });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'TokenExpiredError' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default userAuth;
