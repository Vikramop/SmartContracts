import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.logEvent = (event: string, details: object = {}) => {
    const user = (req as any).user;
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      user: user?.sub || user?.id || 'anonymous',
      ...details,
    };
    console.log(JSON.stringify(logEntry));
  };
  next();
}
