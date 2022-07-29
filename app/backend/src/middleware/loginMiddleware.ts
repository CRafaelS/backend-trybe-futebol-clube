import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/httpException';

export const passwordValid = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) { throw new HttpException(400, 'All fields must be filled'); }
  next();
};

const emailValid = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) { throw new HttpException(400, 'All fields must be filled'); }
  next();
};
export default emailValid;
