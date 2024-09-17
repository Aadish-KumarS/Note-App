import express from 'express';
import { registerUser, loginUser,getAllUsers, getUserProfile,deleteUser, logout,verifyEmail} from '../controllers/user.controller.js'
import authenticateToken from '../middleware/auth.middleware.js'

const router = express.Router();

router.get('/profile', authenticateToken,getUserProfile);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/verify-email', verifyEmail);
router.delete('/delete/:userId', deleteUser);
router.get('/users', getAllUsers);
export default router;