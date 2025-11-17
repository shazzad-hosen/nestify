module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in before making changes");
    return res.redirect("/login");
  } else {
    next();
  }
};
