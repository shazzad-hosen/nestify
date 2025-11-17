const Listing = require("../models/listing.model.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.search = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";
    const listings = await Listing.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { country: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.render("listings/resultsPage.ejs", { listings, searchTerm });
  } catch (err) {
    throw new ExpressError(500, "Internal Server Error");
  }
};
