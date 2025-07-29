import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import admin from '../lib/firebase.js';
import { sendOtpEmail, sendwelcomeemail, sendPasswordResetEmail,sendResetSuccessEmail } from '../middlewares/emailConfig.js';
import crypto from 'crypto';

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const VerificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      VerificationCode,
      VerificationCodeExpires
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      await sendOtpEmail(newUser.email, VerificationCode);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        VerificationCode,
        VerificationCodeExpires
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (user) {
      if (user.authMethod !== 'google') {
        return res.status(400).json({ message: `You have previously signed up with a password. Please use your password to log in.` });
      }
      // Ensure Google users are always verified
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }
    } else {
      user = new User({
        name,
        email,
        googleId: uid,
        profileImage: picture || '',
        authMethod: 'google',
        isVerified: true
      });
      await user.save();
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ message: 'Firebase token has expired. Please sign in again.' });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      VerificationCode: code,
      VerificationCodeExpires: { $gt: new Date() }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });


    user.isVerified = true;
    user.VerificationCode = undefined;
    user.VerificationCodeExpires = undefined;
    res.status(200).json({ message: 'Email verified successfully' });

    await user.save();
    await sendwelcomeemail(user.email, user.name);
  } catch (error) {
    console.error('OTP verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/resetpassword/${resetToken}`);
    res.status(200).json({ message: 'Password reset email sent' });

  } catch (error) {
    console.log("Error in forgotPassword controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
    if (!user) return res.status(404).json({ message: 'Invalid or expired password reset token' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;  
    user.resetPasswordExpires = undefined;
    await user.save();
    
    await sendResetSuccessEmail(user.email);
    res.status(200).json({ message: 'Password reset successfully' });


  } catch (error) {
    console.log("Error in resetPassword controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {

  signup,
  login,
  logout,
  checkAuth,
  googleLogin,
  verifyEmail,
  forgotPassword,
  resetPassword
};

