const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview } = require("../middlewares/validateReviews.js");
const { isLoggedIn } = require("../middlewares/loggedIn.js");
const { isReviewAuthor } = require("../middlewares/isReviewAuthor.js");
const reviewController = require("../controllers/reviews.controller.js");

// Review Listing Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
