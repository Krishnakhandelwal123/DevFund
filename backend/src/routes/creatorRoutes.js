import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getCreatorStats, getCreatorsForExplore, getCreatorById } from '../controllers/creatorController.js';

const router = express.Router();

router.get('/profile', protectRoute, getCreatorStats);
router.get('/explore', protectRoute, getCreatorsForExplore);
router.get('/:id', protectRoute, getCreatorById);

export default router;

