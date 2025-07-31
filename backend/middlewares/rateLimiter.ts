import rateLimit from 'express-rate-limit';

export const mintLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: 'Too many mint requests, please try again later.' },
});
