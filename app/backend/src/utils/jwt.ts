import { SignOptions, sign, verify } from 'jsonwebtoken';
import IUser from '../interface/userInterface';
import HttpException from './httpException';

const SECRET = 'jwt_secret';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

class TokenGenerator {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) {
      this.jwtConfig = jwtDefaultConfig;
    }
  }

  public generateJWTToken(payload: Omit<IUser, 'password'>) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) {
      throw new HttpException(401, 'Sem Token');
    }
    try {
      const introspection = await verify(token, SECRET, this.jwtConfig);
      return introspection;
    } catch (e) {
      throw new HttpException(401, 'token inválido');
    }
  }
}

export default TokenGenerator;
