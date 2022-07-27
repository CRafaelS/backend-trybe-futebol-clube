import { sign, SignOptions } from 'jsonwebtoken';
import IUser from '../interface/userInterface';

const JWTSECRET = 'meusegredo';

const jwtConfig: SignOptions = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const generateToken = (user: Omit< IUser, 'password'>):string =>
  sign(user, JWTSECRET, jwtConfig);

export default generateToken;
