// models/url.js

const mongoose = require('mongoose');

// Define the schema for the URL model
const urlSchema = new mongoose.Schema({
  // shortId is a unique identifier for the shortened URL
  shortId: {
    type: String,
    required: true, // It must be provided
    unique: true,   // It must be unique across all documents
  },
  // redirectURL is the original long URL that the shortId will redirect to
  redirectURL: {
    type: String,
    required: true, // It must be provided
  },
  // visitHistory is an array to store details of each visit to the short URL
  visitHistory: [
    {
      // timestamp records when the visit occurred
      timestamp: { type: Number }, // Storing as a Number (milliseconds since epoch)
    },
  ],
  // createdBy links this URL to a specific user who created it
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // This field will store a MongoDB ObjectId
    ref: 'User', // It references the 'User' model (ensure 'User' is the correct model name in user.js)
    // This field is optional, allowing for URLs created by unauthenticated users or for public use cases
  },
}, {
  // timestamps option automatically adds createdAt and updatedAt fields
  // createdAt: records when the document was first created
  // updatedAt: records when the document was last updated
  timestamps: true,
});

// Create the Mongoose model from the schema
const URL = mongoose.model('URL', urlSchema);

// Export the URL model for use in other parts of the application
module.exports = URL;
