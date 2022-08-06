import { Request, Response } from 'express';
import LeaderbordService from '../services/LeaderbordService';

class LeaderbordController {
  private service: LeaderbordService;
  constructor() {
    this.service = new LeaderbordService();
  }

  public async getAllLeaderbord(_req: Request, res: Response) {
    const allTeams = await this.service.sumDraw();
    return res.status(200).json(allTeams);
  }
}

export default LeaderbordController;
