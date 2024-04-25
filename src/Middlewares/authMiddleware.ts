import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../data/data-sources/mongodb/models/user';
import { User } from '../domain/entities/user';

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token: string | undefined = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  jwt.verify(token, 'thadavil__aanu', async (err: any, data: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      console.log('Data----------------------------', data);
      try {
        console.log(data.userId);
        const userIdString = data.userId.toString();

        const user: User | null = await userModel.findOne({ email: userIdString });
        if (user) {
          console.log(user);
          if (user.isBan) {
            return res.status(403).json({ message: 'User is blocked' });
          }
          next();
        } else {
          return res.status(401).json({ message: 'Invalid user' });
        }
      } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
};

export default userAuth;
