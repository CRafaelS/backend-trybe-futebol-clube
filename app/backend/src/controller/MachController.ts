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

  public async createMach(req: Request, res: Response) {
    const allTeams = await this.service.createMach(req.body);
    return res.status(201).json(allTeams);
  }

  public async updateMach(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.updateMach(id);
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateResult(req: Request, res: Response) {
    const { id } = req.params;
    const resultMatch = await this.service.updateResult(req.body, id);
    return res.status(200).json(resultMatch);
  }
}

export default MatchController;
