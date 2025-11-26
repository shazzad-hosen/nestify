const Listing = require("../models/listing.model.js");
const User = require("../models/user.model.js");
const streamifier = require("streamifier");
const { cloudinary } = require("../cloudConfig.js");

// View Profile Route Logic
module.exports.viewProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      username: username.toLowerCase().trim(),
    });

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/listings");
    }
    res.render("users/profile.ejs", { user });
  } catch (err) {
    console.log(err);
    req.flash("error", "Cannot load user profile");
    res.redirect("/listings");
  }
};

// View Owned Listings Logic
module.exports.viewOwnedListings = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    username: { $regex: new RegExp(`^${username}$`, "i") },
  });

  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/listings");
  }
  const ownedListings = await Listing.find({ owner: user._id });
  res.render("users/ownedListings.ejs", { listings: ownedListings });
};

// Profile Update Form Render Logic
module.exports.renderEditForm = (req, res) => {
  res.render("users/editProfile.ejs", { user: req.user });
};

// Profile Update Route Logic
module.exports.updateProfile = async (req, res) => {
  try {
    const { fullName, bio, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/profile/edit");
    }
    user.fullName = fullName;
    user.bio = bio;
    user.phone = phone;

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_avatars" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };
      const result = await uploadFromBuffer(req.file.buffer);
      user.avatar = result.secure_url;
      user.avatarId = result.public_id;
    }

    await user.save();
    req.flash("success", "Profile updated successfully");
    res.redirect(`/user/${req.user.username}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    res.redirect("/profile/edit");
  }
};

// Show User Listings Logic
module.exports.getUserListingsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/listings");
    }
    const listings = await Listing.find({ owner: user._id });
    res.render("users/userListings.ejs", {
      user,
      listings,
    });
  } catch (error) {
    req.flash("error", "Error loading listings");
    res.redirect("/listings");
    res.redirect(`/user/${user.username}`);

  }
};
