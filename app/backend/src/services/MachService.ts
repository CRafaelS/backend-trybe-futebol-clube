import HttpException from '../utils/httpException';
import Maches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamModels';
import IMatch from '../interface/machInterface';

class TeamsService {
  public getAllMaches = async ():Promise<IMatch[]> => {
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

  public createMach = async ({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals,
  }:IMatch):Promise<IMatch> => {
    if (homeTeam === awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    const isHomeTeam = await Teams.findOne({ where: { id: Number(homeTeam) } });
    const isAwayTeam = await Teams.findOne({ where: { id: Number(awayTeam) } });
    if (!isHomeTeam || !isAwayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    const saveMach:IMatch = await Maches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return saveMach;
  };

  public updateMach = async (id:string) => {
    await Maches.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
  };
}
export default TeamsService;

// https://medium.com/@edumarcelino/joins-com-sequelize-mysql-e-node-js-parte-1-bb70893a28b0
