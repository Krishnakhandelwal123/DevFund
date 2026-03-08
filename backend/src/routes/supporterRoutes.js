import express from 'express';
import { getProfile } from '../controllers/supporterController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All supporter routes require authentication
router.get('/profile', protectRoute, getProfile);

export default router;
