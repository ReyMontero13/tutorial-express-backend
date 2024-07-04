import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Post from './Post';

interface CommentAttributes {
  id: number;
  content: string;
  UserId?: number; // Foreign key for User
  PostId?: number; // Foreign key for Post
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public content!: string;

  // Foreign keys
  public UserId?: number;
  public PostId?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods 
  public getUser!: ()=> Promise<User>
  public setUser!:(user: User, options?: any) => Promise<void>
  public getPost!:()=>Promise<Post>
  public setPost!:(post: Post, options?: any)=> Promise<void>
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

// Define associations
Comment.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'PostId', as: 'post' });
//User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
//Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

export default Comment;
