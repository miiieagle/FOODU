const express = require('express');
const { register, verifyOtp, loginRequestOtp, verifyLoginOtp, promoteToAdmin } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to verify OTP for registration
router.post('/verify-otp', verifyOtp);

// Route to initiate login and send OTP
router.post('/login-request-otp', loginRequestOtp);

// Route to verify OTP for login
router.post('/verify-login-otp', verifyLoginOtp);

// Route to promote a user to admin
router.post('/promote-to-admin', promoteToAdmin);

module.exports = router;
