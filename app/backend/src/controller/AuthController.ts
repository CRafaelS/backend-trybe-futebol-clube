import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  private service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  public auth(req: Request, res: Response) {
    const token = this.service.authentication(req.body);
    res.status(200).json(token);
  }
}

export default AuthController;
