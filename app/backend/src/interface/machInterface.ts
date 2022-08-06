import Teams from '../database/models/TeamModels';

export default interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export interface IMatchTeam extends IMatch {
  teamHome: Teams[]
}
