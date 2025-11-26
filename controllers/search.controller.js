const Listing = require("../models/listing.model.js");

module.exports.search = async (req, res) => {
  const searchTerm = (req.query.search || "").trim();

  if (searchTerm.length === 0) {
    req.flash("error", "Write some keyword to search something");
    return res.redirect("/listings");
  }

  if (searchTerm.length < 3) {
    req.flash("error", "Search term must be at least 3 characters long");
    return res.redirect("/listings");
  }

  if (searchTerm.length > 15) {
    req.flash("error", "Search term is too long!");
    return res.redirect("/listings");
  }
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const query = {
    $or: [
      { title: { $regex: escapedSearchTerm, $options: "i" } },
      { category: { $regex: escapedSearchTerm, $options: "i" } },
      { country: { $regex: escapedSearchTerm, $options: "i" } },
      { location: { $regex: escapedSearchTerm, $options: "i" } },
    ],
  };
  const listings = await Listing.find(query).limit(20);
  res.render("listings/resultsPage.ejs", { listings, searchTerm });
};
