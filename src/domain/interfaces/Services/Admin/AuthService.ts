export interface IAuthService {
    generateToken(payload: any): string;
  }