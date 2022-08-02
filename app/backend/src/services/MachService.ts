import Maches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModels';

class TeamsService {
  public getAllMaches = async ():Promise<object> => {
    const allTeams = await Maches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return allTeams;
  };
}
export default TeamsService;

// https://medium.com/@edumarcelino/joins-com-sequelize-mysql-e-node-js-parte-1-bb70893a28b0
