import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
  bio: z.string().max(200, 'Bio deve ter no máximo 200 caracteres').optional()
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
