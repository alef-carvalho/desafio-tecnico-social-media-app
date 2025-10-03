import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { validate } from '../middlewares/validateMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateProfileSchema } from '../schemas/profileSchema';

const router = Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, validate(updateProfileSchema), updateProfile);

export default router;
