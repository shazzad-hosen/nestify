const Listing = require("../models/listing.model.js");
const streamifier = require("streamifier");
const { cloudinary } = require("../cloudConfig.js");

// Index Route Logic
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
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
    req.flash("error", "Listing you requested for, does not exists.");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create Route Logic
module.exports.createNewListing = async (req, res) => {
  try {
    const { title, description, price, category, country, location } = req.body;

    if (!req.file) {
      req.flash("error", "Listing image is required");
      return res.redirect("/listings/new");
    }

    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "listing_images" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };
    const result = await uploadFromBuffer(req.file.buffer);

    const image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      country,
      image,
      location,
      owner: req.user._id,
    });

    await newListing.save();

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    res.redirect("/listings/new");
  }
};

// Edit Route Logic
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for, does not exists");
    return res.redirect("/listings");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_200");
  res.render("listings/edit.ejs", { listing, originalImage });
};

// Update Route Logic
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, country, location } = req.body;

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.category = category || listing.category;
    listing.country = country || listing.country;
    listing.location = location || listing.location;

    // Deleting Previous Image From Cloudinary
    if (req.file) {
      if (listing.image && listing.image.filename) {
        try {
          await cloudinary.uploader.destroy(listing.image.filename);
        } catch (error) {
          console.log("Cloudinary image deletion failed", error);
        }
      }

      // Upload New Image To Cloudinary
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "listing_images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      try {
        const result = await uploadFromBuffer(req.file.buffer);
        listing.image = {
          url: result.secure_url,
          filename: result.public_id,
        };
      } catch (uploadError) {
        req.flash("error", "Failed to upload new image");
        return res.redirect(`/listings/${id}/edit`);
      }
    }
    await listing.save();
    req.flash("success", "Listing Updated Successfully");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    req.flash("error", "Something went wrong while updating the listing");
    res.redirect("/listings");
  }
};

// Destroy Route Logic
module.exports.destroyListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    // Handling Image Deletion After Delate A Listing
    if (listing.image && listing.image.filename) {
      try {
        await cloudinary.uploader.destroy(listing.image.filename);
      } catch (error) {
        console.log("Cloudinary image deletion failed", error);
      }
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  } catch (error) {
    req.flash("error", "Listing Deletion Failed");
    res.redirect(`/listings/${id}`);
  }
};
