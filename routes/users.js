const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middlewares/saveOriginalUrl.js");
const userController = require("../controllers/users.controller.js");
const { preventLoggedIn } = require("../middlewares/preventLoggedIn.js");
const {
  loginLimiter,
  signupLimiter,
} = require("../middlewares/preventUsers.js");

router
  .route("/signup")
  .get(preventLoggedIn, userController.renderSignupForm)
  .post(preventLoggedIn, signupLimiter, wrapAsync(userController.signUp));

router
  .route("/login")
  .get(preventLoggedIn, userController.renderLoginForm)
  .post(
    preventLoggedIn,
    loginLimiter,
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Log out Route
router.get("/logout", userController.logout);

module.exports = router;
