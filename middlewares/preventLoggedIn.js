module.exports.preventLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("success", "You're already logged in");
    return res.redirect("/listings");
  }
  next();
};
