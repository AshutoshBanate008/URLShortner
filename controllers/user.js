// controllers/user.js
const User = require('../models/user');
const { setUser } = require('../service/auth');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving it to the database for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    await User.create({
      name,
      email,
      password: hashedPassword // Store the hashed password
    });

    return res.render("home"); // Redirect to home page after successful signup
  } catch (err) {
    console.error("Signup error:", err.message);
    // Check for duplicate email error (MongoDB duplicate key error code 11000)
    if (err.code === 11000) {
      return res.status(400).render("signup", {
        error: "Email already registered. Please use a different email."
      });
    }
    return res.status(500).send("Internal Server Error");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match
    if (!user) {
      return res.render("login", {
        error: "Invalid email or password" // Generic error message for security
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("login", {
        error: "Invalid email or password" // Generic error message for security
      });
    }

    // If credentials are valid, generate a token and set it as a cookie
    const token = setUser(user); // Assuming setUser generates a JWT or similar token
    res.cookie('uid', token); // Store the token in a cookie named 'uid'

    return res.redirect("/"); // Redirect to the home page after successful login
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
