import { Request, Response } from 'express';
import TeamsService from '../services/TeamsSevice';

class TeamsController {
  private service: TeamsService;
  constructor() {
    this.service = new TeamsService();
  }

  public async getAll(_req: Request, res: Response) {
    const allTeams = await this.service.getAll();
    return res.status(200).json(allTeams);
  }

  public async getOne(req: Request<{ id: number }>, res: Response) {
    const { id } = req.params;
    const allTeams = await this.service.getTeam(id);
    return res.status(200).json(allTeams);
  }
}

export default TeamsController;
