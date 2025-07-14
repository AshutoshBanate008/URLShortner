// index.js
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const URL = require('./models/url');
// Corrected path for staticRouter: assuming it's now in the 'routes' directory
const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');
const { connectToMongoDB } = require('./connect');

const PORT = 8001;

// MongoDB connection
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

// Middlewares
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies
app.use(cookieParser()); // To parse cookies
app.use(checkForAuthentication); // Custom middleware to check for user authentication and populate req.user

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Redirect route for short URLs
// This route must be defined before the general '/url' route to ensure specific shortId matching
app.get('/url/:shortId', async (req, res) => {
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      {
        // Push a new entry to the visitHistory array
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      },
      { new: true } // Return the updated document
    );

    // If no matching short URL entry is found
    if (!entry) {
      return res.status(404).send('Short URL not found');
    }

    // Redirect to the original URL
    res.redirect(entry.redirectURL);
  } catch (err) {
    // Log server-side errors for debugging
    console.error('Error in short URL redirect route:', err);
    res.status(500).send('Server error');
  }
});

// Routes
// URL-related routes, restricted to authenticated users with 'NORMAL' or 'ADMIN' roles
app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute);
// Static routes (e.g., home page, login/signup forms)
app.use('/', staticRoute);
// User authentication routes (e.g., signup, login)
app.use('/user', userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
