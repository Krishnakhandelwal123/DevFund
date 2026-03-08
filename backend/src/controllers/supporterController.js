import SupporterProfile from '../models/supporterProfileModel.js';

/**
 * Get or create supporter profile for the authenticated user.
 * Returns totalAmountFunded, numberOfCreatorsFunded, projectsSupported, etc.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let profile = await SupporterProfile.findOne({ user: userId });

    if (!profile) {
      profile = await SupporterProfile.create({
        user: userId,
        totalAmountFunded: 0,
        numberOfCreatorsFunded: 0,
        projectsSupported: 0
      });
    }

    res.status(200).json({
      totalAmountFunded: profile.totalAmountFunded,
      numberOfCreatorsFunded: profile.numberOfCreatorsFunded,
      projectsSupported: profile.projectsSupported,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    });
  } catch (error) {
    console.error('Error in getProfile (supporter):', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
