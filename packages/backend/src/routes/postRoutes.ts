import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/postController';
import { validate } from '../middlewares/validateMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createPostSchema, updatePostSchema } from '../schemas/postSchema';

const router = Router();

router.get('/', getPosts);
router.post('/', authMiddleware, validate(createPostSchema), createPost);
router.put('/:id', authMiddleware, validate(updatePostSchema), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
