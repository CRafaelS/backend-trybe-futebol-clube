import { compare } from 'bcryptjs';
import Users from '../database/models/UserModels';
import IUser, { ILogin } from '../interface/userInterface';
import HttpException from '../utils/httpException';
import TokenGenerator from '../utils/jwt';

class AuthService {
  public authentication = async (login: ILogin):Promise<object> => {
    const user = await Users.findOne({
      attributes: ['username', 'email', 'role', 'password'],
      where: { email: login.email },
    });
    const isValid = await compare(login.password, user?.password as string);

    if (!user || !isValid) {
      throw new HttpException(401, 'Usuário ou senha inválido');
    }

    const jwtHeader: Omit<IUser, 'password'> = {
      id: user.getDataValue('id'),
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
