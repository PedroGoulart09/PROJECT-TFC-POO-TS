import { Router } from 'express';
import LeaderController from '../controller/LeaderBoard.controller';

const routes = Router();

const controller = new LeaderController();

routes.get(
  '/home',
  controller.getAllLeader,
);

export default routes;
