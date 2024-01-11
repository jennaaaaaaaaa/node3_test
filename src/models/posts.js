import { prisma } from '../utils/prisma/index.js';

export class Posts {
   findAllPosts = async () => {
      const posts = await prisma.posts.findMany();

      return posts;
   };

   findPostById = async (postId) => {
      const post = await prisma.posts.findUnique({ where: { id: +postId } });

      return post;
   };

   createPost = async (title, content) => {
      const createdPost = await prisma.posts.create({
         data: {
            title,
            content,
         },
      });
      return createdPost;
   };

   updatePost = async (postId, title, content) => {
      const updatedPost = await prisma.posts.update({
         where: {
            id: +postId,
         },
         data: {
            title,
            content,
         },
      });
      return updatedPost;
   };

   deletePost = async (postId) => {
      const deletedPost = await prisma.posts.delete({
         where: {
            id: +postId,
         },
      });
      return deletedPost;
   };
}
