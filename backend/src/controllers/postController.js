import Post from '../models/postModel.js';
import CreatorStats from '../models/creatorStatsModel.js';
import { uploadToCloudinary } from '../lib/cloudinary.js';

/**
 * Create a post. Creator only. Expects multipart: image (file), caption (string).
 */
export const createPost = async (req, res) => {
  try {
    if (!req.user?.roles?.isCreator) {
      return res.status(403).json({ message: 'Only creators can create posts.' });
    }
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const caption = (req.body.caption || '').trim().slice(0, 2000);

    const result = await uploadToCloudinary(req.file.buffer);
    const imageUrl = result.secure_url;

    const post = await Post.create({
      creator: req.user._id,
      image: imageUrl,
      caption,
    });

    await CreatorStats.findOneAndUpdate(
      { user: req.user._id },
      { $inc: { totalPostsShared: 1 } },
      { upsert: true, new: true }
    );

    const populated = await Post.findById(post._id)
      .populate('creator', 'name creatorProfile')
      .lean();
    const response = {
      _id: populated._id,
      creator: populated.creator,
      image: populated.image,
      caption: populated.caption,
      likedBy: populated.likedBy || [],
      likeCount: (populated.likedBy || []).length,
      createdAt: populated.createdAt,
    };
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error in createPost:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get all posts by a creator. creatorId can be "me" (current user) or a valid ObjectId.
 * Sorted by createdAt descending (newest first).
 */
export const getPostsByCreator = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const creator =
      creatorId === 'me' ? req.user._id : creatorId;

    const posts = await Post.find({ creator })
      .sort({ createdAt: -1 })
      .populate('creator', 'name creatorProfile profileImage')
      .lean();

    const list = posts.map((p) => ({
      _id: p._id,
      creator: p.creator,
      image: p.image,
      caption: p.caption,
      likedBy: p.likedBy || [],
      likeCount: (p.likedBy || []).length,
      createdAt: p.createdAt,
      likedByCurrentUser: (p.likedBy || []).some(
        (id) => id && id.toString() === req.user._id.toString()
      ),
    }));

    return res.status(200).json(list);
  } catch (error) {
    console.error('Error in getPostsByCreator:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Toggle like on a post. Adds/removes current user from likedBy.
 */
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const liked = post.likedBy.some(
      (id) => id && id.toString() === userId.toString()
    );
    if (liked) {
      post.likedBy = post.likedBy.filter(
        (id) => id && id.toString() !== userId.toString()
      );
    } else {
      post.likedBy.push(userId);
    }
    await post.save();

    return res.status(200).json({
      likeCount: post.likedBy.length,
      likedByCurrentUser: !liked,
    });
  } catch (error) {
    console.error('Error in toggleLike:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
