// controllers/url.js
const { nanoid } = require("nanoid"); // Import nanoid for generating short IDs
const URL = require('../models/url'); // Import the URL model

// Handles the generation of a new short URL
async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body; // Extract the original URL from the request body

    // Validate if the URL is provided
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortID = nanoid(8); // Generate a unique short ID of 8 characters

    // Create a new URL entry in the database
    await URL.create({
      shortId: shortID,         // The generated short ID
      redirectURL: url,         // The original URL to redirect to
      visitHistory: [],         // Initialize visit history as an empty array
      // Assign the ID of the user who created the short URL.
      // req.user is populated by the checkForAuthentication middleware.
      createdBy: req.user ? req.user._id : null,
    });

    // Render the home page with the newly generated short ID
    // This assumes 'home' EJS template expects an 'id' variable
    return res.render("home", {
      id: shortID,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error generating short URL:", err.message);
    // Send a 500 Internal Server Error response to the client
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Handles fetching analytics for a given short URL
async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId; // Extract the short ID from request parameters

    // Find the URL entry by its short ID
    const result = await URL.findOne({ shortId });

    // If no matching short URL is found
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Return the total clicks and the detailed visit history as JSON
    return res.json({
      totalClicks: result.visitHistory.length, // Total number of times the short URL was visited
      analytics: result.visitHistory,          // Array of visit timestamps
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error fetching analytics:", err.message);
    // Send a 500 Internal Server Error response to the client
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
