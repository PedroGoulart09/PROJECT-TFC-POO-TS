import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team.model';

class MatchModel extends Model {
  // static associate(models) {
  // }
}

MatchModel.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: {
    type: BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize: db,
  modelName: 'match',
  underscored: true,
  timestamps: false,
});

Team.hasMany(MatchModel, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(MatchModel, { foreignKey: 'awayTeam', as: 'awayMatches' });

MatchModel.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
