import { Request, Response } from 'express';
import MachService from '../services/MachService';

class MatchController {
  private service: MachService;
  constructor() {
    this.service = new MachService();
  }

  public async getAllMaches(_req: Request, res: Response) {
    const allTeams = await this.service.getAllMaches();
    return res.status(200).json(allTeams);
  }
}

export default MatchController;
