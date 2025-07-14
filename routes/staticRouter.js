// router/staticRouter.js
const express = require('express');
const router = express.Router();

const { restrictTo } = require('../middlewares/auth'); // Import restrictTo middleware
const URL = require('../models/url'); // Import the URL model

// Route for the admin dashboard to view all URLs
// Accessible only to users with the 'ADMIN' role
router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
  try {
    // Find all URLs in the database
    const allUrls = await URL.find({});
    // Render the 'home' template, passing all URLs
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    console.error("Error fetching all URLs for admin:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route for the home page for authenticated users (NORMAL or ADMIN roles)
// This will display URLs created by the logged-in user
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    // If req.user is not available (e.g., due to an issue with checkForAuthentication),
    // redirect to login to prevent errors.
    if (!req.user) {
      return res.redirect("/login");
    }
    // Find URLs created by the currently logged-in user
    const allUrls = await URL.find({ createdBy: req.user._id });
    // Render the 'home' template, passing the user-specific URLs
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    console.error("Error fetching user-specific URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route for the signup page
router.get('/signup', (req, res) => {
  return res.render("signup"); // Render the 'signup' template
});

// Route for the login page
router.get('/login', (req, res) => {
  return res.render("login"); // Render the 'login' template
});

module.exports = router;
