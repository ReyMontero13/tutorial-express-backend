import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Comment from './Comment';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  UserId?: number; // Foreign key for User
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}


class Post extends Model<PostAttributes,PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;

   // Foreign key
   public UserId?: number;
  

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getUser!: () => Promise<User>;
  public setUser!: (user: User, options?: any) => Promise<void>;
  public getComments!: () => Promise<Comment[]>;
  public addComment!: (comment: Comment, options?: any) => Promise<void>;
  public hasComment!: (comment: Comment) => Promise<boolean>;
  public countComments!: () => Promise<number>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
  }
);

// Define associations
// Post.belongsTo(User); // Adds userId to Post model
// User.hasMany(Post); // Adds getPosts and setPosts methods to User model
Post.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
Post.hasMany(Comment, { foreignKey: 'PostId', as: 'comments' });

export default Post;
