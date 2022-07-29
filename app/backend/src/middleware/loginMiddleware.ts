import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';

const emailValid = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) { throw new HttpException(401, 'Incorrect email or password'); }
  next();
};

export default emailValid;
