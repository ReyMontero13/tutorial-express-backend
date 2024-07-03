import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  age?: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public age?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  }
);

export default User;
