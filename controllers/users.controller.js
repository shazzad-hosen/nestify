const User = require("../models/user.model.js");

// Sign Up Form Render Logic
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Sign Up Route Logic
module.exports.signUp = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      } else {
        req.flash("success", "User Registration Successful");
        res.redirect("/listings");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// Log In Form Render Logic
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Log In Route Logic
module.exports.login = async (req, res) => {
  req.flash("success", "you're logged in");
  if (!res.locals.redirectUrl) {
    res.redirect("/listings");
  } else {
    res.redirect(res.locals.redirectUrl);
  }
};

// Log Out Route Logic
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logged out, now!");
      res.redirect("/listings");
    }
  });
};
