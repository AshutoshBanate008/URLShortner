// routes/url.js
const express = require('express');
// Import the controller functions for handling URL operations
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controllers/url');
const router = express.Router(); // Create a new router instance

// Route to get analytics for a specific short URL
// This route expects a shortId as a URL parameter
router.get('/analytics/:shortId', handleGetAnalytics);

// Route to generate a new short URL
// This route expects a POST request with the original URL in the request body
router.post('/', handleGenerateNewShortURL);

module.exports = router; // Export the router
