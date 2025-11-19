const Listing = require("../models/listing.model");

module.exports.validateListingOwner = async (req, res, next) => {
  let { id } = req.params;
  let currentListing = await Listing.findById(id);
  if (!currentListing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};
