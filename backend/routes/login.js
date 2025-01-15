const express = require('express');
const bcrypt = require('bcrypt');  // Use bcrypt (same as in seeding)
const jwt = require('jsonwebtoken');
const { User } = require('./models/User');
const router = express.Router();

// POST /login route to handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log the stored hash and entered password for debugging
    console.log('Entered Password:', password);
    console.log('Stored Hash:', user.password);

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send the token and user data back in response
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
