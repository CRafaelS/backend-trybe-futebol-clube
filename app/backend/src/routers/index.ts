import { Router, Request, Response } from 'express';
import AuthController from '../controller/AuthController';

const routers: Router = Router();

const authController = new AuthController();

routers.post(
  '/login',
  (req: Request, res: Response) => authController.auth(req, res),
);

export default routers;
