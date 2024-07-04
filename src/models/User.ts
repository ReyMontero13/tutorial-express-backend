import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Post from "./Post";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  age?: number;
}

interface userCreationAttributes extends Optional<UserAttributes,'id'> {}


class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public age?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public addPost!: (post: Post) => Promise<void>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName:'User',
    tableName: 'users',
  }
);

export default User;
