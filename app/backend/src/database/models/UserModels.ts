import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Users.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    modelName: 'users',
    tableName: 'users',
    sequelize: db,
    timestamps: false,
  },
);

export default Users;
