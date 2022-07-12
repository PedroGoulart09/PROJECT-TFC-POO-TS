import { Router } from 'express';
import LoginController from '../controller/Login.controller';
import LoginMiddleware from '../Middleware/Login.middlware';
import validateToken from '../Middleware/ValidateToken.middlware';

const routes = Router();

const controller = new LoginController();

routes.post(
  '/',
  LoginMiddleware.isValidEmail,
  LoginMiddleware.isValidPassword,
  controller.loginSuccess,
);
routes.get(
  '/validate',
  validateToken,
  controller.isValidToken,
);

export default routes;
