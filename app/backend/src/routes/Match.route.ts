import { Router } from 'express';
import MatchController from '../controller/Match.controller';
import validateToken from '../Middleware/ValidateToken.middlware';

const routeTeam = Router();

const controller = new MatchController();

routeTeam.get(
  '/',
  controller.getAllMatches,
);
routeTeam.post(
  '/',
  validateToken,
  controller.createMatch,
);
routeTeam.patch(
  '/:id/finish',
  controller.updateInProgress,
);
routeTeam.patch(
  '/:id',
  controller.updateGames,
);
export default routeTeam;
