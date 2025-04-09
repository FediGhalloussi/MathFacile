import { Router } from 'express';
import {
    register,
    login,
    logout,
} from '../controllers/auth.controller';
import { getCurrentUser } from '../services/auth.service';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, getCurrentUser);

export default router;
