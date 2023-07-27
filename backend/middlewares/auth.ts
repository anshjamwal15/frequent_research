import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const decodedToken = jwt.verify(token, secretKey) as any;

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token', error });
  }
}
