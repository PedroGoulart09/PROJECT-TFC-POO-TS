import { Router } from 'express';

import user from './Login.route';
import team from './Teams.route';
import matches from './Match.route';
import leader from './LeaderBoard';

const routes = Router();

routes.use('/login', user);
routes.use('/teams', team);
routes.use('/matches', matches);
routes.use('/leaderboard', leader);

export default routes;
