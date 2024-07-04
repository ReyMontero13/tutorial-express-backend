import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  age?: number;
}

<<<<<<< HEAD
interface UserCreationAttributes extends Optional<UserAttributes,'id'> {}


class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes {
=======
class User extends Model<UserAttributes> implements UserAttributes {
>>>>>>> parent of 9935429 (Add Comment)
  public id!: number;
  public username!: string;
  public email!: string;
  public age?: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
<<<<<<< HEAD

  // Association methods
  public getPosts!: () => Promise<Post[]>
  public addPost!: (post: Post, options?: any) => Promise<void>;
  public haspost!: (post: Post) => Promise<boolean>
  public countPosts!: () => Promise<number>;

  public getComments!: () => Promise<Comment[]>;
  public addComment!: (comment: Comment, options?: any) => Promise<void>;
  public hasComment!: (comment: Comment) => Promise<boolean>;
  public countComments!: () => Promise<number>;
=======
>>>>>>> parent of 9935429 (Add Comment)
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

User.hasMany(Post, { foreignKey: 'UserId', as: 'posts' });


export default User;
