import express from 'express';
import { registerUser, loginUser, getUserProfile} from '../controllers/user.controller.js'
import authenticateToken from '../middleware/auth.middleware.js'

const router = express.Router();

router.get('/profile', authenticateToken,getUserProfile);
router.post('/register',registerUser);
router.post('/login',loginUser);

export default router;