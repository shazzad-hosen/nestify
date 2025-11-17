const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errMessage = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(errMessage, 400);
  } else {
    next();
  }
};
