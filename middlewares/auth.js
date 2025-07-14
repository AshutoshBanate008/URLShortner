// middlewares/auth.js

const { getUser } = require("../service/auth");

// Middleware to check for user authentication based on a token in cookies
function checkForAuthentication(req, res, next) {
  // Check for the 'uid' cookie, which is where the authentication token is stored
  const tokenCookie = req.cookies?.uid;
  req.user = null; // Initialize req.user to null

  // If no token cookie is found, proceed to the next middleware/route
  // This allows unauthenticated users to access public routes
  if (!tokenCookie) {
    return next();
  }

  // If a token is found, attempt to get the user from the token
  const user = getUser(tokenCookie);
  req.user = user; // Attach the user object (if valid) to the request
  return next(); // Proceed to the next middleware/route
}

// Middleware to restrict access based on user roles
function restrictTo(roles = []) {
  return function (req, res, next) {
    // If the user is not authenticated (req.user is null), redirect to login
    if (!req.user) {
      return res.redirect("/login");
    }

    // If the user's role is not included in the allowed roles, send a 403 Forbidden status
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized");
    }

    // If authenticated and authorized, proceed to the next middleware/route
    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
