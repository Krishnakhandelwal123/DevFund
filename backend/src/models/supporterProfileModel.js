import mongoose from 'mongoose';

const SupporterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    totalAmountFunded: {
      type: Number,
      default: 0,
      min: 0
    },
    numberOfCreatorsFunded: {
      type: Number,
      default: 0,
      min: 0
    },
    projectsSupported: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('SupporterProfile', SupporterProfileSchema);
