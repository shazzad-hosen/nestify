const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateListing } = require("../middlewares/validateListings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middlewares/loggedIn.js");
const { isOwner } = require("../middlewares/isOwner.js");
const listingController = require("../controllers/listings.controller.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"), // middleware to work with cloud storage
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
