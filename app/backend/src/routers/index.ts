import { Router, Request, Response } from 'express';
import AuthController from '../controller/AuthController';
import emailValid from '../middleware/loginMiddleware';

const routers: Router = Router();

const authController = new AuthController();

routers.post(
  '/login',
  emailValid,
  (req: Request, res: Response) => authController.auth(req, res),
);

export default routers;
