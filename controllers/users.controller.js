const User = require("../models/user.model.js");

// Sign Up Form Render Logic
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Sign Up Route Logic
module.exports.signUp = async (req, res) => {
  try {
    let { email, username, password } = req.body;

    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/signup");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      req.flash("error", "Please enter a valid email address");
      return res.redirect("/signup");
    }

    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters long");
      return res.redirect("/signup");
    }

    const newUser = new User({
      email: email.trim().toLowerCase(),
      username: username.trim(),
    });

    // Siging In And Storing Data
    const registeredUser = await User.register(newUser, password);

    // Automatically Logging In
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User Registration Successful");
      res.redirect("/listings");
    });
  } catch (err) {
    if (err.name === "UserExistsError") {
      req.flash("error", "A user with this email already exists");
    } else {
      req.flash("error", "Registration failed: " + err.message);
    }
    res.redirect("/signup");
  }
};

// Log In Form Render Logic
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Log In Route Logic
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back, you're successfully logged in");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Log Out Route Logic
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "You have been successfully logged out");
      res.redirect("/listings");
    }
  });
};
