import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';

export interface TokenPayload extends JwtPayload {
  id: string;
  role: string;
  sub?: string;
  [key: string]: any;
}

export class AuthService {
  signToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }
}
