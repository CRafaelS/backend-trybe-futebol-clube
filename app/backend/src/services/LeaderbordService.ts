// import IMatch from '../interface/machInterface';
import Teams from '../database/models/TeamModels';
import Maches from '../database/models/MatchesModel';
// import ILeaderboard from '../interface/leaderbordInterface';
// import { IMatchTeam } from '../interface/machInterface';

class LeaderbordService {
  public leaderbord = async () => {
    const finishedMatches = await Maches.findAll({ where: { inProgress: false } });
    return finishedMatches;
  };

  private findNameTeam = async (id: number) => {
    const findHomeTeam = await Teams.findOne({
      attributes: ['teamName'],
      where: { id },
    });
    return findHomeTeam;
  };

  public resultMatch = async () => {
    const tableLeader = await this.leaderbord();
    const joinTable = await Promise.all(tableLeader.map(async (team) => ({
      name: (await this.findNameTeam(team.homeTeam))?.teamName,
      homeTeam: team.homeTeam,
      homeTeamGoals: team.homeTeamGoals,
      nameAway: (await this.findNameTeam(team.awayTeam))?.teamName,
      awayTeam: team.awayTeam,
      awayTeamGoals: team.awayTeamGoals,
    })));
    return joinTable;
  };

  public teamStatistics = async () => {
    const findAllHomeTeam = await Teams.findAll();
    return findAllHomeTeam.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  };

  public sumWin = async () => {
    const resultMatch = await this.resultMatch();
    const teamStatistics = await this.teamStatistics();
    resultMatch.forEach((item) => {
      if (item.homeTeamGoals > item.awayTeamGoals) {
        teamStatistics.forEach((club) => {
          if (club.name === item.name) {
            const clubs = club;
            clubs.totalPoints += 3; clubs.totalGames += 1; clubs.goalsFavor += item.homeTeamGoals;
            clubs.totalVictories += 1; clubs.goalsOwn += item.awayTeamGoals;
            clubs.goalsBalance += item.homeTeamGoals - item.awayTeamGoals;
            clubs.efficiency = +((clubs.totalPoints / (clubs.totalGames * 3)) * 100).toFixed(2);
          }
        });
      }
    });
    return teamStatistics;
  };

  public sumLoosse = async () => {
    const resultMatch = await this.resultMatch();
    const teamStatistics = await this.sumWin();
    resultMatch.forEach((item) => {
      if (item.homeTeamGoals < item.awayTeamGoals) {
        teamStatistics.forEach((club) => {
          if (club.name === item.name) {
            const clubs = club;
            clubs.totalGames += 1; clubs.goalsFavor += item.homeTeamGoals;
            clubs.goalsBalance += item.homeTeamGoals - item.awayTeamGoals;
            clubs.goalsOwn += item.awayTeamGoals; clubs.totalLosses += 1;
            clubs.efficiency = +((clubs.totalPoints / (clubs.totalGames * 3)) * 100).toFixed(2);
          }
        });
      }
    });
    return teamStatistics;
  };

  public sumDraw = async () => {
    const resultMatch = await this.resultMatch();
    const teamStatistics = await this.sumLoosse();
    resultMatch.forEach((item) => {
      if (item.homeTeamGoals === item.awayTeamGoals) {
        teamStatistics.forEach((club) => {
          if (club.name === item.name) {
            const clubs = club;
            clubs.totalPoints += 1; clubs.totalGames += 1; clubs.goalsFavor += item.homeTeamGoals;
            clubs.goalsBalance += item.homeTeamGoals - item.awayTeamGoals;
            clubs.goalsOwn += item.awayTeamGoals; clubs.totalDraws += 1;
            clubs.efficiency = +((clubs.totalPoints / (clubs.totalGames * 3)) * 100).toFixed(2);
          }
        });
      }
    });
    return teamStatistics.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  };

  // private objectTeamLeader = async () => {
  //   const tableTeamLeader = await this.getAllLeaderbord();
  //   console.log();
  //   return tableTeamLeader.map((team) => {
  //     if (team.homeTeamGoals > team.awayTeamGoals) {
  //       let totalPoints = 0;
  //       return {
  //         name: team.name,
  //         totalPoints: 3,
  //         totalGames: 0,
  //         totalVictories: 0,
  //         totalDraws: 0,
  //         totalLosses: 0,
  //         goalsFavor: 0,
  //         goalsOwn: 0,
  //         goalsBalance: 0,
  //         efficiency: 0,
  //       };
  //     }
  //   });
  // };
}
export default LeaderbordService;

// interface ICurr {
//   name: string;
//   homeTeam: number;
//   homeTeamGoals: number;
//   nameAway: number;
//   awayTeam: number;
//   awayTeamGoals: number,
// }

// name: team.name,
// totalPoints: 0,
// totalGames: 0,
// totalVictories: 0,
// totalDraws: 0,
// totalLosses: 0,
// goalsFavor: 0,
// goalsOwn: 0,
// goalsBalance: 0,
// efficiency: 0,
