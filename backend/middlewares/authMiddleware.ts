import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { Role, ROLES } from '../utils/constants';

const authService = new AuthService();

export function authMiddleware(requiredRole?: Role) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);
    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    if (requiredRole && decoded.role !== requiredRole) {
      res.status(403).json({ error: 'Forbidden: insufficient role' });
      return;
    }

    // Attach user to request object (can be extended)
    (req as any).user = decoded;
    next();
  };
}
