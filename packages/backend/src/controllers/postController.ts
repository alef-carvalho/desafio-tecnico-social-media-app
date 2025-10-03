import { Request, Response } from 'express';
import prisma from '../config/database';
import { CreatePostInput, UpdatePostInput } from '../schemas/postSchema';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(posts);
  } catch (error) {
    console.error('GetPosts error:', error);
    res.status(500).json({ error: 'Erro ao buscar postagens' });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body as CreatePostInput;

    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.userId!
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('CreatePost error:', error);
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body as UpdatePostInput;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      res.status(404).json({ error: 'Postagem não encontrada' });
      return;
    }

    if (post.authorId !== req.userId) {
      res.status(403).json({ error: 'Sem permissão para editar esta postagem' });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('UpdatePost error:', error);
    res.status(500).json({ error: 'Erro ao atualizar postagem' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      res.status(404).json({ error: 'Postagem não encontrada' });
      return;
    }

    if (post.authorId !== req.userId) {
      res.status(403).json({ error: 'Sem permissão para deletar esta postagem' });
      return;
    }

    await prisma.post.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error('DeletePost error:', error);
    res.status(500).json({ error: 'Erro ao deletar postagem' });
  }
};
