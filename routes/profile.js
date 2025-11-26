const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateUser } = require("../middlewares/validateUser.js");
const profileController = require("../controllers/profile.controller.js");
const { validateImageSize } = require("../middlewares/validateImageSize.js");
const multer = require("multer");
const memoryUpload = multer({ storage: multer.memoryStorage() });

// Profile Edit And Update Route
router
  .route("/profile/edit")
  .get(validateUser, profileController.renderEditForm)
  .post(
    validateUser,
    memoryUpload.single("avatar"),
    validateImageSize,
    profileController.updateProfile
  );

// Profile's Related Route
router.get("/user/:username/listings", profileController.viewOwnedListings);
router.get("/user/:username", profileController.viewProfile);

module.exports = router;
