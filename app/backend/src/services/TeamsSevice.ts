import teams from '../database/models/TeamModels';
import HttpException from '../utils/httpException';

class TeamsService {
  public getAll = async ():Promise<object> => {
    const allTeams = await teams.findAll();
    return allTeams;
  };

  public getTeam = async (id: number):Promise<object> => {
    const team = await teams.findOne({
      where: { id },
    });
    if (!team) {
      throw new HttpException(404, 'team not found');
    }
    return team;
  };
}
export default TeamsService;
