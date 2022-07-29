// import { compare } from 'bcryptjs';
import users from '../database/models/UserModels';
import IUser, { ILogin } from '../interface/userInterface';
import HttpException from '../utils/httpException';
import TokenGenerator from '../utils/jwt';

class AuthService {
  public authentication = async (login: ILogin):Promise<object> => {
    const user = await users.findOne({
      attributes: ['username', 'email', 'role', 'password'],
      where: { email: login.email },
    });
    // const isValid = await compare(login.password, user?.password as string);
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const jwtHeader: Omit<IUser, 'password'> = {
      username: user.getDataValue('username'),
      role: user.getDataValue('role'),
      email: user.getDataValue('email'),
    };
    const tokenGenerator = new TokenGenerator();
    const token = tokenGenerator.generateJWTToken(jwtHeader);
    return { token };
  };
}
export default AuthService;
