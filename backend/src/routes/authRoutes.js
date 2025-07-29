import express from 'express';
import { signup, login, logout, checkAuth, googleLogin, verifyEmail,forgotPassword,resetPassword } from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleLogin);
router.post("/verifyemail",verifyEmail); 
router.post("/forgotpassword",forgotPassword);
router.post("/resetpassword/:token",resetPassword);

router.get("/check", protectRoute, checkAuth);

export default router;
  