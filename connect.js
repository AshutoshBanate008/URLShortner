// connect.js

const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  try {
    // Connect to MongoDB. The options useNewUrlParser and useUnifiedTopology are
    // no longer necessary and are deprecated in recent Mongoose versions (v6.0.0+).
    // Mongoose now handles these internally.
    await mongoose.connect(url);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit the process if the database connection fails, as the application
    // cannot function without a database.
    process.exit(1);
  }
}

module.exports = {
  connectToMongoDB,
};
