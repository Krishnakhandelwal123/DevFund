import CreatorStats from '../models/creatorStatsModel.js';
import User from '../models/userModel.js';

export const getCreatorStats = async (req, res) => {
  try {
    if (!req.user?.roles?.isCreator) {
      return res.status(403).json({ message: 'Forbidden - Creator access required' });
    }

    const userId = req.user._id;

    let stats = await CreatorStats.findOne({ user: userId });
    if (!stats) {
      stats = await CreatorStats.create({
        user: userId,
        supportersCount: 0,
        totalEarnings: 0,
        totalPostsShared: 0
      });
    }

    return res.status(200).json({
      supportersCount: stats.supportersCount,
      totalEarnings: stats.totalEarnings,
      totalPostsShared: stats.totalPostsShared,
      createdAt: stats.createdAt,
      updatedAt: stats.updatedAt
    });
  } catch (error) {
    console.error('Error in getCreatorStats:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCreatorsForExplore = async (_req, res) => {
  try {
    const creators = await User.find({
      'roles.isCreator': true,
      isVerified: true
    }).select('name creatorProfile profileImage');

    const mapped = creators.map((user) => {
      const displayName = user.creatorProfile?.displayName || user.name || 'Creator';
      const slug = displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 18) || 'creator';

      const username = `@${slug}`;
      const category = user.creatorProfile?.category || 'Other';
      const description = user.creatorProfile?.bio || '';
      const avatar = user.creatorProfile?.avatar || user.profileImage || '';
      const socialLinks = user.creatorProfile?.socialLinks || {};

      const tags = [category];
      if (socialLinks.github) tags.push('GitHub');
      if (socialLinks.twitter) tags.push('Twitter');
      if (socialLinks.linkedin) tags.push('LinkedIn');
      if (socialLinks.website) tags.push('Website');

      return {
        id: user._id,
        name: displayName,
        username,
        avatar,
        category,
        description,
        tags,
        isVerified: user.isVerified,
        featured: false
      };
    });

    return res.status(200).json(mapped);
  } catch (error) {
    console.error('Error in getCreatorsForExplore:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCreatorById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('name creatorProfile profileImage isVerified roles');
    if (!user || !user.roles?.isCreator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    const stats = await CreatorStats.findOne({ user: id });

    const displayName = user.creatorProfile?.displayName || user.name || 'Creator';
    const username = `@${displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 18) || 'creator'}`;

    const category = user.creatorProfile?.category || 'Other';
    const description = user.creatorProfile?.bio || '';
    const avatar = user.creatorProfile?.avatar || user.profileImage || '';
    const socialLinks = user.creatorProfile?.socialLinks || {};

    return res.status(200).json({
      id: user._id,
      name: displayName,
      username,
      category,
      description,
      avatar,
      socialLinks,
      isVerified: user.isVerified,
      stats: {
        supportersCount: stats?.supportersCount ?? 0,
        totalEarnings: stats?.totalEarnings ?? 0,
        totalPostsShared: stats?.totalPostsShared ?? 0,
      },
    });
  } catch (error) {
    console.error('Error in getCreatorById:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

