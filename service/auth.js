// service/auth.js
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Define a secret key for signing and verifying JWTs.
// In a production environment, this secret should be stored securely (e.g., environment variables)
// and should be a strong, randomly generated string.
const secret = 'Ashutosh$123$';

/**
 * Generates a JSON Web Token (JWT) for a given user.
 * The token contains essential user information and is signed with a secret key.
 *
 * @param {Object} user - The user object containing _id, email, and role.
 * @returns {string} The generated JWT.
 */
function setUser(user) {
  // Ensure the user object is valid before creating a token
  if (!user || !user._id || !user.email || !user.role) {
    console.error("Invalid user object provided to setUser:", user);
    return null; // Or throw an error, depending on desired error handling
  }

  // Sign the JWT with the user's _id, email, and role, using the defined secret.
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
  }, secret, { expiresIn: '1h' }); // Added expiresIn for token expiration (e.g., 1 hour)
}

/**
 * Verifies a given JWT and returns the decoded user payload if the token is valid.
 * Handles cases where the token is missing or invalid (e.g., expired, tampered).
 *
 * @param {string} token - The JWT string to be verified.
 * @returns {Object|null} The decoded user payload if valid, otherwise null.
 */
function getUser(token) {
  // If no token is provided, return null immediately.
  if (!token) return null;

  try {
    // Verify the token using the secret key.
    // If verification is successful, it returns the decoded payload.
    return jwt.verify(token, secret);
  } catch (error) {
    // Log the error for debugging purposes (e.g., TokenExpiredError, JsonWebTokenError)
    console.error("JWT verification failed:", error.message);
    // If verification fails (e.g., token expired, invalid signature), return null.
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
