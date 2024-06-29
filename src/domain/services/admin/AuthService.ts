import { IAuthService } from '../../interfaces/Services/Admin/AuthService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'nagato-pain-788';

export class AuthService implements IAuthService {

  generateToken(payload: any): string {
    const tokenPayload = {
      ...payload,
      role: 'admin'
    };

    return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
  }
}
