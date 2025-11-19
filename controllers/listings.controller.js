const Listing = require("../models/listing.model.js");
const cloudinary = require("cloudinary").v2;

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
  let { title, description, price, category, country, location } = req.body;
  let listing = {
    title,
    description,
    price,
    category,
    country,
    location,
  };

  if (req.body.image) {
    listing.image = req.body.image;
  }

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
  let listing = await Listing.findById(id);

  // Deleting Previous Image From The Cloud Storage If New One Found
  if (req.body.image) {
    if (listing.image && listing.image.filename) {
      try {
        await cloudinary.uploader.destroy(listing.image.filename);
      } catch (error) {
        console.log("Cloudinary image deletion failed!", error);
      }
    }
    listing.image = req.body.image;
  }

  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.category = category;
  listing.country = country;
  listing.location = location;

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Destroy Route Logic
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
  }

  // Handling Image Deletion After Deleting Listing
  if (listing.image && listing.image.filename) {
    try {
      await cloudinary.uploader.destroy(listing.image.filename);
    } catch (error) {
      console.log("Cloudinary image deletion failed!", error);
    }
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
