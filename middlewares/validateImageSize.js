const streamifier = require("streamifier");
const { cloudinary } = require("../cloudConfig");
const ExpressError = require("../utils/ExpressError.js");

module.exports.validateImageSize = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const MAX_SIZE = 2 * 1024 * 1024;
  if (req.file.size > MAX_SIZE) {
    return next(new ExpressError(400, "Image must be less than 2MB."));
  }

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return next(new ExpressError(400, "Invalid Image Type"));
  }
  next();
};
