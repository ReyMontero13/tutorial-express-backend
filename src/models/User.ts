import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Post from "./Post";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  age?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes,'id'> {}


class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public age?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getPosts!: () => Promise<Post[]>
  public addPost!: (post: Post, options?: any) => Promise<void>;
  public haspost!: (post: Post) => Promise<boolean>
  public countPosts!: () => Promise<number>;

  public getComments!: () => Promise<Comment[]>;
  public addComment!: (comment: Comment, options?: any) => Promise<void>;
  public hasComment!: (comment: Comment) => Promise<boolean>;
  public countComments!: () => Promise<number>;
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

User.hasMany(Post, { foreignKey: 'UserId', as: 'posts' });


export default User;
