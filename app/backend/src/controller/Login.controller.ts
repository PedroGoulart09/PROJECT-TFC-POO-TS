import { Request, Response } from 'express';
import LoginService from '../service/Login.service';
import GenericError from '../utils/error';

export default class LoginController {
  private service = new LoginService();

  loginSuccess = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.isValidLogin({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      const genericError = error as GenericError;
      return res.status(genericError.status).json({ message: genericError.message });
    }
  };

  isValidToken = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers;
      const token = authorization as string;
      const role = this.service.isValidToken(token);
      return res.status(200).json(role);
    } catch (error) {
      const genericError = error as GenericError;
      return res.status(genericError.status).json({ message: genericError.message });
    }
  };
}
