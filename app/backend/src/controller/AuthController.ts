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

  public async getRole(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Sem Token' });
    }
    const role = await this.service.getRole(token);
    return res.status(200).json(role);
  }
}

export default AuthController;
