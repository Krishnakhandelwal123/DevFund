import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { uploadSingle } from '../middlewares/upload.js';
import {
  createPost,
  getPostsByCreator,
  toggleLike,
} from '../controllers/postController.js';

const router = express.Router();

router.post(
  '/',
  protectRoute,
  (req, res, next) => {
    uploadSingle(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message || 'File upload failed. Use an image (JPEG, PNG, WebP, GIF) under 5MB.',
        });
      }
      next();
    });
  },
  createPost
);
router.get('/creator/:creatorId', protectRoute, getPostsByCreator);
router.post('/:id/like', protectRoute, toggleLike);

export default router;
