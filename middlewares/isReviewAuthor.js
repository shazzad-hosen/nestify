const Review = require("../models/review.model.js");

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not author of this review");
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};
