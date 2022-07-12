import TeamsModel from '../database/models/Team.model';

export default class Teams {
  private model = TeamsModel;

  getAllTeams = async () => {
    const getAll = await this.model.findAll();
    return getAll;
  };

  getTeamsId = async (id:number) => {
    const getId = await this.model.findOne({ where: { id } });
    return getId;
  };
}
