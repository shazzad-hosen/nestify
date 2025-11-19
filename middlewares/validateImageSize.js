const streamifier = require("streamifier");
const { cloudinary } = require("../cloudConfig");
const ExpressError = require("../utils/ExpressError.js");

module.exports.validateImageSize = (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    const MAX_SIZE = 2 * 1024 * 1024;
    if (req.file.size > MAX_SIZE) {
      next(new ExpressError(400, "Image must be less than 2MB."));
    } else {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "Nestify" },
        (err, result) => {
          if (err) {
            next(new ExpressError(500, "Cloudinary upload failed."));
          } else {
            req.body.image = {
              url: result.secure_url,
              filename: result.public_id,
            };
            next();
          }
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    }
  }
};
