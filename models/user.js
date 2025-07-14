// models/user.js

const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // User's name
  name: {
    type: String,
    required: true, // Name is a mandatory field
  },
  // User's email, which must be unique
  email: {
    type: String,
    required: true, // Email is a mandatory field
    unique: true,   // Email must be unique across all users
  },
  // User's role, with predefined values and a default
  role: {
    type: String,
    enum: ["NORMAL", "ADMIN"], // Role can only be 'NORMAL' or 'ADMIN'
    default: "NORMAL",         // Default role is 'NORMAL' if not specified
  },
  // User's password (will be stored as a hash)
  password: {
    type: String,
    required: true, // Password is a mandatory field
  },
}, {
  // timestamps option automatically adds createdAt and updatedAt fields
  // createdAt: records when the document was first created
  // updatedAt: records when the document was last updated
  timestamps: true
});

// Create the Mongoose model from the schema, named "User"
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
