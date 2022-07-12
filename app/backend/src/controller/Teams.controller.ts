import { Request, Response } from 'express';
import { GenericError } from '../utils';
import TeamService from '../service/Teams.service';

export default class TeamController {
  private teamService = new TeamService();

  getAllTeams = async (req: Request, res: Response) => {
    try {
      const getAll = await this.teamService.getAllTeams();
      return res.status(200).json(getAll);
    } catch (error) {
      const genericError = error as GenericError;
      return res.status(genericError.status).json({ message: genericError.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const getId = await this.teamService.getTeamsId(Number(id));
      return res.status(200).json(getId);
    } catch (error) {
      const genericError = error as GenericError;
      return res.status(genericError.status).json({ message: genericError.message });
    }
  };
}
