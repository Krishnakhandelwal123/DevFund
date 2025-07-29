import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: function () { return this.authMethod === 'password'; }
  },

  profileImage: {
    type: String,
    default: ''
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true
  },

  authMethod: {
    type: String,
    enum: ['password', 'google'],
    required: true,
    default: 'password'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  VerificationCodeExpires: {
    type: Date,
  },

  VerificationCode: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  createdAt: {
    type: Date,
    default: Date.now
  },

});

export default mongoose.model('User', UserSchema);
