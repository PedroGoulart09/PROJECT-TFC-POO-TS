import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class UserModel extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});
