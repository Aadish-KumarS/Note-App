import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import transporter from '../config/email.config.js';
import { verificationEmail } from '../template/emailVerification.template.js';



export const getUserProfile = async (req, res) => {
  try {
    
    const user = await User.findById(req.userId)
      .populate('notes')
      .populate('deletedNotes')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body ;
    const user = await User.findOne({email});

    if(!user ) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isPassMatch = await bcrypt.compare(password,user.password)
    if(!isPassMatch){
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ success: true, user, token});

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Create new user
    const user = new User({ name, email, password: hashedPassword, verificationToken });
    await user.save();


    // Create verification link
    const verificationLink = `http://localhost:5001/api/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    const mailOptions = verificationEmail(name,email,verificationLink)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending test email:', error);
      } else {
        console.log('Test email sent:', info.response);
      }
    });

    // Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully. A verification email has been sent.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout Error:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while logging out' });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the email in the token payload
    const user = await User.findOne({ email: decoded.email,verificationToken: token });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already verified' });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred during verification' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from the request parameters
    console.log(userId)
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Find all users, excluding the password field
    const users = await User.find({}, '-password');

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while fetching users' });
  }
};