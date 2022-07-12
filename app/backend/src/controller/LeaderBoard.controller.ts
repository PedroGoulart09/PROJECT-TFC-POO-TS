import { Request, Response } from 'express';
import { GenericError } from '../utils';
import Leaderboard from '../service/Leaderboard.service';

export default class LeaderboardControler {
  private service = new Leaderboard();

  getAllLeader = async (req: Request, res: Response) => {
    try {
      const getAll = await this.service.getHome();
      return res.status(200).json(getAll);
    } catch (error) {
      const genericError = error as GenericError;
      return res.status(genericError.status).json({ message: genericError.message });
    }
  };
}
