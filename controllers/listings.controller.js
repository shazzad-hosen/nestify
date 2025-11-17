const Listing = require("../models/listing.model.js");

// Index Route Logic
module.exports.index = async (req, res) => {
  const allListening = await Listing.find({});
  res.render("listings/index.ejs", { allListening });
};

// New Route Logic
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Route Logic
module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author", // Review Author
      },
    })
    .populate("owner"); // Listing Owner
  if (!listing) {
    req.flash("error", "Listing you requested for, does not exists!");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listing });
  }
};

// Create Route Logic
module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;

  let { title, description, price, category, country, location } = req.body;
  let listing = {
    title: title,
    description: description,
    image: { url, fileName },
    price: price,
    category: category,
    country: country,
    location: location,
  };

  let newListing = await new Listing(listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit Route Logic
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for, does not exists!");
    res.redirect("/listings");
  } else {
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/w_200");
    res.render("listings/edit.ejs", { listing, originalImage });
  }
};

// Update Route Logic
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, price, category, country, location } = req.body;
  let listing = {
    title: title,
    description: description,
    price: price,
    category: category,
    country: country,
    location: location,
  };
  
  let listingData = await Listing.findByIdAndUpdate(id, { ...listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listingData.image = { url, fileName };
    await listingData.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Destroy Route Logic
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
