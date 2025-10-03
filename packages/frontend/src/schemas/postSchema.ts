import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').max(500, 'Conteúdo deve ter no máximo 500 caracteres')
});

export const updatePostSchema = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório').max(500, 'Conteúdo deve ter no máximo 500 caracteres')
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
