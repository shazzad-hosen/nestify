const Listing = require("../models/listing.model");

module.exports.validateListingOwner = async (req, res, next) => {
  try {
    let { id } = req.params;
    let currentListing = await Listing.findById(id);

    if (!currentListing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    if (!currentListing.owner.equals(res.locals.currentUser._id)) {
      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    console.log();
  }
};
