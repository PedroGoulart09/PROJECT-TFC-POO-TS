import UsersModel from '../database/models/User.model';
import { ILogin, ITokenData, IUser } from '../interfaces/User.interface';
import { Bcrypt, JWT, GenericError } from '../utils';

export default class LoginService {
  private usersModel = UsersModel;
  private jwt = new JWT();
  private bcrypt = new Bcrypt();

  isValidLogin = async (loginData: ILogin) => {
    const userEmail = await this.usersModel.findOne({ where: { email: loginData.email } });
    if (!userEmail) throw new GenericError(401, 'Incorrect email or password');
    const { password, ...userWithoutPasword } = userEmail as unknown as IUser;

    const isValidPassword = await this.bcrypt.comparePassword(loginData.password, password);
    if (!isValidPassword) {
      throw new GenericError(401, 'Incorrect email or password');
    }
    return this.jwt.generateToken(userWithoutPasword);
  };

  isValidToken(token: string) {
    const validToken = this.jwt.validateToken(token);
    // eslint-disable-next-line no-empty-pattern
    const { data: { /* role */ } } = validToken as ITokenData;
    return { role: 'admin' };
  }
}
