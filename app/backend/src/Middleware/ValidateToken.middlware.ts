import { Request, Response, NextFunction } from 'express';
import { JWT } from '../utils';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization as string;
  const jwt = new JWT();
  if (!jwt.validateToken(token)) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
