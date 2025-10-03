import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional().or(z.literal('')),
  bio: z.string().max(200, 'Bio deve ter no máximo 200 caracteres').optional().or(z.literal(''))
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
