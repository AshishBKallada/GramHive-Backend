import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import userModel from '../data/data-sources/mongodb/models/user';
import { User } from '../domain/entities/user';

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader) {
    console.log('111111111111');
    
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  
  const [bearer, token] = authorizationHeader.split(' ');
  
  if (!token || bearer.toLowerCase() !== 'bearer') {
    console.log('2222222222222222');

    return res.status(401).json({ message: 'Invalid Authorization header format' });
  }
  
  try {
    const decodedToken = jwt.verify(token, 'thadavil__aanu') as { userId: string, exp: number };
    console.log('Decoded Token:', decodedToken);
    
    if (decodedToken.exp * 1000 < Date.now()) {
      console.log('333333333333');

      return res.status(401).json({ message: 'Token expired' });
    }

    const userIdString = decodedToken.userId.toString();
    console.log('userIdString', userIdString);
    
    const user: User | null = await userModel.findOne({ _id: userIdString });

    if (user) {
      if (user.isBan) {
        console.log('44444444444444');

        return res.status(403).json({ message: 'User is blocked' });
      }
      req.user = user;
      next();
    } else {
      console.log('55555555555');

      return res.status(401).json({ message: 'Invalid user' });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.log('66666666666');

      return res.status(401).json({ message: 'TokenExpiredError' });
    }
    console.error('Error:', error);
    console.log('7777777777777777');

    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default userAuth;
