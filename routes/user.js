// routes/user.js
const express = require('express');
// Import the controller functions for handling user signup and login
const { handleUserSignup, handleUserLogin } = require('../controllers/user');
const router = express.Router(); // Create a new router instance

// Route for user signup
// This route handles POST requests to the base path of this router (e.g., /user)
// It will typically receive user registration data (name, email, password)
router.post('/', handleUserSignup);

// Route for user login
// This route handles POST requests to the '/login' path (e.g., /user/login)
// It will typically receive user login credentials (email, password)
router.post('/login', handleUserLogin);

module.exports = router; // Export the router
