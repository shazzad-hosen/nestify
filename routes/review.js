const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReviews } = require("../middlewares/validateReviews.js");
const { validateUser } = require("../middlewares/validateUser.js");
const {
  validateReviewAuthor,
} = require("../middlewares/validateReviewsAuthor.js");
const reviewController = require("../controllers/reviews.controller.js");

// Create Review Route
router.post(
  "/",
  validateUser,
  validateReviews,
  wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",
  validateUser,
  validateReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
