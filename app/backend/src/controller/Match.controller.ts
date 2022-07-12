import { Request, Response } from 'express';
import { GenericError } from '../utils';
import MatcheService from '../service/Match.service';

export default class MatcheController {
  private service = new MatcheService();

  getAllMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      let isInProgress;
      if (inProgress) isInProgress = inProgress === 'true';
      const matches = await this.service.getAll(isInProgress);
      return res.status(200).json(matches);
    } catch (error) {
      const messageError = error as GenericError;
      return res.status(messageError.status).json({ message: messageError.message });
    }
  };

  createMatch = async (req: Request, res: Response) => {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this.service.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
      return res.status(201).json(match);
    } catch (error) {
      const messageError = error as GenericError;
      return res.status(messageError.status).json({ message: messageError.message });
    }
  };

  updateInProgress = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.updateInProgress(+id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      const messageError = error as GenericError;
      return res.status(messageError.status).json({ message: messageError.message });
    }
  };

  updateGames = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.service.updateGames(+id, { homeTeamGoals, awayTeamGoals });
      return res.status(200).json({ message: 'Updated successfuly' });
    } catch (error) {
      const messageError = error as GenericError;
      return res.status(messageError.status).json({ message: messageError.message });
    }
  };
}
