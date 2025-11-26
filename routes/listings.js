const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateListing } = require("../middlewares/validateListings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateUser } = require("../middlewares/validateUser.js");
const {
  validateListingOwner,
} = require("../middlewares/validateListingOwner.js");
const listingController = require("../controllers/listings.controller.js");
const multer = require("multer");
const memoryUpload = multer({ storage: multer.memoryStorage() });
const { validateImageSize } = require("../middlewares/validateImageSize.js");
const rateLimit = require("express-rate-limit");

// Rate Limiter For Create Listings
const createListingLimiter = rateLimit({
  windowMs: 40 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later!",
});

// Index And Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    validateUser,
    createListingLimiter,
    memoryUpload.single("image"),
    validateImageSize,
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// New Route
router.get(
  "/new",
  validateUser,
  createListingLimiter,
  listingController.renderNewForm
);

// Show, Update And Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    validateUser,
    validateListingOwner,
    memoryUpload.single("image"),
    validateImageSize,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    validateUser,
    validateListingOwner,
    wrapAsync(listingController.destroyListing)
  );

// Edit Route
router.get(
  "/:id/edit",
  validateUser,
  validateListingOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
