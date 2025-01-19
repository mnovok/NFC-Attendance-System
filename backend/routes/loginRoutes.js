const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// Public routes
router.post('/login', loginUser);           // POST /api/user/login - Login user

module.exports = router;