const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateListing } = require("../middlewares/validateListings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateUser } = require("../middlewares/validateUser.js");
const { validateListingOwner } = require("../middlewares/validateListingOwner.js");
const listingController = require("../controllers/listings.controller.js");
const multer = require("multer");
const memoryUpload = multer({ storage: multer.memoryStorage() });
const { validateImageSize } = require("../middlewares/validateImageSize.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    validateUser,
    memoryUpload.single("image"),
    validateImageSize,
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// New Route
router.get("/new", validateUser, listingController.renderNewForm);

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
