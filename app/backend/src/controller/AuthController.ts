import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  private service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  public async auth(req: Request, res: Response) {
    const token = await this.service.authentication(req.body);
    return res.status(200).json(token);
  }
}

export default AuthController;
