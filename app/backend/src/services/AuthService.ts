import { compare } from 'bcryptjs';
import users from '../database/models/UserModels';
import { ILogin } from '../interface/userInterface';
import HttpException from '../utils/httpException';
import TokenGenerator from '../utils/jwt';

class AuthService {
  public authentication = async (login: ILogin):Promise<object> => {
    const user = await users.findOne({
      attributes: ['username', 'email', 'role', 'password'],
      where: { email: login.email },
    });
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const isValid = await compare(login.password, user.password as string);
    if (!isValid) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const tokenGenerator = new TokenGenerator();
    const { username, role, email } = user;
    const token = tokenGenerator.generateJWTToken({ username, role, email });
    return { token };
  };
}
export default AuthService;
