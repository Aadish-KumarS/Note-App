import express from 'express';
import { registerUser, loginUser, getUserProfile, logout} from '../controllers/user.controller.js'
import authenticateToken from '../middleware/auth.middleware.js'

const router = express.Router();

router.get('/profile', authenticateToken,getUserProfile);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);

export default router;