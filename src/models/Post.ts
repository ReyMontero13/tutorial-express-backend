import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
  }
);

// Define associations
Post.belongsTo(User); // Adds userId to Post model
User.hasMany(Post); // Adds getPosts and setPosts methods to User model

export default Post;
