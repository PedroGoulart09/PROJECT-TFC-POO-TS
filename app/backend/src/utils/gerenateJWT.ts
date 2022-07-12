import { sign, verify } from 'jsonwebtoken';
import { IJWT } from '../interfaces/User.interface';

export default class JWT {
  private jwtSecret = 'jwt_secret';

  generateToken(user: IJWT): string {
    const { jwtSecret } = this;
    const token = sign({ data: user }, jwtSecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  validateToken(token: string) {
    try {
      const { jwtSecret } = this;
      const result = verify(token, jwtSecret);
      return result;
    } catch (error) {
      return null;
    }
  }
}
