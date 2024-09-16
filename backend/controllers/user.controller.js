import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken'

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
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    console.log(req)
    res.status(201).json({ success: true, message: 'User registered successfully'  });
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
