import teams from '../database/models/TeamModels';

class TeamsService {
  public getAll = async ():Promise<object> => {
    const allUser = await teams.findAll();
    return allUser;
  };
}
export default TeamsService;
