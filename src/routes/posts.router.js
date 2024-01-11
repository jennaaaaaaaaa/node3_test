import express from 'express';
import { Posts } from '../models/posts.js';

const router = express.Router();
const posts = new Posts();

const createNewPost = async (req, res) => {
   try {
      const { title, content } = req.body;
      const createdPost = await posts.createPost(title, content);

      const post = {
         id: createdPost.id,
         title: createdPost.title,
         content: createdPost.content,
      };

      return res.status(201).json(post);
   } catch (error) {
      return res.status(500).json({ errorMessage: '서버에서 에러가 발생하였습니다.' });
   }
};

const getAllPosts = async (req, res) => {
   try {
      const allPosts = await posts.findAllPosts();
      const postsData = allPosts.map((post) => ({
         id: post.id,
         title: post.title,
         content: post.content,
      }));
      return res.status(200).json(postsData);
   } catch (error) {
      return res.status(500).json({ errorMessage: '서버에서 에러가 발생하였습니다.' });
   }
};

const updatePost = async (req, res) => {
   try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const findPost = await posts.findPostById(postId);
      if (!findPost) {
         return res.status(400).json({ errorMessage: '존재하지 않는 게시글 입니다' });
      }

      const updatedPost = await posts.updatePost(postId, title, content);
      const post = {
         id: updatedPost.id,
         title: updatedPost.title,
         content: updatedPost.content,
      };

      return res.status(200).json(post);
   } catch (error) {
      return res.status(500).json({ errorMessage: '서버에서 에러가 발생하였습니다.' });
   }
};

const deletePostById = async (req, res) => {
   try {
      const { postId } = req.params;
      const findPost = await posts.findPostById(postId);
      if (!findPost) {
         return res.status(400).json({ errorMessage: '존재하지 않는 게시글 입니다' });
      }
      await posts.deletePost(postId);
      return res.status(200).json({ message: 'success' });
   } catch (error) {
      return res.status(500).json({ errorMessage: '서버에서 에러가 발생하였습니다.' });
   }
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

export default router;
