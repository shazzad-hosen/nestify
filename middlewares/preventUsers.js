const rateLimit = require("express-rate-limit");

// Rate Limiter Middleware For Login Route
module.exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

// Rate Limiter Middleware For Signup Route
module.exports.signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hours
  max: 3,
  message:
    "Too many accounts created from this device. Please try again later.",
});
