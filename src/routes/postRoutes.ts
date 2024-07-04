import express, { Request, Response } from 'express';
import User from '../models/User';
import Post from '../models/Post';
import Comment from '../models/Comment';

const router = express.Router();

router.post('/users/:userId/posts', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, content, comments } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const post = await Post.create({ title, content });
    await user.addPost(post);

    // Create comments associated with the post
    if (comments && comments.length > 0) {
      await Promise.all(
        comments.map(async (commentData: { content: string }) => {
          const comment = await Comment.create({ content: commentData.content });
          await comment.setUser(user);
          await comment.setPost(post);
        })
      );
    }

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
