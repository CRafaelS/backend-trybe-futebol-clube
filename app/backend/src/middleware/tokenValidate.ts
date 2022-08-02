import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';
import TokenGenerator from '../utils/jwt';
import IUser from '../interface/userInterface';

const tokenValid = async (req: Request, res: Response, next: NextFunction) => {
  const tokenGenerator = new TokenGenerator();
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Sem Token' });
  }
  const authToken = await tokenGenerator.authenticateToken(token) as IUser;
  if (!authToken) {
    throw new HttpException(401, 'JWT malformed');
  }
  next();
};

export default tokenValid;
