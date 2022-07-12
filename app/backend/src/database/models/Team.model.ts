import { Model, STRING } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  // static associate(models) {
  //   // define association here
  // }
}
TeamModel.init({
  teamName: STRING,
}, {
  sequelize: db,
  modelName: 'teams',
  underscored: true,
  timestamps: false,
});

export default TeamModel;
