const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((err) => {
      err.message.join(",");
      throw new ExpressError(400, errMessage);
    });
  } else {
    next();
  }
};
