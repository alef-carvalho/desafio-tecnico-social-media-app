import { Request, Response } from 'express';
import prisma from '../config/database';
import { UpdateProfileInput } from '../schemas/profileSchema';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        created_at: true,
        posts: {
          orderBy: { created_at: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('GetProfile error:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, bio } = req.body as UpdateProfileInput;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;

    const user = await prisma.user.update({
      where: { id: req.userId! },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        created_at: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('UpdateProfile error:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};
