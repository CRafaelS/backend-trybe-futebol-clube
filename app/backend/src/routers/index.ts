import { Router, Request, Response } from 'express';
import TeamsController from '../controller/TeamsController';
import AuthController from '../controller/AuthController';
import MatchController from '../controller/MachController';
import LeaderbordController from '../controller/LeaderbordController';
import emailValid, { passwordValid } from '../middleware/loginMiddleware';
import tokenValid from '../middleware/tokenValidate';

const routers: Router = Router();

const authController = new AuthController();
const teamsController = new TeamsController();
const matchController = new MatchController();
const leaderbordController = new LeaderbordController();

routers.post(
  '/login',
  emailValid,
  passwordValid,
  (req: Request, res: Response) => authController.auth(req, res),
);

routers.get(
  '/login/validate',
  (req: Request, res: Response) => authController.getRole(req, res),
);

routers.get(
  '/teams',
  (req: Request, res: Response) => teamsController.getAll(req, res),
);

routers.get(
  '/teams/:id',
  (req: Request<{ id: number }>, res: Response) => teamsController.getOne(req, res),
);

routers.get(
  '/matches',
  (req: Request, res: Response) => matchController.getAllMaches(req, res),
);

routers.post(
  '/matches',
  tokenValid,
  (req: Request, res: Response) => matchController.createMach(req, res),
);

routers.patch(
  '/matches/:id/finish',
  tokenValid,
  (req: Request, res: Response) => matchController.updateMach(req, res),
);

routers.patch(
  '/matches/:id',
  (req: Request, res: Response) => matchController.updateResult(req, res),
);

routers.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderbordController.getAllLeaderbord(req, res),
);

export default routers;
