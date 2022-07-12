import { IMatch, IMatchData, IGoals } from '../interfaces/Teams.interface';
import MatchModel from '../database/models/Matche.model';
import team from '../database/models/Team.model';
import { GenericError } from '../utils';

export default class MatcheService {
  private model = MatchModel;

  getAll = async (inProgress: boolean | undefined) => {
    const matches = await this.model.findAll({
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    const typedMatches = matches as unknown as IMatch[];

    if (inProgress !== undefined) {
      return typedMatches.filter((match: IMatch) => match.inProgress === inProgress);
    }
    return typedMatches;
  };

  create = async (matchData: IMatchData) => {
    const { homeTeam, awayTeam } = matchData;
    if (homeTeam === awayTeam) {
      throw new GenericError(401, 'It is not possible to create a match with two equal teams');
    }
    const homeTeamAll = await this.model.findOne({ where: { id: homeTeam } });
    const awayTeamAll = await this.model.findOne({ where: { id: awayTeam } });
    if (!homeTeamAll || !awayTeamAll) {
      throw new GenericError(404, 'There is no team with such id!');
    }
    const match = await this.model.create({ ...matchData });

    return match;
  };

  updateInProgress = async (id: number) => {
    await this.model.update({
      inProgress: false,
    }, { where: { id } });
  };

  updateGames = async (id: number, goals: IGoals) => {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const findProgress = await this.model.findOne({ where: { id, inProgress: true } });
    if (!findProgress) {
      throw new GenericError(400, 'This match is not in progress.');
    }
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}
