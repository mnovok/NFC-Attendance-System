const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Login user 
// @route   POST /api/user/login
const loginUser =  async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Find user by email
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          uid: user.uid,
          email: user.email,
          name: user.name,
          surname: user.surname,
          token: generateToken(user._id),
        });
      } else {
        const error = new Error('Invalid username or password');
        error.status = 401;  
        throw error; 
      }

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
};
  
module.exports = {
    loginUser,
};