import { Router } from 'express';
import TeamController from '../controller/Teams.controller';

const routeTeam = Router();

const controller = new TeamController();

routeTeam.get(
  '/',
  controller.getAllTeams,
);

routeTeam.get(
  '/:id',
  controller.getById,
);

export default routeTeam;
